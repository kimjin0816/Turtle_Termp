const clothesController = require("./clothesController");
const userController = require("./userController");
const ps = require("./passport-session");
const axios = require("axios");


const naverAPI = {
  keywords: "",
  keywordArray: [],
  extractedData: [],
  save_path: "",
  userId: "",
  // naverAPI call
  async callNaverShoppingAPI(req, res) {
    try {
      queryParams = {
        query: null, // 결과 이미지가 나오게 하는 쿼리 값
        display: 20, // 검색 개수
      };
      queryParams.query = req.body.keywords;
      this.userId = ps.userId;
      this.keywordArray = req.body.keywordArray;
      this.keywords = req.body.keywords;

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

      // get data filter
      this.extractedData = response.data.items.map((item) => ({
        title: item.title,
        link: item.link,
        image: item.image,
        lprice: item.lprice,
        category2: item.category2,
        category3: item.category3,
      }));
      res.json({ status: "ok" });
    } catch (error) {
      console.error("callNaverShoppingAPI()", error);
    }
  },

  postData(req, res) {
    try {
      res.json({
        keywords: this.keywords,
        keywordArray: this.keywordArray,
        extractedData: this.extractedData,
      });
      // reset
      this.keywords = "";
      this.keywordArray = [];
      this.extractedData = [];
      if (!ps.userId) {
        this.userId = "";
      } else {
        this.userId = ps.userId;
      }
    } catch (error) {
      console.error("postData(): ", error);
    }
  },
};

/* async postdata() {
  try {
    const result = app.post("http://localhost:8080/api/keyword", {
      keyword: this.keyword,
      items: this.items,
    });
    console.log("여기까지 올까? " + result.data);
  } catch (error) {
    console.error("postData(): ", error);
    throw error;
  }
}, */

module.exports = naverAPI;
