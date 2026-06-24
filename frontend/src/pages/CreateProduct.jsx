import React,{useState} from "react";
import API from "../services/api";

function CreateProduct(){

 const [product,setProduct]=useState({
  tea_name:"",
  category:"",
  price:"",
  stock:"",
  shop:1
 });

 const handleChange=(e)=>{
  setProduct({
   ...product,
   [e.target.name]:e.target.value
  });
 };

 const submitProduct=async()=>{

  await API.post(
   "/products/create/",
   product
  );

  alert("Product Added");
 };

 return(

  <div>

   <h2>Create Product</h2>

   <input
    name="tea_name"
    placeholder="Tea Name"
    onChange={handleChange}
   />

   <input
    name="category"
    placeholder="Category"
    onChange={handleChange}
   />

   <input
    name="price"
    placeholder="Price"
    onChange={handleChange}
   />

   <input
    name="stock"
    placeholder="Stock"
    onChange={handleChange}
   />

   <button
    onClick={submitProduct}
   >
    Add Product
   </button>

  </div>

 );
}

export default CreateProduct;