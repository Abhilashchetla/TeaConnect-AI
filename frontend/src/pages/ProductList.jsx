import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Product.css";

function ProductList() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    loadProducts();
  }, []);

const loadProducts = async () => {

    try {

        setLoading(true);

        const res = await API.get("/products/list");

        setProducts(res.data);

    } catch (err) {

        console.log(err);

    } finally {

        setLoading(false);

    }

};

  const addToCart = async (productId) => {
    try {
      await API.post("/cart/add/", {
        user: 1,
        product: productId,
        quantity: 1,
      });

      alert("Added to cart");
    } catch (err) {
      console.log(err.response?.data);
      alert("Failed to add to cart");
    }
  };
if (loading) {
    return (
        <h2>Loading Products...</h2>
    );
}
  return (
    <div className="products-container">

      <h1>Tea Products ({products.length})</h1>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search Tea..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-filter"
      >
        <option value="All">All</option>
        <option value="Ginger Tea">Ginger Tea</option>
        <option value="Milk Tea">Milk Tea</option>
        <option value="Green Tea">Green Tea</option>
        <option value="Black Tea">Black Tea</option>
      </select>

      {/* Products */}
      <div className="product-grid">

        {products
          .filter((product) => {
            if (category === "All") return true;
            return product.category === category;
          })
          .filter((product) =>
            product.tea_name.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (

            <div className="product-card" key={product.id}>

              <h3>{product.tea_name}</h3>

              <p>Category: {product.category}</p>

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