require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const routes = require('./routes/routes');

// CORS
const cors = require("cors");

app.use(cors());

// MongoDB connection
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/api', routes);

app.post("/createUser", (req, res) => {
  console.log("Data sended");
  console.log(req.body);
});

app.listen(5000, () => {
  console.log("Server running on port 5000!");
});
