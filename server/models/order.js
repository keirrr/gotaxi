const mongoose = require("mongoose");

const orderScheme = new mongoose.Schema({
  startName: {
    require: true,
    type: String,
  },
  startCoords: {
    require: true,
    type: Array,
  },
  destName: {
    require: true,
    type: String,
  },
  destCoords: {
    require: true,
    type: Array,
  },
  price: {
    require: true,
    type: Number,
  },
  date: {
    require: true,
    type: Date,
  },
});

module.exports = mongoose.model("Order", orderScheme, "orders");
