const express = require("express");
const router = express.Router();

const UserController = require("./UserController");
const clothesController = require("./clothesController");

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.post("/findCredentials", UserController.findCredentials);
router.put("/updateProfile", UserController.updateProfile);
router.delete("/deleteProfile", UserController.deleteProfile);
router.post("/logout", UserController.logout);

// router.get("/selectIdClothes", clothesController.findIdClothes);

module.exports = router;