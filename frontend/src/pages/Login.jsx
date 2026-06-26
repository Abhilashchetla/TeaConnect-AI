import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await API.post("/token/", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // Save user id (backend must send this)
      localStorage.setItem("user_id", res.data.user_id);

      // Set Authorization header
      API.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.access}`;

      alert("Login Successful!");

      navigate("/customer");
    } catch (err) {
      console.error(err);

      alert("Invalid Email or Password");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={loginUser}>
        Login
      </button>
    </div>
  );
}

export default Login;