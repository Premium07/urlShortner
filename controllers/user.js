const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const  UserSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  await User.create({
    username,
    email,
    password,
  });
  return res.redirect("/");
};

const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) return res.render("login", { error: "Invaid Credentials" });

  const token = setUser(user);
  res.cookie("token", token);

  return res.redirect("/");
};

module.exports = { UserSignUp, UserLogin };
