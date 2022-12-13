// Server
require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");

const routes = require("./routes/routes");
const updateProfile = require("./routes/updateProfile");
const orders = require("./routes/orders");

// CORS
const cors = require("cors");

app.use(
  cors({
    // Dev
    // origin: "http://localhost:3000",
    // Production
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

const mongoDBstore = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: "sessions",
});

const MAX_AGE = 1000 * 60 * 60 * 3;

app.use(
  session({
    secret: "9&$&ypOgo8^9Q2G4",
    name: "session-id",
    store: mongoDBstore,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: false,
    },
    resave: true,
    saveUninitialized: false,
  })
);

app.use(cookieParser());

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
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Use routes
app.use("/api", routes);
app.use("/api", updateProfile);
app.use("/api", orders);

app.listen(5000, () => {
  console.log("Server running on port 5000!");
});
