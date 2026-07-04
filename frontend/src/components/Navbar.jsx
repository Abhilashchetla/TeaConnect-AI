import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();

    // Hide Navbar on Login & Register
    if (
        location.pathname === "/" ||
        location.pathname === "/register"
    ) {
        return null;
    }

    const loggedIn = localStorage.getItem("access");

    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user_id");

        navigate("/");

    };

    return (

        <nav className="navbar">

            <div className="logo">

                ☕ <span>TeaConnect AI</span>

            </div>

            <div className="nav-links">

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/shops">
                    Tea Shops
                </Link>

                <Link to="/products">
                    Products
                </Link>

                <Link to="/cart">
                    Cart
                </Link>

                <Link to="/orders">
                    Orders
                </Link>

                <Link to="/wishlist">
                    Wishlist
                </Link>

                <Link to="/profile">
                    Profile
                </Link>

                {loggedIn && (

                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>

                )}

            </div>

        </nav>

    );

}

export default Navbar;