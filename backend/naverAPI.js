const axios = require("axios");

const naverAPI = {
  // 네이버 쇼핑 API 호출 함수
  keywords: "",
  imageUrls: [],

  async callNaverShoppingAPI(req, res) {
    try {
      queryParams = {
        query: null, // 결과 이미지가 나오게 하는 쿼리 값
        display: 20, // 검색 개수
      };
      clientId = "MLN5m3nClexyvNU0pp46";
      clientSecret = "fOYgb7iZsf";

      queryParams.query = req.params.keyword; // keyword 파라미터를 가져옵니다.

      const response = await axios.get(
        "https://openapi.naver.com/v1/search/shop.json",
        {
          params: queryParams,
          headers: {
            "X-Naver-Client-Id": clientId,
            "X-Naver-Client-Secret": clientSecret,
            "User-Agent": "axios/1.6.8",
            "Accept-Encoding": "gzip, compress, deflate, br",
          },
        }
      );
      res.json({ status: "ok" });
      console.log(response.data);
      // response.data에서 image키값만 추출하기
      this.keywords = queryParams.query;
      this.imageUrls = response.data.items.map((item) => item.image);
      console.log(this.keywords);
      console.log(this.imageUrls);
      // await this.postdata(response.data, queryParams.query);
    } catch (error) {
      console.error("callNaverShoppingAPI()", error);
    }
  },

  // async postdata() {
  //   try {
  //     const result = app.post("http://localhost:8080/api/keyword", {
  //       keyword: this.keyword,
  //       items: this.items,
  //     });
  //     console.log("여기까지 올까? " + result.data);
  //   } catch (error) {
  //     console.error("postData(): ", error);
  //     throw error;
  //   }
  // },
  postdata(req, res) {
    try {
      keywords = this.keywords;
      imageUrls = this.imageUrls;
      res.json({ keywords, imageUrls });
    } catch (error) {
      console.error("postData(): ", error);
    }
  },
};

module.exports = naverAPI;