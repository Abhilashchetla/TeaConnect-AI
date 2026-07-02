import {useParams} from "react-router-dom";
import {useEffect,useState} from "react";
import API from "../services/api";

function ProductDetails(){

const {id}=useParams();

const [product,setProduct]=useState({});

useEffect(()=>{

loadProduct();

},[]);

const loadProduct=async()=>{

const res=await API.get(`/products/${id}/`);

setProduct(res.data);

};

return(

<div>
    <img
    src={`http://127.0.0.1:8000${product.image}`}
    alt={product.tea_name}
    className="product-image"
/>

<h1>{product.tea_name}</h1>

<p>{product.description}</p>

<h2>₹{product.price}</h2>

<p>{product.category}</p>

</div>

);

}

export default ProductDetails;