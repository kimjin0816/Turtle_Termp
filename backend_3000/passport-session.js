// const pgp = require("pg-promise")();
// const db = pgp("postgres://username:password@localhost:5432/database");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
// const User = require("./user.model"); // 사용자 모델 경로에 따라 수정
const { queryMembers } = require("./PostgreDB");

function ensureNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // 이미 로그인된 경우, 새로운 로그인 요청을 거부(로그인 중복 검사)
    return res.status(403).json({ message: "Already authenticated." });
  }
  next();
}

module.exports = function (app) {
  // Express 미들웨어 설정
  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(
  //   require("express-session")({
  //     secret: "your-secret-key",
  //     resave: true,
  //     saveUninitialized: true,
  //   })
  // );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await queryMembers(
          'SELECT * FROM "MEMBERSHIP" WHERE "MEM_ID" = $1',
          [username]
        );

        if (!user.rows || user.rows.length === 0) {
          console.log("Incorrect username:", username);
          return done(null, false, { message: "Incorrect username." });
        }
        console.log("Found user:", user.rows[0]);

        if (user.rows[0].MEM_PASSWORD !== password) {
          console.log("Incorrect password for user:", username);
          console.log("Expected password:", user.rows[0].MEM_PASSWORD);
          console.log("Received password:", password);
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user.rows[0]);
      } catch (err) {
        console.error(err);
        return done(err);
      }
    })
  );
  // passport.use(
  //   new LocalStrategy((username, password, done) => {
  //     queryMembers.findOne({ id: username }, (err, user) => {
  //       if (err) {
  //         console.error(err);
  //         return done(err);
  //       }
  //       if (!user) {
  //         console.log("Incorrect username:", username);
  //         return done(null, false, { message: "Incorrect username." });
  //       }
  //       console.log("Found user:", user);

  //       if (user.password !== password) {
  //         console.log("Incorrect password for user:", username);
  //         console.log("Expected password:", user.password);
  //         console.log("Received password:", password);
  //         return done(null, false, { message: "Incorrect password." });
  //       }

  //       return done(null, user);
  //     });
  //   })
  // );
  passport.serializeUser((user, done) => {
    console.log("Serialized user:", user);
    done(null, user.MEM_ID); // user.id 대신 user.MEM_ID로 수정
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await queryMembers(
        'SELECT * FROM "MEMBERSHIP" WHERE "MEM_ID" = $1',
        [id]
      );

      if (!user.rows || user.rows.length === 0) {
        console.log("deserialization error: No user with this id", id);
        return done(new Error("No user with this id"), null);
      }
      console.log("Deserialized user:", user.rows[0]);
      return done(null, user.rows[0]);
    } catch (err) {
      return done(err);
    }
  });
  /*   passport.serializeUser((user, done) => {
    done(null, user._id); // user.id 대신 user._id로 수정
  });

  passport.deserializeUser((id, done) => {
    queryMembers.findById(id, (err, user) => {
      if (err) {
        done(err, user);
      } else {
        // done(null, { _id: user._id, id: user.id, username: user.username });
        done(null, user);
      }
    });
  }); */

  /*     // 사용자의 인증 상태를 확인하는 엔드포인트 추가
    app.get('/check-auth', (req, res) => {
        if (req.isAuthenticated()) {
            // 사용자가 로그인한 상태라면
            res.json({ authenticated: true, userId: req.user.id });
        } else {
            // 사용자가 로그인하지 않은 상태라면
            res.json({ authenticated: false });
        }
    }); */

  // 사용자의 인증 상태를 확인하는 엔드포인트 추가
  app.get("/check-auth", async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        // 사용자가 로그인한 상태라면
        res.json({
          authenticated: true,
          userId: req.user._id,
          nickName: req.user.MEM_NICKNAME,
        });
      } else {
        // 사용자가 로그인하지 않은 상태라면
        res.json({ authenticated: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "서버 오류" });
    }
  });

  app.post("/login", ensureNotAuthenticated, (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        console.log("Session after login:", req.session.passport);

        const nickName = req.user.MEM_NICKNAME; // 사용자 이름
        console.log("nickName:", nickName);

        return res.json({ message: "Login Successful", user: { nickName } });
      });
    })(req, res, next);
  });

  app.post("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).send("Logout error");
      }

      req.session.destroy((err) => {
        if (err) {
          console.error("Session destroy error:", err);
          return res.status(500).send("Session destroy error");
        }

        res.clearCookie("connect.sid"); // 세션 쿠키 삭제
        res.json({ message: "Logout Successful" });
      });
    });
    console.log("Session after logout:", req.session);
  });

  // 사용자 아이디 찾기
  app.post("/findid", async (req, res) => {
    const { name, email } = req.body;

    try {
      const user = await User.findOne({ name: name, email: email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ id: user.id });
    } catch {
      console.error("아이디 찾기 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  });

  // 사용자 비밀번호 찾기
  app.post("/findpw", async (req, res) => {
    const { name, username, phone } = req.body;

    try {
      const user = await User.findOne({
        name: name,
        id: username,
        phoneNumber: phone,
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ password: user.password });
    } catch {
      console.error("비밀번호 찾기 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  });

  // 사용자 비밀번호 변경
  app.put("/updatepw", async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
      // 현재 로그인한 사용자의 ID
      const userId = req.user._id;

      // 현재 로그인한 사용자의 정보를 가져오기
      const user = await User.findById(userId);

      // 현재 비밀번호와 입력된 비밀번호 비교
      if (user.password !== oldPassword) {
        return res
          .status(400)
          .json({ message: "현재 비밀번호가 일치하지 않습니다." });
      }

      // 사용자의 비밀번호를 새로운 비밀번호로 업데이트
      user.password = newPassword;

      // 사용자 정보를 저장
      await user.save();

      res
        .status(200)
        .json({ message: "비밀번호가 성공적으로 변경되었습니다." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "서버 오류" });
    }
  });
};
