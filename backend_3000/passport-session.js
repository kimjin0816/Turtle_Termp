const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const NaverStrategy = require("passport-naver").Strategy;
const { queryMembers } = require("./PostgreDB");

module.exports = {
  userId: "",
  initializePassport: function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
      new LocalStrategy(async (username, password, done) => {
        try {
          const user = await queryMembers(
            "SELECT * FROM membership WHERE mem_id = $1 AND mem_name IS NOT NULL",
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

    passport.use(
      new NaverStrategy(
        {
          clientID: "wMDKpAS4spWQCbsbJuI6",
          clientSecret: "uRm738QZ0C",
          callbackURL: "http://localhost:3000/auth/naver/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const naverProfile = profile._json;
            let user = await queryMembers(
              "SELECT * FROM membership WHERE mem_id = $1",
              [naverProfile.id]
            );

            if (!user.rows || user.rows.length === 0) {
              user = {
                mem_id: naverProfile.id,
                mem_password: "",
                mem_name: naverProfile.nickname, // 닉네임을 mem_name으로 사용
                mem_email: naverProfile.email,
                mem_tel: "",
                mem_nickname: naverProfile.nickname,
                mem_address: "",
              };

              await queryMembers(
                "INSERT INTO membership (mem_id, mem_password, mem_name, mem_email, mem_tel, mem_nickname, mem_address) VALUES ($1, $2, $3, $4, $5, $6, $7)",
                [
                  user.mem_id,
                  user.mem_password,
                  user.mem_name,
                  user.mem_email,
                  user.mem_tel,
                  user.mem_nickname,
                  user.mem_address,
                ]
              );
            } else {
              user = user.rows[0];
            }

            return done(null, user);
          } catch (err) {
            return done(err);
          }
        }
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user.mem_id);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await queryMembers(
          "SELECT * FROM membership WHERE mem_id = $1",
          [id]
        );

        if (!user.rows || user.rows.length === 0) {
          return done(null, null);
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
          res.json({ authenticated: false });
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
          const nickName = req.user.mem_nickname;

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
          res.clearCookie("connect.sid");
          res.json({ message: "Logout Successful" });
        });
      });
    });

    // app.post("/delete", (req, res) => {
    //     const { mem_id, mem_password } = req.body;
    //     const existingUser = queryMembers(
    //       "SELECT * FROM membership WHERE mem_id = $1 AND mem_password = $2",
    //       [mem_id, mem_password]
    //     );

    //     if (existingUser.rows.length === 0) {
    //       return res.status(404).json({
    //         message: "존재하지 않는 사용자이거나 잘못된 비밀번호입니다.",
    //       });
    //     }

    //     queryMembers("DELETE FROM membership WHERE mem_id = $1", [
    //       mem_id,
    //     ]);

    //     req.logout((err) => {
    //       if (err) {
    //         return res.status(500).send("Logout error");
    //       }

    //       req.session.destroy((err) => {
    //         if (err) {
    //           return res.status(500).send("Session destroy error");
    //         }
    //         res.clearCookie("connect.sid");
    //         res.json({ message: "Account deletion successful" });
    //       });
    //     });
    // });
  },
};
