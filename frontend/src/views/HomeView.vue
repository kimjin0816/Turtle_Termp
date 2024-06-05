<template>
  <!-- 이미지 업로드와 검색 버튼 -->
  <v-row class="text-center">
    <v-col cols="12">
      <!-- 이미지 첨부 -->
      <v-row justify="center" style="margin-top: 50px;">
        <v-col cols="12" md="2">
          <v-form @submit.prevent="submitForm">
            <v-file-input label="Select Image" v-model="selectedImage" accept="image/*" name="image"></v-file-input>
            <v-btn type="submit" color="grey lighten-1" dark>이미지 검색</v-btn>
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
          <h1>이미지 결과</h1>
        </div>
        <v-row justify="center">
          <v-col v-for="(image, index) in similarImages" :key="index" cols="10" sm="4" md="4">
            <div class="image-container" style="text-align: center">
              <img :src="image" alt="Image Result" style="width: 100%; max-width: 300px; height: auto;" />
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
      keywords: ""
    };
  },
  methods: {
    submitForm() {
      let formData = new FormData();
      formData.append('image', this.selectedImage);

      axios.post('http://localhost:5000/', formData)
        .then(response => {
          console.log('Image uploaded successfully');
          this.uploadImage();
          this.getData();
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
        } catch (error) {
          console.error('uploadImage:', error);
        }
      }
    },
    async getData() {
      try {
        const response = await axios.get('http://localhost:3000/api/keyword');
        console.log(response.data);
        // let image = this.extractImages(response.data);
        this.fetchSimilarImages(response.data.imageUrls);
      } catch (error) {
        console.log(error)
        // console.error('getData(): 아직 받은 데이터가 없습니다.');
      }
    },

    async fetchSimilarImages(result) {
      try {
        this.similarImages = result;
        this.showImageResults = true;
      } catch (error) {
        console.log('fetchSimilarImages():', error);
      }
    },
  },
  mounted() {
    // this.getData();
  },
}
</script>