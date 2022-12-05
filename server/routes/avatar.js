const express = require("express");
const router = express.Router();
const controller = require("../controller/upload.controller");
const Model = require("../models/model");

// Upload user avatar
router.post("/upload", controller.upload);
router.post("/avatar/update", async (req, res) => {
  if (req.session.user) {
    const userEmail = req.session.user.email;
    const filter = { email: userEmail };
    const update = { avatarUrl: req.body.avatarUrl };
    Model.findOneAndUpdate(filter, update, (err, done) => {
      if (err) {
        return res.status(401).json({ err: err });
      } else {
        req.session.user.avatarUrl = req.body.avatarUrl;
        return res.status(200).json({ msg: "Avatar url updated successfully" });
      }
    });
  } else {
    return res.status(401).json({ msg: "Unauthorized User" });
  }
});

module.exports = router;
