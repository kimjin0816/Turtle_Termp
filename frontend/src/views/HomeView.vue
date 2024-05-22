<template>
  <!-- 이미지 업로드와 검색 버튼 -->
  <v-row class="text-center">
    <v-col cols="12">
      <!-- 이미지 첨부 -->
      <v-row justify="center" style="margin-top: 50px;">
        <v-col cols="12" md="2">
          <v-form @submit.prevent="submitForm">
            <v-file-input label="Select Image" v-model="selectedImage" accept="image/*" name="image"
              @change="uploadImage(); showImageResults = false"></v-file-input>
            <v-btn type="submit" color="grey lighten-1" dark>이미지 분석</v-btn>
            <v-btn color="secondary" dark @click="gotoCody">코디 검색</v-btn>
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

      <!-- 이미지 결과 -->
      <v-container v-if="showImageResults" style="margin-top: -20px">
        <div class="my-3" style="text-align: center">
          <v-row>
            <v-col>
              <v-btn @click="getData" text color="black" class="ml-1 move-left"
                style="text-decoration: underline; font-size: 20px;">
                결과 보기
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <v-row justify="center">
          <v-col v-for="(item, index) in similarImages" :key="index" cols="10" sm="4" md="4">
            <div class="image-container" style="text-align: center">
              <img :src="item.image" alt="Image Result" style="width: 100%; max-width: 300px; height: auto;" />
              <div class="image-info">
                <h2 v-html="item.title"></h2>
                <a :href="item.link">상품 링크</a>
                <p>{{ item.lprice | formatPrice }}원</p>
                <p>{{ item.category2 }}</p>
                <p>{{ item.category3 }}</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  name: "Home",
  data() {
    return {
      selectedImage: null,
      attachedImages: [],
      similarImages: [],
      showImageResults: false,
      keywords: "",
    };
  },
  filters: {
    formatPrice(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods: {
    async submitForm() {
      this.showImageResults = false;
      let formData = new FormData();
      formData.append('image', this.selectedImage);

      await axios.post('http://localhost:5000/', formData)
        .then(response => {
          console.log('Image uploaded successfully');
          this.showImageResults = true;
          // this.uploadImage();
          // this.getData();
          // this.fetchSimilarImages(this.getData());
        })
        .catch(error => {
          console.error('submit(): ', error);
        });
    },

    uploadImage() {
      if (this.selectedImage) {
        try {
          this.attachedImages = []; // 첨부된 이미지 초기화
          const imageURL = URL.createObjectURL(this.selectedImage);
          this.attachedImages.unshift({ src: imageURL });
          // this.selectedImage = null;
        } catch (error) {
          console.error('uploadImage:', error);
        }
      }
    },
    async getData() {
      try {
        const response = await axios.get('http://localhost:3000/api/keyword');
        console.log(response.data);
        console.log(response.data.extractedData.length);
        this.keywords = response.data.keywords;
        // getData array from the response data
        this.similarImages = response.data.extractedData.map(item => {
          return {
            title: item.title,
            link: item.link,
            image: item.image,
            lprice: item.lprice,
            category2: item.category2,
            category3: item.category3,
          };
        });
        this.showImageResults = true;
      } catch (error) {
        console.log(error)
      }
    },

    gotoCody() {
      this.$router.push('/cody');
    }
  },
  mounted() {
    // this.getData();
  },
}
</script>