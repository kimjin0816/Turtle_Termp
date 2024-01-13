<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col>
        <v-btn @click="showEditForm = true">키워드 수정</v-btn>
      </v-col>
      <v-col>
        <!-- 검색 버튼 -->
        <v-btn @click="searchImages">검색</v-btn>
      </v-col>
    </v-row>

    <!-- 수정 폼 -->
    <v-row v-if="showEditForm" justify="center">
      <v-col>
        <v-card>
          <v-card-title>키워드 수정 표</v-card-title>
          <v-card-text>
            <!-- 키워드 수정 내용 -->
            <v-text-field label="색깔" v-model="color"></v-text-field>
            <v-text-field label="브랜드" v-model="brand"></v-text-field>
            <v-text-field label="로고" v-model="logo"></v-text-field>
            <v-text-field label="사이즈" v-model="size"></v-text-field>
          </v-card-text>
          <v-card-actions>
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
      showEditForm: false,
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

      // 저장 후 폼 닫기
      this.showEditForm = false;
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