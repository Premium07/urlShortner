// controllers/url.js
const shortid = require("shortid");
const URL = require("../models/url");

// Generate a new short URL
const generateShortURL = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).send("Invalid request");
  }

  const shortId = shortid.generate();

  const newUrl = new URL({
    shortId,
    redirectURL: url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  await newUrl.save();
  res.redirect("/"); // Redirect back to homepage after saving
};

// Get analytics for a specific short URL
const getAnalytics = async (req, res) => {
  const { shortId } = req.params;
  const urlData = await URL.findOne({ shortId });
  if (urlData) {
    return res.json({
      totalClicks: urlData.visitHistory.length,
      visitHistory: urlData.visitHistory,
    });
  } else {
    return res.status(404).send("URL not found");
  }
};

module.exports = {
  generateShortURL,
  getAnalytics,
};
