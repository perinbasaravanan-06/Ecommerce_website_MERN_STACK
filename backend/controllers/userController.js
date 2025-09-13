const Users = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "User already exists with this email" });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) cart[i] = 0;

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    cartData: cart,
  });

  await user.save();

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
};

exports.login = async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (!user)
    return res.json({ success: false, errors: "Invalid email or password" });

  const passCompare = await bcrypt.compare(req.body.password, user.password);
  if (!passCompare)
    return res.json({ success: false, errors: "Invalid email or password" });

  const data = { user: { id: user.id } };
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
};

exports.addToCart = async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
};

exports.removeFromCart = async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
};

exports.getCart = async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
};
