const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '4485',
  port: 5432,
});

app.use(express.json());


// 회원가입
app.post('/signup', async (req, res) => {
  const { MEM_ID, MEM_PASSWORD, MEM_NAME, MEM_EMAIL, MEM_TEL, MEM_NICKNAME, MEM_ADDRESS } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM "MEMBERSHIP" WHERE "MEM_ID" = $1', [MEM_ID]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: '이미 존재하는 사용자입니다.' });
    }

    await pool.query('INSERT INTO "MEMBERSHIP" ("MEM_ID", "MEM_PASSWORD", "MEM_NAME", "MEM_EMAIL", "MEM_TEL", "MEM_NICKNAME", "MEM_ADDRESS") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [MEM_ID, MEM_PASSWORD, MEM_NAME, MEM_EMAIL, MEM_TEL, MEM_NICKNAME, MEM_ADDRESS]);

    res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    console.error('회원가입 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});


// 로그인
app.post('/login', async (req, res) => {
  const { MEM_ID, MEM_PASSWORD } = req.body;

  try {
    const user = await pool.query('SELECT * FROM "MEMBERSHIP" WHERE "MEM_ID" = $1 AND "MEM_PASSWORD" = $2',
      [MEM_ID, MEM_PASSWORD]);

    if (user.rows.length > 0) {
      res.status(200).json({ message: '로그인 성공' });
    } else {
      res.status(401).json({ message: '유효하지 않은 사용자 또는 비밀번호' });
    }
  } catch (error) {
    console.error('로그인 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});


// 아이디 및 비밀번호 찾기
app.post('/findCredentials', async (req, res) => {
  const { MEM_ID, MEM_TEL } = req.body;

  try {
    const user = await pool.query('SELECT "MEM_ID", "MEM_PASSWORD" FROM "MEMBERSHIP" WHERE "MEM_ID" = $1 AND "MEM_TEL" = $2',
      [MEM_ID, MEM_TEL]);

    if (user.rows.length > 0) {
      const { MEM_ID, MEM_PASSWORD } = user.rows[0];
      res.status(200).json({ message: '아이디 및 비밀번호 찾기 성공', MEM_ID, MEM_PASSWORD });
    } else {
      res.status(404).json({ message: '일치하는 사용자를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('아이디/비밀번호 찾기 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});


app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});