const express = require("express");
const router = express.Router();

const controller = require("../controller/orders.controller");

router.post("/orders/add", controller.addOrder);

module.exports = router;
