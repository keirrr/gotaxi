// Server
require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const session = require("express-session")
const cookieParser = require("cookie-parser")

const routes = require('./routes/routes');

// CORS
const cors = require("cors");

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(
  session({
    key: "userId",
    secret: "9&$&ypOgo8^9Q2G4",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24
    }
  })
);

app.use(cookieParser())

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