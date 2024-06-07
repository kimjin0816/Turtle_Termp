const express = require("express");
const router = express.Router();
const passport = require("passport");

const UserController = require("./userController");
const clothesController = require("./clothesController");
const naverAPI = require("./naverAPI");

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

router.get('/auth/naver', passport.authenticate('naver'));

router.get('/auth/naver/callback', 
  passport.authenticate('naver', { failureRedirect: 'http://localhost:8080/login' }),
  (req, res) => {
    res.redirect('http://localhost:8080'); 
  }
);

module.exports = router;
