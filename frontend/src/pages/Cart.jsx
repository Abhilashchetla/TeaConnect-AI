import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);

      const userId = localStorage.getItem("user_id");

      const res = await API.get(`/cart/user/${userId}/`);

      setCart(res.data);
    } catch (err) {
      console.log(err);

      alert("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = async (item) => {
    try {
      await API.put(`/cart/update/${item.id}/`, {
        quantity: item.quantity + 1,
      });

      loadCart();
    } catch (err) {
      console.log(err);
    }
  };

  const decreaseQty = async (item) => {
    try {
      if (item.quantity === 1) {
        await API.delete(`/cart/remove/${item.id}/`);
      } else {
        await API.put(`/cart/update/${item.id}/`, {
          quantity: item.quantity - 1,
        });
      }

      loadCart();
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

  const grandTotal = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,

    0,
  );

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Loading Cart...</h2>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>

          <p>Add some delicious tea to continue shopping.</p>

          <Link to="/products">
            <button className="checkout-btn">Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-card" key={item.id}>
              <h2>{item.product_name}</h2>

              <p>
                Price :<strong>₹{item.price}</strong>
              </p>

              <div className="qty-box">
                <button onClick={() => decreaseQty(item)}>-</button>

                <span>{item.quantity}</span>

                <button onClick={() => increaseQty(item)}>+</button>
              </div>

              <h3>Subtotal : ₹{Number(item.price) * item.quantity}</h3>

              <button
                className="remove-btn"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h2>Grand Total : ₹{grandTotal}</h2>

            <Link to="/checkout">
              <button className="checkout-btn">Proceed To Checkout</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
