<template>
  <v-container fluid>
    <v-row class="justify-end" style="margin-right: 400px; margin-top: 30px;">
      <v-btn @click="searchImages" color="lighten grey1">검색</v-btn>
    </v-row>
    <v-row v-if="showEditForm" justify="center" align="center" style="width: 99%; margin-top: 30px;">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="text-center">키워드 Search</v-card-title>
          <v-card-text>
            <!-- 키워드 수정 내용 -->
            <v-text-field label="색깔" v-model="color"></v-text-field>
            <v-text-field label="브랜드" v-model="brand"></v-text-field>
            <v-text-field label="로고" v-model="logo"></v-text-field>
            <v-text-field label="사이즈" v-model="size"></v-text-field>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="saveChanges">적용</v-btn>
            <v-btn @click="cancelEdit">취소</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showEditForm: true, // 수정 폼을 처음부터 보이도록 설정
      color: '',
      brand: '',
      logo: '',
      size: '',
    };
  },
  methods: {
    saveChanges() {
      // 변경된 내용을 저장하는 로직을 작성
      console.log('색깔:', this.color);
      console.log('브랜드:', this.brand);
      console.log('로고:', this.logo);
      console.log('사이즈:', this.size);
    },
    cancelEdit() {
      // 취소 버튼 클릭 시 폼 닫기
      this.showEditForm = false;
    },
    searchImages() {
      // 검색 버튼 클릭 시 메인 뷰로 이동하면서 키워드 전달
      this.$router.push({
        name: 'home', // 메인 뷰의 이름
        params: {
          color: this.color,
          brand: this.brand,
          logo: this.logo,
          size: this.size,
        },
      });
    },
  },
};
</script>