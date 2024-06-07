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
            'SELECT * FROM membership WHERE mem_id = $1',
            [username]
          );

          if (!user.rows || user.rows.length === 0) {
            console.log("Incorrect username:", username);
            return done(null, false, { message: "Incorrect username." });
          }
          console.log("Found user:", user.rows[0]);

          if (user.rows[0].mem_password !== password) {
            console.log("Incorrect password for user:", username);
            console.log("Expected password:", user.rows[0].mem_password);
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
      done(null, user.mem_id); // user.id 대신 user.mem_id로 수정
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await queryMembers(
          'SELECT * FROM membership WHERE mem_id = $1',
          [id]
        );

        if (!user.rows || user.rows.length === 0) {
          return done(new Error("No user with this id"), null);
        }
        return done(null, user.rows[0]);
      } catch (err) {
        return done(err);
      }
    });

    app.get("/check-auth", async (req, res) => {
      try {
        if (req.isAuthenticated()) {
          this.userId = req.user.mem_id;
          res.json({
            authenticated: true,
            userId: req.user.mem_id,
            nickName: req.user.mem_nickname,
          });
        } else {
          // 사용자가 로그인하지 않은 상태라면
          res.json({ authenticated: false  });
        }
      } catch (error) {
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
        const nickName = req.user.mem_nickname; // 사용자 이름

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
          return res.status(500).send("Logout error");
        }

        req.session.destroy((err) => {
          if (err) {
            return res.status(500).send("Session destroy error");
          }
          res.clearCookie("connect.sid"); // 세션 쿠키 삭제
          res.json({ message: "Logout Successful" });
        });
      });
    });
  },
};