import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      // Login
      const res = await API.post("/token/", {
        email: email.trim(),

        password: password.trim(),
      });

      // Save Tokens

      localStorage.setItem("access", res.data.access);

      localStorage.setItem("refresh", res.data.refresh);

      API.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.access}`;

      // Get Logged-in User

      const profile = await API.get("/users/profile/");

      console.log(profile.data);

      localStorage.setItem("username", profile.data.username);

      localStorage.setItem("email", profile.data.email);

      localStorage.setItem("role", profile.data.role);
      localStorage.setItem("user_id", profile.data.id);

      toast.success(`Welcome ${profile.data.username}!`);

      // Role Based Login

      if (profile.data.role === "customer") {
        navigate("/customer");
      } else if (profile.data.role === "owner") {
        navigate("/dashboard");
      } else if (profile.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err.response?.data);

      toast.error("Invalid Email or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="overlay">
          <h1>☕ TeaConnect AI</h1>

          <h2>Fresh Tea. Fresh Experience.</h2>

          <p>
            Order premium tea directly from nearby tea shops. Discover fresh
            flavors, track your orders, manage your cart, and enjoy a smarter
            tea shopping experience.
          </p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back</h2>

          <p className="subtitle">Login to continue your Tea Journey</p>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={loginUser}>Login</button>

          <p className="switch-text">
            New to TeaConnect?
            <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
