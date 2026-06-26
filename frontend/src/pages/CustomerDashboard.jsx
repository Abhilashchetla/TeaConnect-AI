import React from "react";
import {Link} from "react-router-dom";

function CustomerDashboard(){

return(

<div>

<h1>Customer Dashboard</h1>

<Link to="/products">

Products

</Link>

<br/>

<Link to="/cart">

Cart

</Link>

<br/>

<Link to="/checkout">

Checkout

</Link>

<br/>

<Link to="/orders">

Orders

</Link>

</div>

);

}

export default CustomerDashboard;