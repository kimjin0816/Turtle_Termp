const axios = require("axios");

const naverAPI = {
  // 네이버 쇼핑 API 호출 함수
  keywords: "",
  extractedData: [],

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
      console.log(response.data);
      // response.data에서 image키값만 추출하기
      this.keywords = queryParams.query;
      // 이미지 뿐만 아니라 카테고리와 가격과 제목을 가져오기

      this.extractedData = response.data.items.map((item) => ({
        title: item.title,
        link: item.link,
        image: item.image,
        lprice: item.lprice,
        category2: item.category2,
        category3: item.category3,
      }));

      console.log(this.keywords);
      console.log(this.extractedData);
      res.json({ status: "ok" });
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
      extractedData = this.extractedData;
      res.json({ keywords, extractedData });
      // reset
      this.keywords = "";
      this.extractedData = [];
    } catch (error) {
      console.error("postData(): ", error);
    }
  },
};

module.exports = naverAPI;
