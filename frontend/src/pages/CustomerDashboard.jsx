import { Link } from "react-router-dom";
import "../styles/CustomerDashboard.css";

function CustomerDashboard() {

    const username = localStorage.getItem("username");

    return (

        <div className="customer-dashboard">

    {/* Welcome Section */}
    <div className="welcome-box">

        <h1>
            Hi {username} 👋
        </h1>

        <p>
            Welcome to TeaConnect AI.
            <br />
            Enjoy fresh tea from nearby tea shops.
        </p>

    </div>

    {/* ADD THIS HERE */}

    <div className="about-section">

        <h2>Why TeaConnect AI?</h2>

        <p>

            TeaConnect AI is a smart tea ordering platform
            that connects tea lovers with nearby tea shops.

            Browse premium teas, place orders, track deliveries,
            manage your wishlist, and enjoy a personalized tea
            shopping experience with AI-powered recommendations.

        </p>

    </div>

            <div className="dashboard-grid">

                <Link to="/products" className="dashboard-card">
                    <h2>🫖 Products</h2>
                    <p>Browse Tea Products</p>
                </Link>

                <Link to="/cart" className="dashboard-card">
                    <h2>🛒 Cart</h2>
                    <p>View Shopping Cart</p>
                </Link>

                <Link to="/checkout" className="dashboard-card">
                    <h2>💳 Checkout</h2>
                    <p>Place Your Order</p>
                </Link>

                <Link to="/orders" className="dashboard-card">
                    <h2>📦 Orders</h2>
                    <p>Track Your Orders</p>
                </Link>

            </div>

        </div>

    );
}

export default CustomerDashboard;