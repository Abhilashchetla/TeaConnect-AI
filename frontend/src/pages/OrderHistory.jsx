import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/OrderHistory.css";
function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const userId = localStorage.getItem("user_id");
 
      const res = await API.get(`/cart/history/${userId}/`);

      setOrders(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Orders...</h2>;
  }

  return (
    <div className="order-container">
      <h1 className="order-title">My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h1>📦</h1>

          <h2>No Orders Yet</h2>

          <p>Start shopping and place your first order.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h2 className="order-id">Order #{order.id}</h2>

              <span
                className={`order-status ${order.status.toLowerCase().replace(/\s/g, "")}`}
              >
                {order.status}
              </span>
            </div>

            <div className="order-details">
              <div className="detail-box">
                <h4>Total Amount</h4>

                <p>₹{order.total_amount}</p>
              </div>

              <div className="detail-box">
                <h4>Status</h4>

                <p>{order.status}</p>
              </div>

              <div className="detail-box">
                <h4>Order Date</h4>

                <p>{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <button className="track-btn">Track Order</button>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
