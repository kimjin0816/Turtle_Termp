<template>
  <div v-show="showMemin">
    <h1>회원님의 검색 기록</h1>
    <button>로그 검색</button>
    <div v-for="(item, index) in extractedData" :key="index">
      <p>{{ item }}</p>
    </div>
    <div v-for="(item, index) in imgURL" :key="index">
      <img :src="item" alt="Image Result" style="width: 100%; max-width: 300px; height: auto;" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // userId: localStorage.getItem('userId'),
      showMemin: true,
      // 추가: 화면에 보이도록 여부를 관리할 변수
      extractedData: {
        userId: [],
        top_bottom: [],
        shape: [],
        classification: [],
        color: [],
        img: [],
        date: [],
        f_code: []
      },
      imgURL: []

    };
  },
  // 기타 로직 및 메서드 추가
  methods: {
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
        response.data.data_list.forEach(item => {
          this.extractedData.userId.push(item.userID);
          this.extractedData.top_bottom.push(item.top_bottom);
          this.extractedData.shape.push(item.shape);
          this.extractedData.classification.push(item.classification);
          this.extractedData.color.push(item.color);
          this.extractedData.img.push(item.img);
          let date = new Date(item.date);
          let year = date.getFullYear();
          let month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
          let day = date.getDate();
          let hour = date.getHours();
          let minute = date.getMinutes();
          let formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
          this.extractedData.date.push(formattedDate);
          this.extractedData.f_code.push(item.f_code);
        });
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
/* 필요한 스타일을 추가할 수 있습니다. */
</style>