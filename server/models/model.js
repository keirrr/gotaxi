const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  avatarUrl: {
    require: true,
    type: String,
  },
  orders: {
    require: false,
    type: Array,
  },
});

module.exports = mongoose.model("Data", dataSchema, "users");
