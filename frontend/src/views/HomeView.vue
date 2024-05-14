<template>
  <v-row class="text-center">
    <v-col cols="12">
      <!-- 이미지 첨부 -->
      <v-row justify="center" style="margin-top: 50px;">
        <v-col cols="12" md="2">
          <v-file-input
            v-model="selectedImage"
            accept="image/*"
            @change="handleImageUpload"
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
        <v-row justify="center">
          <v-col v-for="(image, index) in similarImages" :key="index" cols="10" sm="4" md="4">
            <div class="image-container" style="text-align: center;">
              <img :src="image" alt="Similar Image">
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Home',

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

    async fetchSimilarImages(query) {
      try {
        const response = await axios.get(`https://openapi.naver.com/v1/search/shop.json?query=${query}`, {
          headers: {
            "X-Naver-Client-Id": "zAMBQH5GApM3LsK2hpiw", // 실제 클라이언트 ID로 대체
            "X-Naver-Client-Secret": "m2rFPTyrqS" // 실제 클라이언트 시크릿으로 대체
          }
        });

        if (response.status === 200) {
          if (response.data.items && response.data.items.length > 0) {
            this.similarImages = response.data.items.map(item => item.image);
            this.showImageResults = true;
          } else {
            throw new Error('응답에서 항목을 찾을 수 없습니다.');
          }
        } else {
          throw new Error('Naver API에서 데이터 가져오기 실패');
        }
      } catch (error) {
        this.handleError("유사한 이미지 가져오기 중 오류 발생:", error);
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
}
</script>