import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide Navbar on Login & Register pages
  if (
    location.pathname === "/" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  const loggedIn = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  const dashboardPath =
    role === "owner"
      ? "/dashboard"
      : role === "customer"
      ? "/customer"
      : "/";

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("user_id");

    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="logo">
        ☕ <span>TeaConnect AI</span>
      </div>

      <div className="nav-links">

        <Link to={dashboardPath}>
          Dashboard
        </Link>

        {role === "customer" && (
          <>
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
          </>
        )}

        {role === "owner" && (
          <>
            <Link to="/create-shop">
              My Shop
            </Link>

            <Link to="/create-product">
              Add Product
            </Link>

            <Link to="/owner/products">
              Inventory
            </Link>

            <Link to="/profile">
              Profile
            </Link>
          </>
        )}

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