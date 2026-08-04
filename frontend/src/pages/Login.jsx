import React, { useState } from "react";

import API from "../services/api";

import { useNavigate, Link } from "react-router-dom";

import { toast } from "react-toastify";

import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // ==========================================
  // LOGIN USER
  // ==========================================

  const loginUser = async () => {
    if (!email.trim() || !password.trim()) {
      toast.warning("Please enter email and password");

      return;
    }

    try {
      setLoading(true);

      // ======================================
      // STEP 1: LOGIN AND GET JWT TOKENS
      // ======================================

      const res = await API.post("/token/", {
        email: email.trim(),
        password: password.trim(),
      });

      // ======================================
      // STEP 2: SAVE TOKENS
      // ======================================

      localStorage.setItem("access", res.data.access);

      localStorage.setItem("refresh", res.data.refresh);

      // Add token immediately

      API.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.access}`;

      // ======================================
      // STEP 3: GET LOGGED-IN USER
      // ======================================

      const profile = await API.get("/users/profile/");

      console.log("Logged User:", profile.data);

      // ======================================
      // STEP 4: SAVE USER INFORMATION
      // ======================================

      localStorage.setItem("user_id", profile.data.id);

      localStorage.setItem("username", profile.data.username);

      localStorage.setItem("email", profile.data.email);

      localStorage.setItem("role", profile.data.role);

      toast.success(`Welcome ${profile.data.username}!`);

      // ======================================
      // STEP 5: ROLE BASED REDIRECT
      // ======================================

      if (profile.data.role === "customer") {
        navigate("/customer", { replace: true });
      } else if (profile.data.role === "owner") {
        navigate("/dashboard", { replace: true });
      } else if (profile.data.role === "delivery") {
        navigate("/delivery-dashboard", { replace: true });
      } else if (profile.data.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        toast.error("Unknown user role");

        localStorage.clear();

        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log("Login Error:", err.response?.data);

      toast.error(err.response?.data?.detail || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // ENTER KEY LOGIN
  // ==========================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loginUser();
    }
  };

  return (
    <div className="login-container">
      {/* LEFT SIDE */}

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

      {/* RIGHT SIDE */}

      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back</h2>

          <p className="subtitle">Login to continue your Tea Journey</p>

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* LOGIN BUTTON */}

          <button onClick={loginUser} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="switch-text">
            New to TeaConnect? <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
