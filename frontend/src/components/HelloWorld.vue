<template>
  <v-row class="text-center" style="margin-top: 10px;">
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
      <v-col>
        <div class="my-3" style="text-align: center;">
          <h1>이미지 결과</h1>
        </div>
        <!-- 여기에 이미지 결과를 나타내는 컴포넌트 또는 코드를 추가하세요 -->
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Home',

  data: () => ({
    selectedImage: null, // 첨부할 이미지 파일
    attachedImages: [],  // 첨부한 이미지들을 저장하는 배열
  }),

  methods: {
    attachImage() {
      if (this.selectedImage) {
        // 이미지를 배열에 추가
        this.attachedImages.push({ src: URL.createObjectURL(this.selectedImage) });
        // 선택한 이미지 초기화
        this.selectedImage = null;
      }
    },
  },
};
</script>