import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Login</Link>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/shops">Shops</Link>

      <Link to="/products">Products</Link>
      <Link to="/customer">Customer</Link>

      <Link to="/cart">Cart</Link>

      <Link to="/orders">Orders</Link>
    </nav>
  );
}

export default Navbar;
