<template>
  <v-row class="text-center" style="margin-top: -20px;">
    <v-col cols="12">
      <!-- 이미지 결과 -->
      <v-container>
        <div class="my-3" style="text-align: center;">
          <h1>코디 결과</h1>
        </div>
        <v-row justify="center">
          <v-col v-for="(image, index) in attachedImages" :key="index" cols="10" sm="4" md="4">
            <div class="image-container" style="text-align: center;">
              <img :src="image.src" alt="Image Result">
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      selectedImage: null,
      attachedImages: [],
      sampleImages: [
        'https://image.msscdn.net/images/goods_img/20220914/2791270/2791270_1_220.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqAJDWPVegd7nuOwFv96FFtSmilb7ozE9otNuo6Hngw62AiCTlRiRMnkeQxUMhmMLBL1s&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_uqWUqtQSh6Qo_wgHOaKkvkWIX5xnhGIqIQ&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPj2p5qtDE8KIGl2hWU7X_QGyKiuAl3TvHsw&usqp=CAU',
        'https://image.msscdn.net/images/goods_img/20230323/3171863/3171863_16795309547872_220.jpg',
        'https://image.msscdn.net/images/goods_img/20230420/3248611/3248611_16822596398411_220.jpg'
      ],
    };
  },

  mounted() {
    this.attachedImages = this.sampleImages
      .slice(0, 9)
      .map(src => ({ src }));
  },

  methods: {
    attachImage() {
      if (this.selectedImage) {
        this.attachedImages.push({ src: URL.createObjectURL(this.selectedImage) });
        this.selectedImage = null;
      }
    },
    gotoCody() {
      this.$router.push('/cody');
    }
  },
};
</script>

<style scoped>
.image-container {
  margin: 20px;
}
</style>