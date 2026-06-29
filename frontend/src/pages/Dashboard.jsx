import React from "react";
import "../styles/Dashboard.css";
function Dashboard() {
  return (
    <div>

      <h1>TeaConnect Dashboard</h1>

      <div className="dashboard">

      <div className="dashboard-card">

      <h2>Shops</h2>

      <p>Manage Tea Shops</p>

      </div>

      <div className="dashboard-card">

      <h2>Products</h2>

      <p>Manage Products</p>

      </div>

      <div className="dashboard-card">

      <h2>Orders</h2>

      <p>Customer Orders</p>

      </div>

      <div className="dashboard-card">

      <h2>Inventory</h2>

      <p>Stock Management</p>

      </div>

      </div>

    </div>
  );
}

export default Dashboard;