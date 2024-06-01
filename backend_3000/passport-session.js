const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { queryMembers } = require("./postgreDB");

module.exports = {
  userId: "",
  initializePassport: function (app) {
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

    // 사용자의 인증 상태를 확인하는 엔드포인트 추가
    app.get("/check-auth", async (req, res) => {
      try {
        if (req.isAuthenticated()) {
          this.userId = req.user.MEM_ID;
          // 사용자가 로그인한 상태라면
          res.json({
            authenticated: true,
            userId: req.user.MEM_ID,
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

  app.post("/login", (req, res, next) => {
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
        const userId = JSON.stringify(req.session.passport.user);
        const nickName = req.user.MEM_NICKNAME; // 사용자 이름

        return res.json({
          message: "Login Successful",
          userNick: nickName,
          userId: userId,
        });
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
  },
};
