const express = require("express");
const session = require("express-session");
// const http = require("http");
const cors = require("cors");
const crypto = require("crypto");
const axios = require("axios");

const routes = require("./router");
const passport_session = require("./passport-session");

const app = express();
const port = 3000;
const sessionKey = crypto.randomBytes(32).toString("base64");

app.use(
  cors({
    origin: "http://localhost:8080", // 클라이언트의 주소를 명시적으로 설정
    credentials: true, // Access-Control-Allow-Credentials 헤더를 true로 설정
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
    },
  })
);

passport_session(app);
app.use(routes);

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 동작 중....`);
});
