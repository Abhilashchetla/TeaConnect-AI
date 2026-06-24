import React,
{
 useEffect,
 useState
}
from "react";

import API from "../services/api";

function ProductList(){

 const [products,setProducts]
 = useState([]);

 useEffect(()=>{

  loadProducts();

 },[]);

 const loadProducts=async()=>{

  const res=
  await API.get(
   "/products/list/"
  );

  setProducts(
   res.data
  );
 };

 return(

  <div>

   <h2>Products</h2>

   {products.map(product=>(

    <div key={product.id}>

     <h4>
      {product.tea_name}
     </h4>

     <p>
      ₹{product.price}
     </p>

    </div>

   ))}

  </div>

 );
}

export default ProductList;