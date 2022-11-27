const express = require("express");
const router = express.Router();
const controller = require("../controller/upload.controller");

// Upload user avatar
router.post("/upload", controller.upload);

module.exports = router;
