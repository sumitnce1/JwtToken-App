const express = require("express");
const router = express.Router();
const userController = require("./userController");
const { verifyToken } = require("./verifyUser");

router.post("/signin", userController.signin);
router.post("/signout", userController.signout);
router.get("/allToken", userController.allToken);
router.get("/seeUserData/:userId", verifyToken, userController.seeUserData);

module.exports = router;