import {useEffect,useState} from "react";
import API from "../services/api";

function Wishlist(){

const [wishlist,setWishlist]=useState([]);

useEffect(()=>{

loadWishlist();

},[]);

const loadWishlist=async()=>{

const res=await API.get("/wishlist/1/");

setWishlist(res.data);

};

return(

<div>

<h1>Wishlist</h1>

{

wishlist.map(item=>(

<div key={item.id}>

<h3>{item.product}</h3>

</div>

))

}

</div>

);

}

export default Wishlist;