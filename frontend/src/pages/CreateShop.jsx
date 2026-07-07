import React, { useState } from "react";
import API from "../services/api";

function CreateShop() {

  const [shop,setShop] = useState({
    shop_name:"",
    address:"",
    city:"",
    state: "",
  });

  const handleChange=(e)=>{
    setShop({
      ...shop,
      [e.target.name]:e.target.value
    });
  };

const submitShop = async () => {

  try {

    const response = await API.post(
      "/shops/create/",
      shop
    );

    console.log(response.data);

    alert("Shop Created");

  } catch (error) {

    console.log(error.response?.data);

    alert(
      error.response?.data?.error ||
      "Failed to create shop"
    );

  }

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
      <input
        name="state"
        placeholder="State"
        value={shop.state}
        onChange={handleChange}
      />

      <button onClick={submitShop}>
        Create Shop
      </button>

    </div>
  );
}

export default CreateShop;