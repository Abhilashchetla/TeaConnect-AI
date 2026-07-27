import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/OwnerDashboard.css";

function OwnerDashboard() {
  const [user, setUser] = useState({});
  const [shop, setShop] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const profileRes = await API.get("/users/profile/");

      setUser(profileRes.data);

      const shopRes = await API.get("/shops/list/");

      setShop(shopRes.data);

      const productRes = await API.get("/products/list/");

      setProducts(productRes.data);

      // Replace later with owner orders API

     const orderRes=await API.get("/cart/owner-orders/");

      setOrders(orderRes.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total_amount || 0),

    0,
  );

  if (loading) {
    return <h2 className="loading">Loading Dashboard...</h2>;
  }

  return (
    <div className="owner-dashboard">
      {/* Sidebar */}

      <aside className="sidebar">
        <h2>☕ TeaConnect AI</h2>

        <Link to="/owner-dashboard">Dashboard</Link>
        <Link to="/create-shop">Create Shop</Link>

        <Link to="/my-shop">My Shop</Link>

        <Link to="/owner/products">Products</Link>

        <Link to="/create-product">Add Product</Link>

        <Link to="/orders">Orders</Link>

        <Link to="/inventory">Inventory</Link>

        <Link to="/analytics">Analytics</Link>

        <Link to="/profile">Profile</Link>
      </aside>

      {/* Main */}

      <main className="main-content">
        <div className="header">
          <div>
            <h1>Hello {user.username} 👋</h1>

            <p>Welcome back to TeaConnect AI</p>
          </div>
        </div>

        {/* Cards */}

        <div className="cards">
          <div className="card">
            <h3>Total Shops</h3>

            <h1>{shop.length}</h1>
          </div>

          <div className="card">
            <h3>Total Products</h3>

            <h1>{products.length}</h1>
          </div>

          <div className="card">
            <h3>Total Orders</h3>

            <h1>{orders.length}</h1>
          </div>

          <div className="card">
            <h3>Revenue</h3>

            <h1>₹{totalRevenue}</h1>
          </div>
        </div>

        {/* Recent Orders */}

        <div className="table-card">
          <h2>Recent Orders</h2>

          <table>
            <thead>
              <tr>
                <th>Order ID</th>

                <th>Total</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="3">No Orders Found</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>

                    <td>₹{order.total_amount}</td>

                    <td>{order.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default OwnerDashboard;
