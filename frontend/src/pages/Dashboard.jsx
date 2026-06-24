import React from "react";

function Dashboard() {
  return (
    <div>

      <h1>TeaConnect Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h3>Shops</h3>
          <p>Manage Shops</p>
        </div>

        <div className="card">
          <h3>Products</h3>
          <p>Manage Products</p>
        </div>

        <div className="card">
          <h3>Orders</h3>
          <p>Track Orders</p>
        </div>

        <div className="card">
          <h3>Inventory</h3>
          <p>Stock Tracking</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;