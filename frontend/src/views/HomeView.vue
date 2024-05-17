<template>
  <!-- 이미지 업로드와 검색 버튼 -->
  <v-row class="text-center">
    <v-col cols="12">
      <!-- 이미지 첨부 -->
      <v-row justify="center" style="margin-top: 50px;">
        <v-col cols="12" md="2">
          <v-file-input
            v-model="selectedImage"
            accept="image/*"
            @change="handleImageUpload('모르겠음 근데 이 코드 없으면 실행 안됨')"
          ></v-file-input>
        </v-col>
      </v-row>

      <!-- 이미지 검색 및 코디 검색 버튼 -->
      <v-row class="text-center">
        <v-col class="text-right" style="margin-left: -360px; margin-top: 20px;">
          <v-btn color="grey lighten-1" dark @click="attachImage">이미지 검색</v-btn>
          <v-btn color="secondary" dark @click="gotoCody">코디 검색</v-btn>
        </v-col>
      </v-row>

      <!-- 첨부한 이미지 표시 -->
      <v-row justify="center" v-if="attachedImages.length > 0">
        <v-col v-for="(image, index) in attachedImages" :key="index" cols="12" md="4">
          <div class="image-container" style="text-align: center;">
            <img :src="image" alt="Attached Image">
          </div>
        </v-col>
      </v-row>

      <!-- 이미지 결과 -->
      <v-container v-if="showImageResults">
        <div class="my-3" style="text-align: center;">
          <h1>이미지 결과</h1>
        </div>
        <!-- 유사한 이미지 표시 -->
        <v-row justify="center">
          <v-col v-for="(image, index) in similarImages" :key="index" cols="12" sm="6" md="3">
            <div class="image-container" style="text-align: center;">
              <img :src="image" alt="Similar Image" style="width: 250px; height: 250px;">
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
      error: null,
    };
  },
  methods: {
    async handleImageUpload(keyword) {
      if (this.selectedImage) {
        try {
          const imageURL = URL.createObjectURL(this.selectedImage);
          this.attachedImages.unshift(imageURL);
          this.selectedImage = null;
          // 사용자가 입력한 키워드를 사용하여 유사한 이미지를 가져오는 함수 호출
          await this.fetchSimilarImages(keyword);
        } catch (error) {
          this.handleError("이미지 업로드 처리 중 오류 발생:", error);
        }
      }
    },

    async fetchSimilarImages(keyword) {
      try {
        const response = await axios.get('http://localhost:4000/api/search-images', {
          params: { query: keyword },
        });

        if (response.status === 200) {
          this.similarImages = response.data;
          this.showImageResults = true;
        } else {
          throw new Error('이미지 가져오기에 실패했습니다.');
        }
      } catch (error) {
        this.handleError("이미지 가져오기 중 오류 발생:", error);
      }
    },

    attachImage() {
      if (this.attachedImages.length === 0) {
        this.attachedImages = this.sampleImages.slice();
      }
      this.showImageResults = true;
    },

    gotoCody() {
      this.$router.push('/cody');
    },

    handleError(message, error) {
      console.error(message, error);
      this.error = error.message;
      this.showImageResults = false;
    }
  }
};
</script>
