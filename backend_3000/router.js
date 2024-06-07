const express = require("express");
const router = express.Router();

const UserController = require("./userController");
const clothesController = require("./clothesController");
const naverAPI = require("./naverAPI");
// 로그인 여부 확인 미들웨어
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    this.userId = req.user._id;
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

router.post("/signup", UserController.signUp);
router.post("/findCredentials", UserController.findCredentials);
router.put("/updateProfile", UserController.updateProfile);
router.delete("/deleteProfile", UserController.deleteProfile);

router.post("/api/search-images", naverAPI.callNaverShoppingAPI);
router.get("/api/keyword", naverAPI.postData);

// router.get("/userSearchLog", clothesController.t_c_SelectId);

module.exports = router;