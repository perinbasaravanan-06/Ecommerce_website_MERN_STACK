const Product = require("../models/Product.js");

exports.addProduct = async (req, res) => {
  const products = await Product.find({});
  let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  const product = new Product({
    id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await product.save();
  res.json({ success: true, name: req.body.name });
};

exports.removeProduct = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.send(products);
};

exports.getNewCollections = async (req, res) => {
  const products = await Product.find({});
  const newcollection = products.slice(1).slice(-8);
  res.send(newcollection);
};

exports.getPopularInWomen = async (req, res) => {
  const products = await Product.find({ category: "women" });
  const popular_in_women = products.slice(0, 4);
  res.send(popular_in_women);
};
