import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to='/'><img src={logo} alt="Logo" />
        </Link> 
        <Link  style = {{textDecoration : 'none'}}to= "/"><p>OCEANIS</p></Link>
        
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link style={{textDecoration : 'none'}} to="/">Shop</Link>
          {menu === "shop" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link  style={{textDecoration : 'none'}} to="/mens">Men</Link>
          {menu === "mens" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link  style={{textDecoration : 'none'}} to="/womens">Women</Link>
          {menu === "womens" ? <hr /> : null}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link  style={{textDecoration : 'none'}}  to="/kids">Kids</Link>
          {menu === "kids" ? <hr /> : null}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/Login">
          <button>Login</button>
        </Link>
        <Link to="/Cart">
          <img src={cart_icon} alt="Cart" />
        </Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;
