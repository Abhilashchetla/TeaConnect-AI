import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import "../styles/Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const userName = localStorage.getItem("username");

  const placeOrder = async () => {
    const userId = localStorage.getItem("user_id");

    try {
      setLoading(true);

      const res = await API.post(`/cart/place/${userId}/`);

      alert(res.data.message);

      navigate("/orders");
    } catch (err) {
      console.log(err);

      alert("Order Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">🛒 Checkout</h1>

      <div className="checkout-grid">
        {/* Left Section */}

        <div className="checkout-left">
          <div className="checkout-card">
            <h2>📍 Delivery Address</h2>

            <div className="address-box">
              <h3>{userName}</h3>

              <p>Hyderabad, Telangana</p>

              <p>India</p>

              <button className="change-btn">Change Address</button>
            </div>
          </div>

          <div className="checkout-card">
            <h2>💳 Payment Method</h2>

            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={() => setPaymentMethod("Cash on Delivery")}
                />
                Cash on Delivery
              </label>

              <label>
                <input
                  type="radio"
                  checked={paymentMethod === "UPI"}
                  onChange={() => setPaymentMethod("UPI")}
                />
                UPI
              </label>

              <label>
                <input
                  type="radio"
                  checked={paymentMethod === "Card"}
                  onChange={() => setPaymentMethod("Card")}
                />
                Credit / Debit Card
              </label>
            </div>
          </div>

          <div className="checkout-card">
            <h2>🚚 Delivery Time</h2>

            <h3>25 - 30 Minutes</h3>

            <p>Your tea will arrive fresh and hot.</p>
          </div>
        </div>

        {/* Right Section */}

        <div className="checkout-right">
          <div className="checkout-card">
            <h2>🧾 Bill Details</h2>

            <div className="bill-row">
              <span>Items Total</span>

              <span>Calculated at checkout</span>
            </div>

            <div className="bill-row">
              <span>Delivery Fee</span>

              <span>₹40</span>
            </div>

            <div className="bill-row">
              <span>Platform Fee</span>

              <span>₹5</span>
            </div>

            <div className="bill-row">
              <span>GST</span>

              <span>Included</span>
            </div>

            <hr />

            <div className="bill-total">
              <span>Total</span>

              <span>Calculated after placing order</span>
            </div>
          </div>

          <button
            className="place-order-btn"
            onClick={placeOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "🛍 Place Order"}
          </button>

          <p className="secure-text">🔒 100% Secure Checkout</p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
