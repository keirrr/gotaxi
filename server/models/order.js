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
  destinationName: {
    require: true,
    type: String,
  },
  destinationCoords: {
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
  }
});
