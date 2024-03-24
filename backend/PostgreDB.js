const { Pool } = require("pg");

const pool = new Pool({         // 자신의 DB에 맞게 수정
  user: 'postgres',             // 자신의 DB user 이름 적기
  host: 'localhost',            // 자신의 DB host 이름 적기
  database: 'postgres',          // 자신의 DB 서버 이름 적기
  password: '1015',             // 자신의 DB 비밀번호 적기
  port: 5432,                   // 자신의 DB 포트 번호 적기
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};