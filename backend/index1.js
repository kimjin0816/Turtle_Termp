const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // CORS 미들웨어 추가하기

const pool = new Pool({         // 자신의 DB에 맞게 수정하기
  user: 'postgres',             // 자신의 DB user 이름 적기
  host: 'localhost',            // 자신의 DB host 이름 적기
  database: 'Project',          // 자신의 DB 서버 이름 적기
  password: '4485',             // 자신의 DB 비밀번호 적기
  port: 5432,                   // 자신의 DB 포트 번호 적기
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
  const { MEM_NAME, MEM_EMAIL } = req.body;

  try {
    const user = await pool.query('SELECT "MEM_ID", "MEM_PASSWORD" FROM "MEMBERSHIP" WHERE "MEM_NAME" = $1 AND "MEM_EMAIL" = $2',
      [MEM_NAME, MEM_EMAIL]);

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


// 회원 정보 수정
app.put('/updateProfile', async (req, res) => {
  const { MEM_ID, MEM_PASSWORD, MEM_NAME, MEM_EMAIL, MEM_TEL, MEM_NICKNAME, MEM_ADDRESS } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM "MEMBERSHIP" WHERE "MEM_ID" = $1', [MEM_ID]);

    if (existingUser.rows.length === 0) {
      return res.status(404).json({ message: '존재하지 않는 사용자입니다.' });
    }

    await pool.query('UPDATE "MEMBERSHIP" SET "MEM_PASSWORD" = $2, "MEM_NAME" = $3, "MEM_EMAIL" = $4, "MEM_TEL" = $5, "MEM_NICKNAME" = $6, "MEM_ADDRESS" = $7 WHERE "MEM_ID" = $1',
      [MEM_ID, MEM_PASSWORD, MEM_NAME, MEM_EMAIL, MEM_TEL, MEM_NICKNAME, MEM_ADDRESS]);

    res.status(200).json({ message: '회원 정보 수정 성공' });
  } catch (error) {
    console.error('회원 정보 수정 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});


// 회원 삭제 (탈퇴)
app.delete('/deleteProfile', async (req, res) => {
  const { MEM_ID, MEM_PASSWORD } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM "MEMBERSHIP" WHERE "MEM_ID" = $1 AND "MEM_PASSWORD" = $2', [MEM_ID, MEM_PASSWORD]);

    if (existingUser.rows.length === 0) {
      return res.status(404).json({ message: '존재하지 않는 사용자이거나 잘못된 비밀번호입니다.' });
    }

    await pool.query('DELETE FROM "MEMBERSHIP" WHERE "MEM_ID" = $1', [MEM_ID]);

    res.status(200).json({ message: '회원 삭제 성공' });
  } catch (error) {
    console.error('회원 삭제 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});


app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});