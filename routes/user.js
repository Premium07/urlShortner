const express = require("express");
const router = express.Router();
const { UserSignUp, UserLogin } = require("../controllers/user.js");

router.post("/", UserSignUp);
router.post("/login", UserLogin);

module.exports = router;
