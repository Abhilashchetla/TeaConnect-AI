import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/OwnerOrders.css";
import { toast } from "react-toastify";

function OwnerOrders() {
  const [orders, setOrders] = useState([]);
  const [deliveryAgents, setDeliveryAgents] = useState([]);

  // Stores selected agent for each order
  const [selectedAgents, setSelectedAgents] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
    loadDeliveryAgents();
  }, []);

  // ==========================================
  // LOAD OWNER ORDERS
  // ==========================================

  const loadOrders = async () => {
    try {
      const res = await API.get("/cart/owner-orders/");

      setOrders(res.data);
    } catch (err) {
      console.log("Order Error:", err.response?.data);

      toast.error("Unable to load orders");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD DELIVERY AGENTS
  // ==========================================

  const loadDeliveryAgents = async () => {
    try {
      const res = await API.get("/users/delivery-agents/");

      setDeliveryAgents(res.data);
    } catch (err) {
      console.log("Delivery Agents Error:", err.response?.data);
    }
  };

  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/cart/update-status/${id}/`, {
        status: status,
      });

      toast.success(`Order changed to ${status}`);

      loadOrders();
    } catch (err) {
      console.log(err.response?.data);

      toast.error(err.response?.data?.error || "Update Failed");
    }
  };

  // ==========================================
  // SELECT DELIVERY AGENT
  // ==========================================

  const handleAgentChange = (orderId, agentId) => {
    setSelectedAgents({
      ...selectedAgents,

      [orderId]: agentId,
    });
  };

  // ==========================================
  // ASSIGN DELIVERY AGENT
  // ==========================================

  const assignDeliveryAgent = async (orderId) => {
    const agentId = selectedAgents[orderId];

    if (!agentId) {
      toast.warning("Please select a delivery agent");

      return;
    }

    try {
      await API.put(`/cart/assign-delivery/${orderId}/`, {
        delivery_agent_id: agentId,
      });

      toast.success("Delivery Agent Assigned Successfully");

      // Clear selected dropdown
      setSelectedAgents({
        ...selectedAgents,

        [orderId]: "",
      });

      loadOrders();
    } catch (err) {
      console.log("Assign Error:", err.response?.data);

      toast.error(
        err.response?.data?.error || "Failed to assign delivery agent",
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="orders-loading">
        <h2>Loading Customer Orders...</h2>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-title">
        <div>
          <h1>Customer Orders</h1>

          <p>Manage orders and assign delivery agents.</p>
        </div>

        <div className="orders-count">{orders.length} Orders</div>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <div className="empty-icon">📦</div>

          <h2>No Orders Yet</h2>

          <p>Customer orders will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              {/* ================= HEADER ================= */}

              <div className="order-header">
                <div>
                  <h2>Order #{order.id}</h2>

                  <p>{new Date(order.created_at).toLocaleString()}</p>
                </div>

                <span
                  className={`status ${order.status
                    .toLowerCase()
                    .replace(/\s/g, "-")}`}
                >
                  {order.status}
                </span>
              </div>

              {/* ================= CUSTOMER ================= */}

              <div className="customer">
                <h3>Customer Details</h3>

                <p>👤 {order.customer_name}</p>

                <p>📧 {order.customer_email}</p>

                <p>📞 {order.customer_phone}</p>
              </div>

              {/* ================= PRODUCTS ================= */}

              <div className="products">
                <h3>Ordered Items</h3>

                {order.items &&
                  order.items.map((item) => (
                    <div className="product-row" key={item.id}>
                      <span className="product-name">
                        ☕ {item.product_name}
                      </span>

                      <span>Qty: {item.quantity}</span>

                      <span>₹{item.price}</span>
                    </div>
                  ))}
              </div>

              {/* ================= TOTAL ================= */}

              <div className="order-total">
                <span>Order Total</span>

                <strong>₹{order.total_amount}</strong>
              </div>

              {/* ================= ORDER STATUS ================= */}

              <div className="order-action-section">
                <div className="action-block">
                  <label>Order Status</label>

                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>

                    <option value="Preparing">Preparing</option>

                    <option value="Ready For Pickup">Ready For Pickup</option>

                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* ================= DELIVERY AGENT ================= */}

                <div className="action-block">
                  <label>Delivery Agent</label>

                  {order.delivery_agent ? (
                    <div className="assigned-agent">
                      <div className="agent-icon">🛵</div>

                      <div>
                        <strong>{order.delivery_agent_name}</strong>

                        <p>📞 {order.delivery_agent_phone}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <select
                        value={selectedAgents[order.id] || ""}
                        onChange={(e) =>
                          handleAgentChange(order.id, e.target.value)
                        }
                      >
                        <option value="">Select Delivery Agent</option>

                        {deliveryAgents.map((agent) => (
                          <option key={agent.id} value={agent.id}>
                            {agent.username}
                            {" - "}
                            {agent.phone}
                          </option>
                        ))}
                      </select>

                      <button
                        className="assign-agent-btn"
                        onClick={() => assignDeliveryAgent(order.id)}
                      >
                        🛵 Assign Delivery Agent
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* ================= DELIVERY INFORMATION ================= */}

              {order.delivery_agent && (
                <div className="delivery-info">
                  <div>
                    <span className="delivery-label">
                      Assigned Delivery Agent
                    </span>

                    <h3>🛵 {order.delivery_agent_name}</h3>

                    <p>📞 {order.delivery_agent_phone}</p>
                  </div>

                  <span className="assigned-badge">Assigned ✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OwnerOrders;
