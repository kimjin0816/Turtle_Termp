const { Pool } = require("pg");

const members = new Pool({
  // 자신의 DB에 맞게 수정
  user: "postgres", // 자신의 DB user 이름 적기
  host: "localhost", // 자신의 DB host 이름 적기
  database: "members", // 자신의 DB 서버 이름 적기
  password: "password", // 자신의 DB 비밀번호 적기
  port: 5432, // 자신의 DB 포트 번호 적기
});

const clothes = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Clothes",
  password: "password",
  port: 5432,
});

module.exports = {
  queryMembers: (text, params, callback) => {
    return members.query(text, params, callback);
  },

  queryClothes: (text, params, callback) => {
    return clothes.query(text, params, callback);
  },
};