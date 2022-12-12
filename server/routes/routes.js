const express = require("express");
const Model = require("../models/model");

const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const session = require("express-session");

//Post Method
router.post("/users", async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

  const data = new Model({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    avatarUrl: "https://storage.googleapis.com/gotaxi-avatars/user-default.png",
  });

  const user = await Model.findOne({ email: req.body.email });
  if (user) {
    return res.status(200).json({ message: "Email exists" });
  }

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get user by email
router.get("/getOne/:email", async (req, res) => {
  console.log(req.params.email);
  try {
    const data = await Model.findOne({ email: req.params.email });
    if (data) {
      return res.status(200).json({ message: "Email exists" });
    } else {
      return res.status(200).json({ message: "Email not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.clearCookie("session-id");
    res.status(200).json({ message: "Account deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);

  if (!email || !password) {
    res.status(400).json({ msg: "Something missing" });
  }

  const user = await Model.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ msg: "Email not found" });
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (matchPassword) {
    const userSession = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      orders: user.orders,
    };
    req.session.user = userSession;

    return res
      .status(200)
      .json({ msg: "Zostałeś poprawnie zalogowany", userSession });
  } else {
    return res.status(400).json({ message: "Wrong data" });
  }
});

//Logout user
router.post("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;

    res.clearCookie("session-id");
    res.status(200).send("Pomyślnie wylogowano");
  });
});

//Check if user is login
router.get("/isAuth", async (req, res) => {
  if (req.session.user) {
    return res.json(req.session.user);
  } else {
    return res.status(401).json({ msg: "Unauthorized User" });
  }
});

router.get("/test", async (req, res) => {
  console.log("Test API");
  return res.status(200).json({ msg: "Test API" });
});

module.exports = router;
