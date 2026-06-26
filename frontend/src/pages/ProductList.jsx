import React, { useEffect, useState } from "react";
import API from "../services/api";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products/list/");
      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load products");
    }
  };

  const addToCart = async (productId) => {
    try {
        await API.post("/cart/add/", {
            user: 1,
            product: productId,
            quantity: 1
        });

        alert("Added to cart");
    } catch (err) {
        console.log(err.response?.data);
        alert("Failed to add to cart");
    }
};

  return (
    <div>
      <h1>Tea Products ({products.length})</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.tea_name}</h3>

            <p>{product.category}</p>

            <h4>₹{product.price}</h4>

            <button onClick={() => addToCart(product.id)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;