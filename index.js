// server.js
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRoutes");
const userRoute = require("./routes/user");
const { checkForAuthentication, restrictTo } = require("./middleware/auth");
const connectDB = require("./database/dbconnect");

const app = express();
const helmet = require("helmet");
const PORT = process.env.PORT || 3000;
connectDB();

app.set("view engine", "ejs");
app.use(helmet());

app.use(express.static(path.join(__dirname, "public"))); // Serve static assets
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication);

// Static Routes for homepage
app.use("/", staticRouter);

// URL-related routes (shortening and analytics)
app.use("/url", restrictTo(["NORMAL"]), urlRoute);

app.use("/user", userRoute);

// Redirection route
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (entry) {
      res.redirect(entry.redirectURL);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    res.status(500).send("An error occurred");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running @ http://localhost:${PORT}`)
);
