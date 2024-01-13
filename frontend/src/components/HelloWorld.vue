<template>
  <v-row class="text-center" style="margin-top: -20px;">
    <v-col cols="12">
      <!-- 첨부한 이미지 표시 영역 -->
      <v-row>
        <v-col v-for="(image, index) in attachedImages" :key="index" cols="10">
          <v-img :src="image.src" alt="Attached Image"></v-img>
        </v-col>
      </v-row>

      <!-- 이미지 첨부 -->
      <v-col>
        <v-file-input label="이미지를 첨부하세요" v-model="selectedImage" accept="image/*"></v-file-input>
        <v-btn @click="attachImage">이미지 첨부</v-btn>
      </v-col>

      <!-- 이미지 결과 -->
      <v-container>
        <div class="my-3" style="text-align: center;">
          <h1>이미지 결과</h1>
        </div>
        <v-row justify="center">
          <v-col v-for="(image, index) in attachedImages" :key="index" cols="10" sm="5" md="5">
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
        'https://example.com/path/to/image1.jpg',
        'https://example.com/path/to/image2.jpg',
        'https://example.com/path/to/image3.jpg',
        'https://example.com/path/to/image4.jpg',
        'https://example.com/path/to/image5.jpg',
        'https://example.com/path/to/image6.jpg',
        'https://example.com/path/to/image7.jpg',
        'https://example.com/path/to/image8.jpg',
        'https://example.com/path/to/image9.jpg',
        // Add more image URLs as needed
      ],
    };
  },

  mounted() {
    // Ensure the number of images is a multiple of 3 for a 3x3 grid
    this.attachedImages = this.sampleImages
      .slice(0, 9) // Slice the array to ensure it has a maximum of 9 items
      .map(src => ({ src }));
  },

  methods: {
    attachImage() {
      // Replace this logic with your actual image attachment logic
      if (this.selectedImage) {
        this.attachedImages.push({ src: URL.createObjectURL(this.selectedImage) });
        this.selectedImage = null;
      }
    },
  },
};
</script>

<style scoped>
.image-container {
  margin: 20px;
}
</style>