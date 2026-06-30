import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    return (

        <nav className="navbar">

            <div className="logo">
                TeaConnect AI
            </div>

            <div className="links">

                <Link to="/dashboard">Dashboard</Link>

                <Link to="/shops">Shops</Link>

                <Link to="/products">Products</Link>

                <Link to="/cart">Cart</Link>

                <Link to="/orders">Orders</Link>
                <Link to="/profile">Profile</Link>

            </div>

        </nav>

    );

}

export default Navbar;