<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="text-center">키워드 입력</v-card-title>
      <v-form @submit.prevent="researchForm">
        <v-card-text>
          <v-text-field label="색깔" \v-model="keyword.color"></v-text-field>
          <v-text-field label="분류" v-model="keyword.classification"></v-text-field>
          <v-text-field label="종류" v-model="keyword.shape"></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn type="submit">재검색</v-btn>
          <v-btn type="reset">다시 쓰기</v-btn>
          <v-btn @click="this.dialog = false">취소</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: true, // 다이얼로그를 처음부터 보이도록 설정
      keyword: {
        color: '',
        shape: '',
        classification: ''
      }
    };
  },
  watch: {
    dialog(newVal) {
      if (!newVal) {
        this.$router.push("/");
      }
    },
  },
  mounted() {
    this.$bus.on("keywordArray", function (data) {
      this.keyword = data;
    });
  },
  methods: {
    researchForm() {
      response = this.axios.post('http://localhost:3000/api/search-images', {
        color: this.keyword.color,
        shape: this.keyword.shape,
        classification: this.keyword.classification
      });
    },
  },
}
</script>