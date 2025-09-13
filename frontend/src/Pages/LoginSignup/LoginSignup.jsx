import React, { useState, useContext } from "react";
import axios from "axios";
import "./LoginSignup.css";
import { ShopContext } from '../../Context/ShopContext';

const LoginSignup = () => {
  const [state, setState] = useState("LOGIN");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const { backendUrl } = useContext(ShopContext);

  const changeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const endpoint = state === "LOGIN" ? "login" : "signup";
      const response = await axios.post(`${backendUrl}/api/users/${endpoint}`, formData);
      const data = response.data;

      if (data.success) {
        localStorage.setItem('auth-token', data.token);
        window.location.replace("/");
      } else {
        alert(data.errors);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "SIGN UP" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Enter Your Name"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Enter Your Email Id"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button onClick={handleSubmit}>Continue</button>
        {state === "SIGN UP" ? (
          <p className="loginsignup-login">
            Already have an account? <span onClick={() => setState("LOGIN")}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            New User? <span onClick={() => setState("SIGN UP")}>Click here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
