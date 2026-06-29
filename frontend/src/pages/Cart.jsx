import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);

      const userId = 1; // Replace with logged-in user's ID later

      const res = await API.get(`/cart/user/${userId}/`);

      setCart(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      setLoading(true);

      await API.delete(`/cart/remove/${id}/`);

      await loadCart();

      alert("Item removed successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Loading Cart...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{item.product_name}</h3>

              <p>
                <strong>Price:</strong> ₹{item.price}
              </p>

              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <Link to="/checkout">
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "12px 25px",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
                marginTop: "20px",
              }}
            >
              Proceed To Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;