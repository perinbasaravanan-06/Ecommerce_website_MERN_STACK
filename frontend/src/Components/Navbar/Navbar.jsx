import React, { useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";

export const Navbar = () => {

  const [menu,setmenu] = useState("shop");
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>OCEANIS</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setmenu("Shop")}}>Shop{menu === "Shop" ? <hr/> : <></>}</li>
        <li onClick={()=>{setmenu("Mens")}}>Mens{menu === "Mens" ? <hr/> : <></>}</li>
        <li onClick={()=>{setmenu("Women")}}>Women{menu === "Women" ? <hr/> : <></>}</li>
        <li onClick={()=>{setmenu("Kids")}}>Kids{menu === "Kids" ? <hr/> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        <button>login</button>
        <img src={cart_icon} alt="" />
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
