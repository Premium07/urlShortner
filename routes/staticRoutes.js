const express = require("express");
const URL = require("../models/url.js");
const { restrictTo } = require("../middleware/auth.js");
const router = express.Router();

router.get("/", restrictTo(["NORMAL"]), async (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  try { 
    const allurls = await URL.find({ createdBy: req.user._id });
    // console.log(req.user);
    return res.render("index", { urls: allurls, users: req.user }); // Pass URLs to EJS template
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Server error");
  }
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
