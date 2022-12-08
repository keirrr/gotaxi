const Model = require("../models/model");
const Order = require("../models/order");

const addOrder = async (req, res) => {
  const order = new Order(req.body.order);
  const userId = req.body.userId;

  const options = { new: true };

  console.log(userId);

  try {
    // const dataToSave = await order.save();
    const result = await Model.findByIdAndUpdate(
      userId,
      { $push: { orders: order } },
      options
    );
    return res.status(200).json({ msg: "Order saved successfully!" });
  } catch {
    return res.status(400).json({ msg: error.message });
  }
};

module.exports = { addOrder };
