const express = require("express");
const router = express.Router();

function ensureNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // 이미 로그인된 경우, 새로운 로그인 요청을 거부(로그인 중복 검사)
    return res.status(403).json({ message: "Already authenticated." });
  }
  next();
}

const UserController = require("./UserController");
const clothesController = require("./clothesController");
const naverAPI = require("./naverAPI");

router.post("/signup", UserController.signUp);
router.post("/findCredentials", UserController.findCredentials);
router.put("/updateProfile", UserController.updateProfile);
router.delete("/deleteProfile", UserController.deleteProfile);

router.post("/api/search-images/:keyword", naverAPI.callNaverShoppingAPI);
router.get("/api/keyword", naverAPI.postdata);

// router.get("/selectIdClothes", clothesController.findIdClothes);

module.exports = router;
