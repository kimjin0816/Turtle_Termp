const express = require("express");
const session = require("express-session");
const cors = require("cors");
const crypto = require("crypto");
const axios = require("axios");
const routes = require("./router");

const app = express();
const port = 3000; // 포트를 3000번으로 설정

// 세션 설정
const sessionKey = crypto.randomBytes(32).toString("base64");
app.use(
  session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(express.json());

// 라우터 모듈 사용
app.use(routes);

// require("./router.js")(app);

// 네이버 쇼핑 API 호출 함수
const queryParams = {
  query: "흰색 반팔", // 결과 이미지가 나오게 하는 쿼리 값
  display: 20, // 검색 개수
};

const clientId = "MLN5m3nClexyvNU0pp46";
const clientSecret = "fOYgb7iZsf";

async function callNaverShoppingAPI() {
  try {
    const response = await axios.get("https://openapi.naver.com/v1/search/shop.json", {
      params: queryParams,
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
        "User-Agent": "axios/1.6.8",
        "Accept-Encoding": "gzip, compress, deflate, br",
      },
    });

    return response.data.items.map((item) => item.image); // 이미지 URL만 반환
  } catch (error) {
    console.error("네이버 쇼핑 API 호출 오류:", error);
    throw error;
  }
}

// 새로운 API 엔드포인트 추가
app.get("/api/search-images", async (req, res) => {
  try {
    const images = await callNaverShoppingAPI();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 동작 중....`);
});