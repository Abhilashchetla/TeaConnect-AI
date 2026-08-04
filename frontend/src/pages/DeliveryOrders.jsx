import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import "../styles/DeliveryOrders.css";

function DeliveryOrders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);


  useEffect(() => {

    loadOrders();

  }, []);


  const loadOrders = async () => {

    try {

      setLoading(true);

      const res = await API.get(
        "/cart/delivery-orders/"
      );

      setOrders(res.data);

    } catch (err) {

      console.log(
        "Delivery Orders Error:",
        err.response?.data
      );

      toast.error(
        "Unable to load delivery orders"
      );

    } finally {

      setLoading(false);

    }

  };


  // Update delivery status

  const updateStatus = async (
    orderId,
    status
  ) => {

    try {

      setUpdatingId(orderId);

      await API.put(
        `/cart/delivery-status/${orderId}/`,
        {
          status: status
        }
      );

      toast.success(
        `Order changed to ${status}`
      );

      loadOrders();

    } catch (err) {

      console.log(
        err.response?.data
      );

      toast.error(
        err.response?.data?.error ||
        "Unable to update delivery"
      );

    } finally {

      setUpdatingId(null);

    }

  };


  if (loading) {

    return (

      <div className="delivery-orders-loading">

        Loading Delivery Orders...

      </div>

    );

  }


  return (

    <div className="delivery-orders-page">

      <div className="delivery-orders-header">

        <div>

          <h1>
            🛵 My Deliveries
          </h1>

          <p>
            Pick up assigned orders and deliver
            them to customers.
          </p>

        </div>


        <div className="assigned-count">

          {orders.length} Assigned

        </div>

      </div>


      {orders.length === 0 ? (

        <div className="no-delivery-orders">

          <div className="no-delivery-icon">
            🛵
          </div>

          <h2>
            No Delivery Orders
          </h2>

          <p>
            You currently don't have any assigned
            deliveries.
          </p>

        </div>

      ) : (

        <div className="delivery-orders-list">

          {orders.map((order) => (

            <div
              className="delivery-order-card"
              key={order.id}
            >

              {/* Header */}

              <div className="delivery-order-header">

                <div>

                  <h2>
                    Order #{order.id}
                  </h2>

                  <p>

                    {new Date(
                      order.created_at
                    ).toLocaleString()}

                  </p>

                </div>


                <span
                  className={`delivery-order-status ${order.status
                    .toLowerCase()
                    .replace(/\s/g, "-")}`}
                >

                  {order.status}

                </span>

              </div>


              {/* Customer */}

              <div className="delivery-customer-box">

                <h3>
                  👤 Customer
                </h3>

                <h4>
                  {order.customer_name}
                </h4>

                <p>
                  📞 {order.customer_phone}
                </p>

                <p>
                  📧 {order.customer_email}
                </p>

              </div>


              {/* Products */}

              <div className="delivery-products">

                <h3>
                  📦 Order Items
                </h3>


                {order.items?.map((item) => (

                  <div
                    className="delivery-product-row"
                    key={item.id}
                  >

                    <span>
                      {item.product_name}
                    </span>

                    <span>
                      Qty: {item.quantity}
                    </span>

                    <strong>
                      ₹{item.price}
                    </strong>

                  </div>

                ))}

              </div>


              {/* Total */}

              <div className="delivery-total">

                <span>
                  Order Total
                </span>

                <strong>
                  ₹{order.total_amount}
                </strong>

              </div>


              {/* ACTION BUTTONS */}

              <div className="delivery-actions">


                {order.status ===
                  "Ready For Pickup" && (

                  <button

                    className="pickup-btn"

                    disabled={
                      updatingId === order.id
                    }

                    onClick={() =>
                      updateStatus(
                        order.id,
                        "Picked Up"
                      )
                    }

                  >

                    📦 Pick Up Order

                  </button>

                )}


                {order.status ===
                  "Picked Up" && (

                  <button

                    className="start-delivery-btn"

                    disabled={
                      updatingId === order.id
                    }

                    onClick={() =>
                      updateStatus(
                        order.id,
                        "Out For Delivery"
                      )
                    }

                  >

                    🛵 Start Delivery

                  </button>

                )}


                {order.status ===
                  "Out For Delivery" && (

                  <button

                    className="delivered-btn"

                    disabled={
                      updatingId === order.id
                    }

                    onClick={() =>
                      updateStatus(
                        order.id,
                        "Delivered"
                      )
                    }

                  >

                    ✅ Mark as Delivered

                  </button>

                )}


                {order.status ===
                  "Delivered" && (

                  <div className="delivery-completed">

                    ✅ Delivery Completed

                  </div>

                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default DeliveryOrders;