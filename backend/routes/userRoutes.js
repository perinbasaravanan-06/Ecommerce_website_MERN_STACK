const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const {
  signup,
  login,
  addToCart,
  removeFromCart,
  getCart,
} = require("../controllers/userController.js");

router.post("/signup", signup);
router.post("/login", login);
router.post("/addtocart", fetchUser, addToCart);
router.post("/removefromcart", fetchUser, removeFromCart);
router.post("/getcart", fetchUser, getCart);

module.exports = router;
