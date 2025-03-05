import React, { useState } from "react";
import "./Css/LoginSignup.css";

const LoginSignup = () => {
  const [state, setState] = useState("LOGIN");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login function executed", formData);
    
    let responseData;
    await fetch('http://localhost:4000/login',{
      method : 'POST',
      headers : {
        Accept : 'application/json',
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(formData)
    }).then((response)=> response.json()).then((data)=>responseData = data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
      
    }
  };

  const signup = async () => {
    console.log("Sign up function executed", formData);

    let responseData;
    await fetch('http://localhost:4000/signup',{
      method : 'POST',
      headers : {
        Accept : 'application/json',
        "Content-Type": "application/json",
      },
      body : JSON.stringify(formData)
    }).then((response)=> response.json()).then((data)=>responseData = data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors);
      
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
        <button onClick={state === "LOGIN" ? login : signup}>Continue</button>
        {state === "SIGN UP" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("LOGIN")}>Login here</span>
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
