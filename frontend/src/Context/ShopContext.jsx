import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShopContext = createContext(null);

const getOrDefault = () => {
  let cart = {};
  for (let index = 0; index < 301; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Products] = useState([]);
  const [cartItems, setCartItems] = useState(getOrDefault());

  // Centralized backend URL
  const backendUrl = "http://localhost:4000"; // replace with deployed URL when needed

  useEffect(() => {
    // Fetch all products
    axios
      .get(`${backendUrl}/api/products/allproducts`)
      .then((res) => setAll_Products(res.data))
      .catch((err) => console.error("Error fetching products:", err));

    // Fetch cart if user is logged in
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      axios
        .post(
          `${backendUrl}/api/users/getcart`,
          {},
          {
            headers: {
              "auth-token": authToken,
            },
          }
        )
        .then((res) => setCartItems(res.data))
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, [backendUrl]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      axios
        .post(
          `${backendUrl}/api/users/addtocart`,
          { itemId },
          {
            headers: {
              "auth-token": authToken,
            },
          }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      axios
        .post(
          `${backendUrl}/api/users/removefromcart`,
          { itemId },
          {
            headers: {
              "auth-token": authToken,
            },
          }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) totalItem += cartItems[item];
    }
    return totalItem;
  };

  const contextValue = {
    backendUrl,
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
