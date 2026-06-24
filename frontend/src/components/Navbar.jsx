import { Link }
from "react-router-dom";

function Navbar(){

 return(

  <nav>

   <Link to="/">
    Login
   </Link>

   <Link to="/dashboard">
    Dashboard
   </Link>

   <Link to="/shops">
    Shops
   </Link>

   <Link to="/products">
    Products
   </Link>

  </nav>

 );
}

export default Navbar;