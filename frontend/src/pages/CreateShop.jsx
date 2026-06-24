import React, { useState } from "react";
import API from "../services/api";

function CreateShop() {

  const [shop,setShop] = useState({
    shop_name:"",
    address:"",
    city:""
  });

  const handleChange=(e)=>{
    setShop({
      ...shop,
      [e.target.name]:e.target.value
    });
  };

  const submitShop=async()=>{

    await API.post(
      "/shops/create/",
      shop
    );

    alert("Shop Created");
  };

  return(
    <div>

      <h2>Create Shop</h2>

      <input
        name="shop_name"
        placeholder="Shop Name"
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />

      <input
        name="city"
        placeholder="City"
        onChange={handleChange}
      />

      <button onClick={submitShop}>
        Create Shop
      </button>

    </div>
  );
}

export default CreateShop;