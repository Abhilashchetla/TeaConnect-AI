import React, { useState } from "react";
import API from "../services/api";

function Register() {

  const [form, setForm] = useState({
    name:"",
    email:"",
    phone:"",
    password:"",
    role:"customer"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await API.post(
      "/users/register/",
      form
    );

    alert("Registration Success");
  };

  return (

    <div>

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button>
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;