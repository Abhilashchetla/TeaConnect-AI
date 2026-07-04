import React, { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/Login.css";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "customer",

    shop_name: "",
    shop_location: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/users/register/", form);

      toast.success("Registration Successful!");

      navigate("/");

    } catch (err) {

      console.log(err.response?.data);

      toast.error("Registration Failed");

    }

  };

  return (

    <div className="login-container">

      <div className="login-left">

        <div className="overlay">

          <h1>☕ TeaConnect AI</h1>

          <h2>Join India's Smart Tea Marketplace</h2>

          <p>
            Create your account and become a part of India's fastest
            growing Tea Marketplace. Buy premium tea or sell your
            products through your own Tea Shop.
          </p>

        </div>

      </div>

      <div className="login-right">

        <div className="login-card">

          <h2>Create Account</h2>

          <p className="subtitle">
            Register to continue
          </p>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="role-select"
            >

              <option value="customer">
                👤 Customer
              </option>

              <option value="owner">
                🏪 Tea Shop Owner
              </option>

              <option value="admin">
                🛠 Admin
              </option>

            </select>

            {/* Show only for Shop Owner */}

            {form.role === "owner" && (

              <>

                <input
                  type="text"
                  name="shop_name"
                  placeholder="Tea Shop Name"
                  value={form.shop_name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="shop_location"
                  placeholder="Shop Location"
                  value={form.shop_location}
                  onChange={handleChange}
                  required
                />

              </>

            )}

            <button type="submit">
              Create Account
            </button>

          </form>

          <p className="switch-text">

            Already have an account?

            <Link to="/">
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Register;