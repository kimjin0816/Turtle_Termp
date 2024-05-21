<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="text-center">키워드 입력</v-card-title>
      <v-card-text>
        <!-- 키워드 수정 내용 -->
        <v-text-field label="종류" v-model="kind"></v-text-field>
        <v-text-field label="색깔" v-model="color"></v-text-field>
        <v-text-field label="브랜드" v-model="brand"></v-text-field>
        <v-text-field label="로고" v-model="logo"></v-text-field>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn @click="saveChanges">적용</v-btn>
        <v-btn @click="cancelEdit">취소</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: true, // 다이얼로그를 처음부터 보이도록 설정
      kind: '',
      color: '',
      brand: '',
      logo: '',
    };
  },
  methods: {
    saveChanges() {
      console.log('종류:', this.kind);
      console.log('색깔:', this.color);
      console.log('브랜드:', this.brand);
      console.log('로고:', this.logo);
      this.dialog = false; // 저장 후 다이얼로그 닫기
    },
    cancelEdit() {
      this.dialog = false;
    },
    searchImages() {
      this.$router.push({
        name: 'home', // 메인 뷰의 이름
        params: {
          kind: this.kind,
          color: this.color,
          brand: this.brand,
          logo: this.logo,
        },
      });
    },
  },
};
</script>