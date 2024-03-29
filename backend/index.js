const express = require("express");
const session = require("express-session");
const cors = require("cors");
const crypto = require("crypto");
const routes = require("./Router");

const app = express();
const port = 3000;

const sessionKey = crypto.randomBytes(32).toString("base64");
app.use(
  session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(express.json());

app.use(routes);

// require("./router.js")(app);

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 동작 중....`);
});
