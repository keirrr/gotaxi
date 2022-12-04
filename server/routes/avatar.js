const express = require("express");
const router = express.Router();
const controller = require("../controller/upload.controller");
const Model = require("../models/model");

// Upload user avatar
router.post("/upload", controller.upload);
router.post("/avatar/update", async (req, res) => {
  console.log("Update");
  if (req.session.user) {
    const userEmail = req.session.user.email;
    const filter = { email: userEmail };
    const update = { avatarUrl: req.avatarUrl };
    await Model.findOneAndUpdate(filter, update);
  } else {
    return res.status(401).json({ msg: "Unauthorized User" });
  }
});
module.exports = router;
