import React,
{
 useEffect,
 useState
}
from "react";

import API from "../services/api";

function ShopList(){

 const [shops,setShops]
 = useState([]);

 useEffect(()=>{

  loadShops();

 },[]);

 const loadShops=async()=>{

  const res=
  await API.get(
   "/shops/list/"
  );

  setShops(
   res.data
  );
 };

 return(

  <div>

   <h2>Shops</h2>

   {shops.map(shop=>(

    <div key={shop.id}>

      <h4>
       {shop.shop_name}
      </h4>

      <p>
       {shop.city}
      </p>

    </div>

   ))}

  </div>

 );
}

export default ShopList;