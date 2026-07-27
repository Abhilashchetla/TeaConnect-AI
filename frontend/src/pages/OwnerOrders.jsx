import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/OwnerOrders.css";
import { toast } from "react-toastify";

function OwnerOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    try {

      const res = await API.get("/cart/owner-orders/");

      setOrders(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const updateStatus = async (id, status) => {

    try {

      await API.put(
        `/cart/update-status/${id}/`,
        { status }
      );

      toast.success("Order Updated");

      loadOrders();

    } catch (err) {

      toast.error("Update Failed");

    }

  };

  return (

    <div className="orders-page">

      <h1>Customer Orders</h1>

      {

        orders.length === 0 ?

          (

            <div className="no-orders">

              <h2>No Orders Yet</h2>

            </div>

          )

          :

          (

            orders.map((order) => (

              <div
                className="order-card"
                key={order.id}
              >

                <div className="order-header">

                  <div>

                    <h2>

                      Order #{order.id}

                    </h2>

                    <p>

                      {new Date(order.created_at)
                        .toLocaleString()}

                    </p>

                  </div>

                  <span className={`status ${order.status}`}>

                    {order.status}

                  </span>

                </div>

                <div className="customer">

                  <h3>

                    👤 {order.customer_name}

                  </h3>

                  <p>

                    📧 {order.customer_email}

                  </p>

                  <p>

                    📞 {order.customer_phone}

                  </p>

                </div>

                <div className="products">

                  <h3>Ordered Items</h3>

                  {

                    order.items.map(item => (

                      <div
                        className="product-row"
                        key={item.id}
                      >

                        <span>

                          {item.product_name}

                        </span>

                        <span>

                          Qty : {item.quantity}

                        </span>

                        <span>

                          ₹{item.price}

                        </span>

                      </div>

                    ))

                  }

                </div>

                <div className="order-footer">

                  <h2>

                    Total : ₹{order.total_amount}

                  </h2>

                  <select

                    value={order.status}

                    onChange={(e) =>

                      updateStatus(

                        order.id,

                        e.target.value

                      )

                    }

                  >

                    <option>Pending</option>

                    <option>Preparing</option>

                    <option>Out For Delivery</option>

                    <option>Delivered</option>

                    <option>Cancelled</option>

                  </select>

                </div>

              </div>

            ))

          )

      }

    </div>

  );

}

export default OwnerOrders;