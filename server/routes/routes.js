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
  });

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

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    res.send(`Document with ${data.name} has been deleted..`);
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
    res.status(400).json({ msg: "Czegoś brakuje" });
  }

  const user = await Model.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ msg: "Nie znaleziono takiego użytkownika" });
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (matchPassword) {
    const userSession = { email: user.email };
    req.session.user = userSession;

    return res
      .status(200)
      .json({ msg: "Zostałeś poprawnie zalogowany", userSession });
  } else {
    return res.status(400).json({ msg: "Nieprawidłowe dane" });
  }

  console.log(user);
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

module.exports = router;
