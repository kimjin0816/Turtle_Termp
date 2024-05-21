const express = require("express");
const session = require("express-session");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const routes = require("./router");

const app = express();
const port = 3000;
const sessionKey = crypto.randomBytes(32).toString("base64");

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:8080", // 클라이언트 주소
    methods: ["GET", "POST"],
    credentials: true, // 쿠키를 허용합니다.
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(routes);

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 동작 중....`);
});