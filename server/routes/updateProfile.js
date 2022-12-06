const express = require("express");
const router = express.Router();
const controller = require("../controller/upload.controller");
const Model = require("../models/model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Upload user avatar
router.post("/upload", controller.upload);
router.post("/profile/update", async (req, res) => {
  if (req.session.user) {
    const userEmail = req.session.user.email;
    const filter = { email: userEmail };
    if (req.body.updateData.password) {
      const hashedPassword = bcrypt.hashSync(
        req.body.updateData.password,
        saltRounds
      );
      req.body.updateData.password = hashedPassword;
    }
    const update = req.body.updateData;
    Model.findOneAndUpdate(filter, update, (err, done) => {
      if (err) {
        return res.status(401).json({ err: err });
      } else {
        if (req.body.updateData.name) {
          req.session.user.name = req.body.updateData.name;
        }
        if (req.body.updateData.avatarUrl) {
          req.session.user.avatarUrl = req.body.updateData.avatarUrl;
        }
        return res.status(200).json({ msg: "User data updated successfully" });
      }
    });
  } else {
    return res.status(401).json({ msg: "Unauthorized User" });
  }
});

module.exports = router;
