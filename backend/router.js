module.exports = (app) => {
  const clothesHandler = require("./clothesHandler.js");

  app.get("/clothes/:clothes_type", clothesHandler.findAll); // 전체 의류 데이터 조회
  app.get("/clothes/:clothes_type/:clothes_code", clothesHandler.findOne); // 특정 의류 데이터 조회
};
