const { queryMembers } = require("./PostgreDB");
const { userId } = require("./passport-session");

const UserController = {
  // 회원가입
  async signUp(req, res) {
    const {
      mem_id,
      mem_password,
      mem_name,
      mem_email,
      mem_tel,
      mem_nickname,
      mem_address,
    } = req.body;

    try {
      const existingUser = await queryMembers(
        "SELECT * FROM membership WHERE mem_id = $1",
        [mem_id]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: "이미 존재하는 사용자입니다." });
      }

      await queryMembers(
        "INSERT INTO membership (mem_id, mem_password, mem_name, mem_email, mem_tel, mem_nickname, mem_address) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          mem_id,
          mem_password,
          mem_name,
          mem_email,
          mem_tel,
          mem_nickname,
          mem_address,
        ]
      );

      res.status(201).json({ message: "회원가입 성공" });
    } catch (error) {
      console.error("회원가입 오류:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  },

  // 아이디 및 비밀번호 찾기
  async findCredentials(req, res) {
    const { mem_name, mem_email } = req.body;

    try {
      const user = await queryMembers(
        "SELECT mem_id, mem_password FROM membership WHERE mem_name = $1 AND mem_email = $2",
        [mem_name, mem_email]
      );

      if (user.rows.length > 0) {
        const { mem_id, mem_password } = user.rows[0];
        res.status(200).json({
          message: "아이디 및 비밀번호 찾기 성공",
          mem_id,
          mem_password,
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
      mem_id,
      mem_password,
      mem_name,
      mem_email,
      mem_tel,
      mem_nickname,
      mem_address,
    } = req.body;

    try {
      const existingUser = await queryMembers(
        "SELECT * FROM membership WHERE mem_id = $1",
        [mem_id]
      );

      if (existingUser.rows.length === 0) {
        return res.status(404).json({ message: "존재하지 않는 사용자입니다." });
      }

      await queryMembers(
        "UPDATE membership SET mem_password = $2, mem_name = $3, mem_email = $4, mem_tel = $5, mem_nickname = $6, mem_address = $7 WHERE mem_id = $1",
        [
          mem_id,
          mem_password,
          mem_name,
          mem_email,
          mem_tel,
          mem_nickname,
          mem_address,
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
    const { mem_id, mem_password } = req.body;

    try {
      const existingUser = await queryMembers(
        "SELECT * FROM membership WHERE mem_id = $1 AND mem_password = $2",
        [mem_id, mem_password]
      );

      if (existingUser.rows.length === 0) {
        return res.status(404).json({
          message: "존재하지 않는 사용자이거나 잘못된 비밀번호입니다.",
        });
      }

      await queryMembers("DELETE FROM membership WHERE mem_id = $1", [mem_id]);

      // 세션 지우기
      req.logout((err) => {
        if (err) {
          return res.status(500).send("Logout error");
        }

        req.session.destroy((err) => {
          if (err) {
            return res.status(500).send("Session destroy error");
          }
          res.clearCookie("connect.sid");
          res.json({ message: "Logout Successful" });
        });
      });
    } catch (error) {
      console.error("회원 삭제 오류:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  },

  // ID 존재 여부 확인
  async getProfile(req, res) {
    try {
      const mem_id = req.body.mem_id;
      console.log("ID : " + mem_id);
      const existingUser = await queryMembers(
        "SELECT * FROM membership WHERE mem_id = $1",
        [mem_id]
      );
      if (existingUser.rows.length === 0) {
        res.status(200).json({ id_possible: true });
      } else {
        res.status(200).json({
          mem_id: existingUser.rows[0].mem_id,
          mem_password: existingUser.rows[0].mem_password,
          mem_name: existingUser.rows[0].mem_name,
          mem_email: existingUser.rows[0].mem_email,
          mem_tel: existingUser.rows[0].mem_tel,
          mem_nickname: existingUser.rows[0].mem_nickname,
          mem_address: existingUser.rows[0].mem_address,
          logon_posiible: false,
          id_possible: false,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "서버 오류" });
    }
  },
};

module.exports = UserController;
