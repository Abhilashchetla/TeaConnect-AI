import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/DeliveryDashboard.css";

function DeliveryDashboard() {

  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      // Logged-in delivery agent
      const profileRes = await API.get(
        "/users/profile/"
      );

      setUser(profileRes.data);


      // Orders assigned to this delivery agent
      const orderRes = await API.get(
        "/cart/delivery-orders/"
      );

      setOrders(orderRes.data);

    } catch (err) {

      console.log(
        "Delivery Dashboard Error:",
        err.response?.data
      );

    } finally {

      setLoading(false);

    }

  };


  // Total assigned orders
  const totalOrders = orders.length;


  // Ready for pickup
  const readyOrders = orders.filter(
    (order) =>
      order.status === "Ready For Pickup"
  ).length;


  // Currently delivering
  const activeOrders = orders.filter(
    (order) =>
      order.status === "Picked Up" ||
      order.status === "Out For Delivery"
  ).length;


  // Completed deliveries
  const deliveredOrders = orders.filter(
    (order) =>
      order.status === "Delivered"
  ).length;


  if (loading) {

    return (

      <div className="delivery-loading">
        Loading Delivery Dashboard...
      </div>

    );

  }


  return (

    <div className="delivery-dashboard">

      {/* Header */}

      <div className="delivery-dashboard-header">

        <div>

          <h1>
            Hello {user.username || "Delivery Agent"} 👋
          </h1>

          <p>
            Manage your assigned deliveries and track
            your delivery progress.
          </p>

        </div>

        <div className="delivery-agent-badge">

          🛵 Delivery Agent

        </div>

      </div>


      {/* Statistics */}

      <div className="delivery-stats">

        <div className="delivery-stat-card">

          <div className="stat-icon">
            📦
          </div>

          <div>

            <p>Total Assigned</p>

            <h2>
              {totalOrders}
            </h2>

          </div>

        </div>


        <div className="delivery-stat-card">

          <div className="stat-icon">
            🏪
          </div>

          <div>

            <p>Ready For Pickup</p>

            <h2>
              {readyOrders}
            </h2>

          </div>

        </div>


        <div className="delivery-stat-card">

          <div className="stat-icon">
            🛵
          </div>

          <div>

            <p>Active Delivery</p>

            <h2>
              {activeOrders}
            </h2>

          </div>

        </div>


        <div className="delivery-stat-card">

          <div className="stat-icon">
            ✅
          </div>

          <div>

            <p>Delivered</p>

            <h2>
              {deliveredOrders}
            </h2>

          </div>

        </div>

      </div>


      {/* Main action */}

      <div className="delivery-main-card">

        <div className="delivery-main-icon">
          🛵
        </div>

        <div>

          <h2>
            Your Delivery Orders
          </h2>

          <p>
            View orders assigned to you, pick them up
            from tea shops and deliver them to customers.
          </p>

        </div>

        <Link
          to="/delivery-orders"
          className="view-delivery-btn"
        >
          View Orders →
        </Link>

      </div>


      {/* Recent Assigned Orders */}

      <div className="delivery-recent">

        <div className="delivery-section-title">

          <h2>
            Recent Assigned Orders
          </h2>

          <Link to="/delivery-orders">
            View All
          </Link>

        </div>


        {orders.length === 0 ? (

          <div className="delivery-empty">

            <div className="empty-delivery-icon">
              📭
            </div>

            <h3>
              No Orders Assigned
            </h3>

            <p>
              New delivery orders assigned by tea shops
              will appear here.
            </p>

          </div>

        ) : (

          <div className="recent-order-list">

            {orders.slice(0, 5).map((order) => (

              <div
                className="recent-delivery-order"
                key={order.id}
              >

                <div>

                  <h3>
                    Order #{order.id}
                  </h3>

                  <p>
                    👤 {order.customer_name}
                  </p>

                </div>


                <div>

                  <strong>
                    ₹{order.total_amount}
                  </strong>

                </div>


                <span
                  className={`delivery-status ${order.status
                    .toLowerCase()
                    .replace(/\s/g, "-")}`}
                >
                  {order.status}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default DeliveryDashboard;