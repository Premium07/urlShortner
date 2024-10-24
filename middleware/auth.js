const { getUser } = require("../service/auth");

const checkForAuthentication = (req, res, next) => {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
};

const restrictTo = (roles = []) => {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role))
      return res.send(" You are Unauthorized to access");

    return next();
  };
};

module.exports = { checkForAuthentication, restrictTo };
