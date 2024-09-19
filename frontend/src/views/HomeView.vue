<template>
  <div class="center-container">
    <!-- 이미지 첨부 -->
    <div id="img_sub">
      <v-form @submit.prevent="submitForm" style="text-align: center;">
        <v-file-input v-model="selectedImage" accept="image/*" name="image" @change="uploadImage"
          class="square-file-input" prepend-icon="mdi mdi-cloud-upload" label="이미지 첨부" show-size density="compact">
        </v-file-input>
        <div v-if="isLoading">
          <v-progress-circular :size="35" :width="3" color="black" style="margin-top: 10px;"
            indeterminate></v-progress-circular>
        </div>
        <input v-else :class="selectedImage ? 'onImg' : 'notImg'" type="submit" value="이미지 분석" />
      </v-form>

      <!-- 첨부한 이미지 표시 -->
      <div v-if="attachedImages.length > 0 && this.selectedImage" class="image-list">
        <div v-for="(image, index) in attachedImages" :key="index" class="image-container">
          <img :src="image.src" alt="Attached Image" class="attached-image" />
        </div>
      </div>

      <div v-if="showImageResult && this.selectedImage" id="resultOpen" style="text-align: center">
        <input type="button" value="결과 보기" @click="resultOpen = true" class="onImg" />
      </div>
    </div>

    <v-container v-if="this.resultOpen && this.selectedImage">
      <div style="text-align: center; margin-bottom: 20px;">
        <span>{{ keywords }}</span>
      </div>

      <div class="grid-container">
        <div v-for="(group, groupIndex) in chunkedData" :key="groupIndex" class="grid-row">
          <div v-for="(item, index) in group" :key="index" class="grid-item">
            <ImageResult :item="item" />
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import ImageResult from "./ImageResult.vue";
export default {
  name: "HomeView",
  components: {
    ImageResult,
  },
  data() {
    return {
      selectedImage: null,
      attachedImages: [],
      showImageResult: false,
      resultOpen: false,
      isLoading: false,
      keywords: '',
      extractedData: [],
      result: [],
    };
  },

  computed: {
    chunkedData() {
      const chunkSize = 5; // 5열로 변경
      const chunks = [];
      for (let i = 0; i < this.extractedData.length; i += chunkSize) {
        chunks.push(this.extractedData.slice(i, i + chunkSize));
      }
      return chunks;
    }
  },
  methods: {
    async submitForm() {
      let formData = new FormData();
      if (!this.selectedImage) {
        return alert('이미지를 선택해주세요.')
      } else {
        try {
          this.isLoading = true;
          this.showImageResult = false;
          if (localStorage.getItem('userId') == null) {
            localStorage.setItem('userId', null);
            formData.append('userId', localStorage.getItem('userId'));
          } else {
            formData.append('userId', localStorage.getItem('userId'));
          }
          formData.append('image', this.selectedImage);
          const response = await this.$axios.post('http://localhost:5000/', formData);
          if (response.status == 200) {
            const result = await this.fetchData();
            this.keywords = result.keywords;
            this.feature_keyword = result.feature_keyword;
            this.clo_color = result.clo_color;
            this.clo_name = result.clo_name;
            this.extractedData = result.extractedData;
            this.showImageResult = true;
            this.isLoading = false;
            localStorage.setItem('feature_keyword', JSON.stringify(this.feature_keyword));
            localStorage.setItem('clo_color', JSON.stringify(this.clo_color));
            localStorage.setItem('clo_name', JSON.stringify(this.clo_name));
            // localStorage.setItem('keywordArray', JSON.stringify(result.keywordArray));
          }
        } catch (e) {
          console.error('submitForm:', e);
        }
      }
    },

    uploadImage() {
      if (this.selectedImage) {
        try {
          this.attachedImages = []; // 첨부된 이미지 초기화
          const imageURL = URL.createObjectURL(this.selectedImage);
          this.attachedImages.unshift({ src: imageURL });
        } catch (error) {
          console.error('uploadImage:', error);
        }
      }
    },
    async fetchData() {
      try {
        const response = await this.$axios.get("http://localhost:3000/api/keyword");
        if (response.status == 200) {
          return response.data;
        }
      } catch (error) {
        console.error("Error fetching shopping data:", error);
      }
    }
  },
}
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

.image-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: #000000;
  margin-top: 10px;
  margin-bottom: -10px;
  justify-content: center;
}

.image-container {
  text-align: center;
  margin: 10px 0;
}

#img_sub {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.square-file-input {
  flex: 1;
  height: 100px;
  width: 300px;
  padding: 10px;
  background-color: rgb(241, 241, 241);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn_analysis {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  height: 48px;
  background: rgb(0, 0, 0);
  color: #ffffff;
}

#resultOpen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  height: 48px;
}

.onImg {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  height: 48px;
  background: rgb(0, 0, 0);
  color: #ffffff;
}

.notImg {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  height: 48px;
  background: rgba(173, 173, 173, 0.854902);
  color: #ffffff;
}

span {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 130%;
}

input:hover {
  background: grey;
}

.attached-image {
  max-width: 200px;
  height: auto;
  max-height: 250px;
}
</style>