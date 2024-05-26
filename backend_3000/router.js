const express = require("express");
const router = express.Router();

const UserController = require("./UserController");
const clothesController = require("./clothesController");
const naverAPI = require("./naverAPI");

function ensureAuthenticated(req, res, next) {
  if (req.session.cookie) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

router.get("/sessioncheck", ensureAuthenticated, (req, res) => {
  res.status(200).json(req.session.cookie.userId);
  console.log(req.session);
});

router.post("/auth/check", ensureAuthenticated, (req, res) => {
  res.status(200).json(req.session.cookie.userId);
  console.log(req.session);
});

router.post("/signup", UserController.signUp);
// router.post("/login", UserController.login);
// router.post("/logout", UserController.logout);

router.post("/findCredentials", UserController.findCredentials);
router.put("/updateProfile", ensureAuthenticated, UserController.updateProfile);
router.delete(
  "/deleteProfile",
  ensureAuthenticated,
  UserController.deleteProfile
);

router.post("/api/search-images/:keyword", naverAPI.callNaverShoppingAPI);
router.get("/api/keyword", naverAPI.postdata);

// router.get("/selectIdClothes", clothesController.findIdClothes);

module.exports = router;
