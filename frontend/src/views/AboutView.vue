<template>
  <div>
    <v-dialog v-model="dialog" v-if="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-center">키워드 입력</v-card-title>
        <v-card-text>
          <!-- 키워드 수정 내용 -->
          <v-text-field label="종류" v-if="keywordArray" v-model="keywordArray[1]">
            <p>현재 종류: {{ keywordArray[1] }}</p>
          </v-text-field>
          <v-text-field label="색깔" v-if="keywordArray" v-model="keywordArray[0]">
            <p>현재 색깔: {{ keywordArray[0] }}</p>
          </v-text-field>
          <!-- <v-text-field label="브랜드" v-model="brand"></v-text-field>
          <v-text-field label="로고" v-model="logo"></v-text-field> -->
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn @click="research">재검색</v-btn>
          <v-btn @click="closeDialog">취소</v-btn>
          <v-btn @click="getKeyword">최근 검색어</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-main v-if="resultOpen" style="margin-top: -20px">
      <v-container>
        <div class="my-3" style="text-align: center">
          <v-row>
            <v-col>
              <h2>재검색 결과</h2>
            </v-col>
          </v-row>
        </div>
        <div class="my-3" style="text-align: center">
          <h2>{{ keywords }}</h2>
        </div>
        <v-row>
          <v-col v-for="(item, index) in extractedData" :key="index" cols="10" sm="4" md="4">
            <ImageResult :item="item" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>

</template>

<script>
import ImageResult from "./ImageResult.vue";

export default {
  name: 'AboutView',

  components: {
    ImageResult,
  },

  data() {
    return {
      dialog: true,
      resultOpen: true,
      keywords: '',
      keywordArray: [],
      extractedData: [],
    };
  },

  created() {
    this.getKeyword();
    this.$bus.$on('openDialog', this.openDialog);
  },

  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      if (this.keywords.length === 0 || this.extractedData.length === 0) {
        this.$router.push("/");
        this.resultOpen = false;
      } else {
        this.resultOpen = true;
      }
    },
    getKeyword() {
      if (localStorage.getItem("keywordArray") != null) {
        this.keywordArray = JSON.parse(localStorage.getItem('keywordArray'));
      } else {
        alert('입력한 키워드가 없습니다.');
      }
    },

    // 작업중
    async research() {
      try {
        localStorage.setItem('keywordArray', JSON.stringify(this.keywordArray));
        const keyword = this.keywordArray.toString().replace(/,/g, ' ');
        console.log("keyword :" + keyword);
        const response = await this.$axios.post('http://localhost:3000/api/search-images', {
          keywords: keyword,
          keywordArray: this.keywordArray
        });
        if (response.status == 200) {
          const result = await this.fetchData();
          console.log("result :" + JSON.stringify(result));
          if (result.status == 200) {
            this.keywords = result.data.keywords;
            this.extractedData = result.data.extractedData;
            // this.keywordArray = result.keywordArray;
            this.dialog = false;
            localStorage.setItem('keywordArray', JSON.stringify(result.data.keywordArray));
          } else {
            alert('검색 결과가 없습니다.');
          }
        }
      } catch (error) {
        console.log(error)
      }
      this.dialog = false; // 저장 후 다이얼로그 닫기
    },
    async fetchData() {
      try {
        const response = await this.$axios.get("http://localhost:3000/api/keyword");
        if (response.status == 200) {
          return response;
        }
      } catch (error) {
        console.error("Error fetching shopping data:", error);
      }
    }
  },
};
</script>