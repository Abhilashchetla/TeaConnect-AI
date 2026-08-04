import { Link, useLocation, useNavigate } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {
  const location = useLocation();

  const navigate = useNavigate();

  // Hide navbar on login/register

  if (location.pathname === "/" || location.pathname === "/register") {
    return null;
  }

  const loggedIn = localStorage.getItem("access");

  const role = localStorage.getItem("role");

  // Role based dashboard

  const dashboardPath =
    role === "owner"
      ? "/dashboard"
      : role === "customer"
        ? "/customer"
        : role === "delivery"
          ? "/delivery-dashboard"
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
        {/* DASHBOARD */}

        <Link to={dashboardPath}>Dashboard</Link>

        {/* ================= CUSTOMER ================= */}

        {role === "customer" && (
          <>
            <Link to="/shops">Tea Shops</Link>

            <Link to="/products">Products</Link>

            <Link to="/cart">Cart</Link>

            <Link to="/orders">Orders</Link>

            <Link to="/wishlist">Wishlist</Link>

            <Link to="/profile">Profile</Link>
          </>
        )}

        {/* ================= OWNER ================= */}

        {role === "owner" && (
          <>
            <Link to="/my-shop">My Shop</Link>

            <Link to="/create-product">Add Product</Link>

            <Link to="/owner-orders">Orders</Link>

            <Link to="/owner/products">Inventory</Link>

            <Link to="/profile">Profile</Link>
          </>
        )}

        {/* ================= DELIVERY ================= */}

        {role === "delivery" && (
          <>
            <Link to="/delivery-orders">My Deliveries</Link>

            <Link to="/profile">Profile</Link>
          </>
        )}

        {/* LOGOUT */}

        {loggedIn && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
