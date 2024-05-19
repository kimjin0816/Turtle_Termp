const express = require("express");
const router = express.Router();

const UserController = require("./UserController");
const clothesController = require("./clothesController");
const naverAPI = require("./naverAPI");

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.post("/findCredentials", UserController.findCredentials);
router.put("/updateProfile", UserController.updateProfile);
router.delete("/deleteProfile", UserController.deleteProfile);
router.post("/logout", UserController.logout);

router.post("/api/search-images/:keyword", naverAPI.callNaverShoppingAPI);
router.get("/api/keyword", naverAPI.postdata);
// router.get("/api/keywords", naverAPI.getKeywords);

// router.get("/selectIdClothes", clothesController.findIdClothes);

module.exports = router;
