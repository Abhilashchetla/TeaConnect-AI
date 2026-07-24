import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Product.css";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const { shopId } = useParams();

  useEffect(() => {
    loadProducts();
  }, [shopId]);

  const loadProducts = async () => {
    try {
      setLoading(true);

      let res;

      if (shopId) {
        res = await API.get(`/products/shop/${shopId}/`);
      } else {
        res = await API.get("/products/list/");
      }

      console.log("Products:", res.data);

      setProducts(res.data);
    } catch (err) {
      console.log("Product Error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Add To Cart
  const addToCart = async (productId) => {
    try {
      await API.post("/cart/add/", {
        user: 1,
        product: productId,
        quantity: 1,
      });

      toast.success("Added to Cart");
    } catch (err) {
      console.log(err.response?.data);
      toast.success("Failed to add to Wishlist");
    }
  };

  // Wishlist
  const addToWishlist = async (productId) => {
    try {
      await API.post("/wishlist/add/", {
        user: 1,
        product: productId,
      });

      toast.success("Added to Wishlist");
    } catch (err) {
      console.log(err.response?.data);
      toast.success("Failed to add to Wishlist");
    }
  };

  if (loading) {
    return <h2>Loading Products...</h2>;
  }

  return (
    <div className="products-container">
      <h1>Tea Products ({products.length})</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search Tea..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-filter"
      >
        <option value="All">All</option>

        <option value="Masala Tea">Masala Tea</option>
        <option value="Ginger Tea">Ginger Tea</option>
        <option value="Green Tea">Green Tea</option>
        <option value="Black Tea">Black Tea</option>
        <option value="Milk Tea">Milk Tea</option>
        <option value="Lemon Tea">Lemon Tea</option>

        <option value="Osmania Biscuit">Osmania Biscuit</option>
        <option value="Parle-G">Parle-G</option>
        <option value="Good Day">Good Day</option>
        <option value="Marie Gold">Marie Gold</option>
        <option value="Cookies">Cookies</option>
      </select>

      {/* Product Grid */}
      <div className="product-grid">
        {products
          .filter((product) => {
            if (category === "All") return true;
            return product.category === category;
          })
          .filter((product) =>
            product.tea_name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={
                  product.image
                    ? product.image.startsWith("http")
                      ? product.image
                      : `http://127.0.0.1:8000${product.image}`
                    : "/default-tea.png"
                }
                alt={product.tea_name}
                className="product-image"
              />

              <h3>{product.tea_name}</h3>

              <p>Category: {product.category}</p>

              <h4>₹{product.price}</h4>

              {/* Dummy Rating */}
              <p>⭐⭐⭐⭐☆</p>

              <div className="button-group">
                <button onClick={() => addToCart(product.id)}>
                  Add To Cart
                </button>

                <button
                  className="wishlist-btn"
                  onClick={() => addToWishlist(product.id)}
                >
                  ❤️ Wishlist
                </button>

                <Link to={`/products/${product.id}`}>
                  <button className="details-btn">View Details</button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductList;
