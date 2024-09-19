<template>
  <div v-show="showMemin" id="div-container">
    <h2>회원님의 검색 기록</h2>
    <div class="grid-container">
      <div v-if="paginatedData.length > 0" class="grid-item" v-for="(item, index) in paginatedData" :key="index">
        <p style="text-align: right;">
          <b>로그검색</b><br>
          종류 &nbsp;&nbsp;&nbsp;<b>{{ item.clo_name }}</b><br>
          색상 &nbsp;&nbsp;&nbsp;<b>{{ item.color }}</b><br>
          특징 &nbsp;&nbsp;&nbsp;<b>{{ item.feature_keyword }}</b><br>
          검색 날짜 &nbsp;&nbsp;&nbsp;<b>{{ item.date }}</b><br>
        </p>&nbsp;&nbsp;&nbsp;&nbsp;
        <img :src="item.imgURL" alt="Image Result" style="width: 150px; height: auto;" />
      </div>
      <div v-else class="NotFindLog">
        <p> 검색 기록이 없습니다.</p>
      </div>
    </div>
    <div class="text-xs-center">
      <v-pagination v-model="page" :length="totalPages" :total-visible="10"></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      itemsPerPage: 4,
      showMemin: true,
      extractedData: {
        userId: [],
        clo_name: [],
        color: [],
        img: [],
        date: [],
        feature_keyword: []
      },
      imgURL: []
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.extractedData.userId.length / this.itemsPerPage);
    },
    paginatedData() {
      const start = (this.page - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      console.log('Paginated Data:', this.extractedData.userId.slice(start, end).map((userId, index) => ({
        userId,
        clo_name: this.extractedData.clo_name[start + index],
        color: this.extractedData.color[start + index],
        date: this.extractedData.date[start + index],
        feature_keyword: this.extractedData.feature_keyword[start + index],
        imgURL: this.imgURL[start + index]
      })));
      return this.extractedData.userId.slice(start, end).map((userId, index) => ({
        userId,
        clo_name: this.extractedData.clo_name[start + index],
        color: this.extractedData.color[start + index],
        date: this.extractedData.date[start + index],
        feature_keyword: this.extractedData.feature_keyword[start + index],
        imgURL: this.imgURL[start + index]
      }));
    }
  },
  methods: {
    NotFindLog() {
      this.$router.push('/');
      alert('검색 기록이 없습니다.');
    },
    async searchLog_image() {
      try {
        for (let i = 0; i < this.extractedData.img.length; i++) {
          let imageName = this.extractedData.img[i];
          const response = await this.$axios.get(`${imageName}`, {
            responseType: 'arraybuffer',
          });
          let base64 = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
          this.imgURL.push('data:image/jpeg;base64,' + base64);
          console.log("SearchLog_image : " + this.imgURL);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async userSearchLog() {
      try {
        let id = localStorage.getItem('userId')
        let userid = id.replace(/"/g, '');
        console.log(userid)
        const response = await this.$axios.post(`http://localhost:5000/searchLog/${userid}`, {
          withCredentials: true,
        });
        console.log("SearchLog : " + JSON.stringify(response.data));
        if (response.data.data_list.length == 0) {
          this.NotFindLog();
        } else {
          response.data.data_list.forEach(item => {
            this.extractedData.userId.push(item.userID);
            this.extractedData.clo_name.push(item.clo_name);
            this.extractedData.color.push(item.color);
            this.extractedData.img.push(item.img);
            this.extractedData.feature_keyword.push(item.feature_keyword);
            let date = new Date(item.date);
            let year = date.getFullYear();
            let month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            // let formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
            let formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
            this.extractedData.date.push(formattedDate);
          });
        }
        this.searchLog_image();
      } catch (error) {
        console.error('로그 검색 실패:', error);
      }
    }
  },

  mounted() {
    this.userSearchLog();
  },
};
</script>

<style scoped>
#div-container {
  /* margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h2 {
  width: 222px;
  height: 39px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 130%;
  margin-bottom: 20px;
  flex: 1;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  width: fit-content;
  height: fit-content;
  gap: 10px;
}

.grid-item {
  padding: 10px;
}
</style>