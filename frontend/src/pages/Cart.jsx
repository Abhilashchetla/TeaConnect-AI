import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const userId = 1;

      const res = await API.get(`/cart/user/${userId}/`);

      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/remove/${id}/`);

      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
              }}
            >
              <h3>{item.product_name}</h3>

              <p>Price : ₹{item.price}</p>

              <p>Quantity : {item.quantity}</p>

              <button onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          ))}

          {/* Checkout Button */}
          <Link to="/checkout">
            <button
              style={{
                margin: "20px",
                padding: "10px 20px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
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