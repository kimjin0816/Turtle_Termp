<template>
  <!-- 이미지 업로드와 검색 버튼 -->
  <v-row class="text-center">
    <v-col cols="12">
      <!-- 이미지 첨부 -->
      <v-row justify="center" style="margin-top: 50px;">
        <v-col cols="12" md="2">
          <v-form @submit.prevent="submitForm">
            <v-file-input label="Select Image" v-model="selectedImage" accept="image/*" name="image"
              @change="uploadImage()"></v-file-input>
            <v-btn type="submit" color="grey lighten-1" dark>이미지 분석</v-btn>
          </v-form>
        </v-col>
      </v-row>

      <!-- 첨부한 이미지 표시 -->
      <v-row justify="center" v-if="attachedImages.length > 0">
        <v-col v-for="(image, index) in attachedImages" :key="index" cols="12" md="4">
          <div class="image-container" style="text-align: center;">
            <img :src="image.src" alt="Attached Image" />
          </div>
        </v-col>
      </v-row>

      <v-container v-if="showImageResult" style="margin-top: -20px">
        <div class="my-3" style="text-align: center">
          <v-row><v-col><h2>이미지 분석 결과</h2></v-col></v-row>
        </div>

        <div class="my-3" style="text-align: center">
          <h2>{{ keywords }}</h2>
        </div>

        <v-row>
          <v-col v-for="(item, index) in extractedData" :key="index" cols="10" sm="4" md="4">
            <ImageResult :item="item" />
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import ImageResult from "./ImageResult.vue";
export default {
  name: "HomeView",
  // inject: ['dataFromGetData'],

  components: {
    ImageResult,
  },
  data() {
    return {
      selectedImage: null,
      attachedImages: [],
      showImageResult: false,
      keywords: '',
      // keywordArray: [],
      extractedData: [],
      result:[]
    };
  },
  filters: {
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods: {    
    async submitForm() {
      let formData = new FormData();
      if (!this.selectedImage) {
        return alert('이미지를 선택해주세요.')
      } else {
        try {
          this.showImageResult = false;
          if (localStorage.getItem('userId') == null) {
            localStorage.setItem('userId', null);
            console.log('userid get' + localStorage.getItem('userId'));
            formData.append('userId', localStorage.getItem('userId'));
          } else {
            formData.append('userId', localStorage.getItem('userId'));
          }
          formData.append('image', this.selectedImage);
          const response = await this.$axios.post('http://localhost:5000/', formData);
          if (response.status == 200) {
            const result = await this.fetchData();
            this.keywords = result.keywords;
            // this.keywordArray = result.keywordArray;
            this.extractedData = result.extractedData;
            this.showImageResult = true;
            localStorage.setItem('keywordArray', JSON.stringify(result.keywordArray));
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