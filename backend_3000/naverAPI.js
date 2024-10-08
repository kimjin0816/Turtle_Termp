const ps = require("./passport-session");
const axios = require("axios");


const naverAPI = {
  keywords: "",
  feature_keyword: "",
  clo_color: "",
  clo_name: "",
  save_path: "",

  // naverAPI call
  async callNaverShoppingAPI(req, res) {
    try {
      queryParams = {
        query: null, // 결과 이미지가 나오게 하는 쿼리 값
        display: 20, // 검색 개수
      };
      queryParams.query = req.body.keywords;
      this.keywords = req.body.keywords;
      this.feature_keyword = req.body.feature_keyword;
      this.clo_color = req.body.clo_color;
      this.clo_name = req.body.clo_name;

      clientId = "MLN5m3nClexyvNU0pp46";
      clientSecret = "fOYgb7iZsf";

      // naverAPI call
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
      this.extractedData = response.data.items.map((item) => ({
        title: item.title,
        link: item.link,
        image: item.image,
        lprice: item.lprice,
        category2: item.category2,
        category3: item.category3,
      }));
      if (response.status == 200) {
        res.json({ status: "ok" });
      }
    } catch (error) {
      console.error("callNaverShoppingAPI()", error);
    }
  },

  postData(req, res) {
    try {
      res.json({
        keywords: this.keywords,
        feature_keyword: this.feature_keyword,
        clo_color: this.clo_color,
        clo_name: this.clo_name,
        // keywordArray: this.keywordArray,
        extractedData: this.extractedData,
        showImageResult : true
      });
      // reset
      // this.keywords = "";
      // this.keywordArray = [];
      // this.extractedData = [];
      // if (!ps.userId) {
      //   this.userId = "";
      // } else {
      //   this.userId = ps.userId;
      // }
    } catch (error) {
      console.error("postData(): ", error);
    }
  },
};

module.exports = naverAPI;
