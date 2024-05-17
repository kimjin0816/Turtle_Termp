<template>
  <div>
    <!-- Vimeo 동영상을 배경으로 사용 -->
    <div class="background-video">
      <iframe src="https://player.vimeo.com/video/905154784?h=27113fcebe&autoplay=1&muted=1&background=1&loop=1"
        frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
    </div>

    <!-- 나머지 컨텐츠 -->
    <v-row class="text-center" style="margin-top: 20px; position: relative; z-index: 1">
      <v-col cols="12">
        <!-- 이미지 첨부 -->
        <v-form @submit.prevent="submitForm">
          <v-file-input label="Select Image" v-model="selectedImage" accept="image/*" name="image"></v-file-input>
          <v-btn type="submit" color="grey lighten-1" dark>이미지 검색</v-btn> &nbsp;
          <v-btn color="secondary" dark @click="gotoCody">코디 검색</v-btn>
        </v-form>

        <!-- 첨부한 이미지 표시 -->
        <v-row justify="center" v-if="attachedImages.length > 0">
          <v-col v-for="(image, index) in attachedImages" :key="index" cols="12" md="4">
            <div class="image-container" style="text-align: center">
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
            <v-col v-for="(image, index) in sampleImages" :key="index" cols="10" sm="4" md="4">
              <div class="image-container" style="text-align: center">
                <img :src="image" alt="Image Result" />
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Home",

  data() {
    return {
      selectedImage: null,
      attachedImages: [],
      sampleImages: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7KM7vOVphY-zy8Ae_qPqpQfnK_822ft_grQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkez3IZvYv6uHfIXFwlvg4w-tLc9DSBKlIUw&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0W_nMXerCzDwJDmo6xOx3L16CIgiFVniOLQ&usqp=CAU",
        "https://image.msscdn.net/images/goods_img/20220304/2399242/2399242_16992451161248_220.jpg",
        "https://image.msscdn.net/images/goods_img/20220902/2764455/2764455_3_220.jpg",
        "https://image.msscdn.net/images/goods_img/20230330/3193115/3193115_16856981907690_220.jpg",
      ],
      showImageResults: false, // 이미지 결과를 표시할지 여부를 저장하는 변수
      IsLogin: false
    };
  },
  methods: {
    submitForm() {
      // 현재 로그인이 되어있는 상태인지 확인하는 방법
      // if (this.$store.getters['auth/isAuthenticated']) {
      //   this.IsLogin = true;
      // } else {
      //   this.IsLogin = false;
      // }
      const serverImage = this.selectedImage;
      this.attachedImages = []; // 이전에 첨부된 이미지 초기화
      this.attachedImages.push({ src: URL.createObjectURL(this.selectedImage) });
      this.selectedImage = null;

      // FormData 객체 생성
      let formData = new FormData();
      // 선택된 이미지를 FormData에 추가
      formData.append('image', serverImage);

      // Axios를 사용하여 서버로 이미지를 전송
      axios.post('http://localhost:5000/', formData)
        .then(response => {
          console.log('Image uploaded successfully');
          // 서버 응답을 처리하는 추가적인 작업 수행
        })
        .catch(error => {
          console.error('Error uploading image:', error);
        });
    },
    attachImage() {
      // 이미지 첨부 버튼 클릭 시 첨부된 이미지가 있는지 확인
      if (this.attachedImages.length === 0) {
        // 첨부된 이미지가 없으면 샘플 이미지를 추가
        this.attachedImages = this.sampleImages.slice();
      }
      this.showImageResults = true; // 이미지 결과를 표시
    },
    gotoCody() {
      this.$router.push("/cody");
    },
  }
};
</script>

<style scoped>
.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.background-video iframe {
  width: 100%;
  height: 100%;
}
</style>