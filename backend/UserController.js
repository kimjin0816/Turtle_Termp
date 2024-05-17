const { queryMembers } = require("./PostgreDB");

const UserController = {
  // 회원가입
  async signUp(req, res) {
    const {
      MEM_ID,
      MEM_PASSWORD,
      MEM_NAME,
      MEM_EMAIL,
      MEM_TEL,
      MEM_NICKNAME,
      MEM_ADDRESS,
    } = req.body;

    try {
      const existingUser = await queryMembers(
        'SELECT * FROM "MEMBERSHIP" WHERE "MEM_ID" = $1',
        [MEM_ID]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: "이미 존재하는 사용자입니다." });
      }

      await queryMembers(
        'INSERT INTO "MEMBERSHIP" ("MEM_ID", "MEM_PASSWORD", "MEM_NAME", "MEM_EMAIL", "MEM_TEL", "MEM_NICKNAME", "MEM_ADDRESS") VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [
          MEM_ID,
          MEM_PASSWORD,
          MEM_NAME,
          MEM_EMAIL,
          MEM_TEL,
          MEM_NICKNAME,
          MEM_ADDRESS,
        ]
      );

      res.status(201).json({ message: "회원가입 성공" });
    } catch (error) {
      console.error("회원가입 오류:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  },

  // 로그인
  async login(req, res) {
    const { MEM_ID, MEM_PASSWORD } = req.body;

    try {
      const user = await queryMembers(
        'SELECT * FROM "MEMBERSHIP" WHERE "MEM_ID" = $1 AND "MEM_PASSWORD" = $2',
        [MEM_ID, MEM_PASSWORD]
      );

      if (user.rows.length > 0) {
        req.session.sessionUserId = user.rows[0].MEM_ID; // 세션에 사용자 정보 저장
        // console.log(user.rows[0]);
        console.log(JSON.stringify(req.session));
        console.log("쿠키 확인 " + JSON.stringify(req.cookies.cookieUserId));
        console.log("세션 확인 " + JSON.stringify(req.session.sessionUserId));
        res.status(200).json({
          message: "로그인 성공",
          nickname: user.rows[0].MEM_NICKNAME,
          isLogined: true,
        });
      } else {
        res.status(401).json({ message: "유효하지 않은 사용자 또는 비밀번호" });
        isLogined = false;
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  },

  // 로그아웃
  async logout(req, res) {
    try {
      // 세션 지우기
      req.session.destroy((err) => {
        if (err) {
          console.error("세션 삭제 오류:", err);
          res.status(500).json({ message: "로그아웃 실패" });
        } else {
          // res.clearCookie("userId", { path: "/", domain: "localhost" }); // 쿠키 삭제
          // console.log("쿠키 삭제 확인 " + JSON.stringify(req.cookies));
          console.log("세션 삭제 성공" + JSON.stringify(req.session));
          res.status(200).json({ message: "로그아웃 성공", isLogined: false });
        }
      });
    } catch (error) {
      console.error("로그아웃 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  },

  // 아이디 및 비밀번호 찾기
  async findCredentials(req, res) {
    const { MEM_NAME, MEM_EMAIL } = req.body;

    try {
      const user = await queryMembers(
        'SELECT "MEM_ID", "MEM_PASSWORD" FROM "MEMBERSHIP" WHERE "MEM_NAME" = $1 AND "MEM_EMAIL" = $2',
        [MEM_NAME, MEM_EMAIL]
      );

      if (user.rows.length > 0) {
        const { MEM_ID, MEM_PASSWORD } = user.rows[0];
        res.status(200).json({
          message: "아이디 및 비밀번호 찾기 성공",
          MEM_ID,
          MEM_PASSWORD,
        });
      } else {
        res
          .status(404)
          .json({ message: "일치하는 사용자를 찾을 수 없습니다." });
      }
    } catch (error) {
      console.error("아이디/비밀번호 찾기 오류:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  },

  // 회원 정보 수정
  async updateProfile(req, res) {
    const {
      MEM_ID,
      MEM_PASSWORD,
      MEM_NAME,
      MEM_EMAIL,
      MEM_TEL,
      MEM_NICKNAME,
      MEM_ADDRESS,
    } = req.body;

    try {
      const existingUser = await queryMembers(
        'SELECT * FROM "MEMBERSHIP" WHERE "MEM_ID" = $1',
        [MEM_ID]
      );

      if (existingUser.rows.length === 0) {
        return res.status(404).json({ message: "존재하지 않는 사용자입니다." });
      }

      await queryMembers(
        'UPDATE "MEMBERSHIP" SET "MEM_PASSWORD" = $2, "MEM_NAME" = $3, "MEM_EMAIL" = $4, "MEM_TEL" = $5, "MEM_NICKNAME" = $6, "MEM_ADDRESS" = $7 WHERE "MEM_ID" = $1',
        [
          MEM_ID,
          MEM_PASSWORD,
          MEM_NAME,
          MEM_EMAIL,
          MEM_TEL,
          MEM_NICKNAME,
          MEM_ADDRESS,
        ]
      );

      res.status(200).json({ message: "회원 정보 수정 성공" });
    } catch (error) {
      console.error("회원 정보 수정 오류:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  },

  // 회원 삭제 (탈퇴)
  async deleteProfile(req, res) {
    const { MEM_ID, MEM_PASSWORD } = req.body;

    try {
      const existingUser = await queryMembers(
        'SELECT * FROM "MEMBERSHIP" WHERE "MEM_ID" = $1 AND "MEM_PASSWORD" = $2',
        [MEM_ID, MEM_PASSWORD]
      );

      if (existingUser.rows.length === 0) {
        return res.status(404).json({
          message: "존재하지 않는 사용자이거나 잘못된 비밀번호입니다.",
        });
      }

      await queryMembers('DELETE FROM "MEMBERSHIP" WHERE "MEM_ID" = $1', [
        MEM_ID,
      ]);

      // 세션 지우기
      req.session.destroy((err) => {
        if (err) {
          console.error("세션 삭제 오류:", err);
          res.status(500).json({ message: "로그아웃 실패" });
        } else {
          console.log("세션 삭제 성공");
          res.status(200).json({ message: "회원 삭제 성공 및 로그아웃 성공" });
        }
      });
    } catch (error) {
      console.error("회원 삭제 오류:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  },

  // MEMBERSHIP 테이블 생성
  createTable(req, res) {
    queryMembers(
      "CREATE TABLE IF NOT EXISTS MEMBERSHIP (MEM_ID VARCHAR(255) NOT NULL, MEM_PASSWORD VARCHAR(255) NOT NULL, MEM_NAME   VARCHAR(255) NOT NULL, MEM_EMAIL   VARCHAR(255) NOT NULL, MEM_TEL       VARCHAR(255) NOT NULL, MEM_NICKNAME  VARCHAR(255) NOT NULL, MEM_ADDRESS   VARCHAR(255) NOT NULL, CONSTRAINT MEM PRIMARY KEY (MEM_ID))",
      (error, results) => {
        if (error) {
          throw error;
        }
        console.log("MEMBERSHIP 테이블 생성 완료");
      }
    );
  },
};

module.exports = UserController;
