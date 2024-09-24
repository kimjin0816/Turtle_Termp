<template>
  <div>
    <v-dialog v-model="dialog" v-if="dialog" max-width="300px">
      <v-card>
        <v-card-title class="text-center">키워드 입력</v-card-title>
        <v-card-text>
          <!-- 키워드 수정 내용 -->
          <v-text-field label="색깔" v-model="clo_color">
            <!-- <p>현재 색깔: {{ keywordArray[0] }}</p> -->
          </v-text-field>
          <v-text-field label="특징"  v-model="feature_keyword">
            <!-- <p>현재 특징: {{ feature_keyword }}</p> -->
          </v-text-field>
          <v-text-field label="종류"  v-model="clo_name">
            <!-- <p>현재 종류: {{ keywordArray[1] }}</p> -->
          </v-text-field>
        </v-card-text>

        <v-card-actions class="justify-center">
          <input type="button" value="취소" @click="closeDialog" class="custom-cancel" />
          <input type="button" value="적용" @click="research" class="custom-btn" />
          <input type="button" value="최근 검색어" @click="getKeyword" class="custom-btn" />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-main v-if="resultOpen">
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
        <div>

          <v-row>
            <v-col v-for="(item, index) in extractedData" :key="index" cols="6" sm="3" md="2.4">
              <ImageResult :item="item" />
            </v-col>
          </v-row>

        </div>
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
      feature_keyword: '',
      clo_name: '',
      clo_color: '',
      extractedData: [],
    };
  },

  created() {
    this.getKeyword();
    this.$bus.$on('openDialog', this.openDialog);
  },

  methods: {
    closeDialog(){
      this.dialog = false; 
      this.resultOpen = true;
      if(this.extractedData.length == 0){
        this.$router.push('/');
        console.log(this.extractedData )
        }
    },
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
      if (localStorage.getItem("feature_keyword") != null) {
        this.feature_keyword = JSON.parse(localStorage.getItem('feature_keyword'));
      } else {
        this.feature_keyword = '추출된 특징이 없습니다.';
      }
      if (localStorage.getItem("clo_name") != null) {
        this.clo_name = JSON.parse(localStorage.getItem('clo_name'));
      } else {
        this.clo_name = '추출된 종류가 없습니다.';
      }
      if (localStorage.getItem("clo_color") != null) {
        this.clo_color = JSON.parse(localStorage.getItem('clo_color'));
      } else {
        this.clo_color = '추출된 색깔이 없습니다.';
      }
      keyword = this.clo_color + " " + this.feature_keyword + " " + this.clo_name;
      return keyword;
    },

    async research() {
      try {
        const keyword = this.clo_color + " " + this.feature_keyword + " " + this.clo_name;
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
            this.feature_keyword = result.data.feature_keyword;
            this.clo_color = result.data.clo_color;
            this.clo_name = result.data.clo_name;
            this.extractedData = result.data.extractedData;
            // this.keywordArray = result.keywordArray;
            this.dialog = false;
            localStorage.setItem('feature_keyword', JSON.stringify(this.feature_keyword));
            localStorage.setItem('clo_color', JSON.stringify(this.clo_color));
            localStorage.setItem('clo_name', JSON.stringify(this.clo_name));
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

<style scoped>
.text-center {
  font-family: 'KIMM_Bold';
  font-style: normal;
  font-weight: bold;
  line-height: 130%;
}

.custom-cancel {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  margin: 5px;
  width: 100%;
  height: 48px;
  background: #F0F0F0;
  color: #000000;
  border: 1;
  cursor: pointer;
}

.custom-btn {
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  margin: 5px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  background: rgb(0, 0, 0);
  color: #ffffff;
  border: none;
  cursor: pointer;
}

input:hover {
  background: grey;
}
</style>
