const express = require("express");
const router = express.Router();

const UserController = require("./UserController");
const clothesController = require("./clothesController");
const naverAPI = require("./naverAPI");

function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.sessionUserId) {
    next(); // 로그인 상태를 유지하고 다음 미들웨어로 넘어갑니다.
  } else {
    res.status(401).json({ message: "로그인이 필요합니다" }); // 로그인이 필요하다는 메시지를 보냅니다.
  }
}

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.post("/findCredentials", ensureAuthenticated, UserController.findCredentials);
router.put("/updateProfile", ensureAuthenticated, UserController.updateProfile);
router.delete("/deleteProfile", ensureAuthenticated, UserController.deleteProfile);

router.post("/api/search-images/:keyword", naverAPI.callNaverShoppingAPI);
router.get("/api/keyword", naverAPI.postdata);
// router.get("/api/keywords", naverAPI.getKeywords);

// router.get("/selectIdClothes", clothesController.findIdClothes);

module.exports = router;
