import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/OwnerProducts.css";

function OwnerProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await API.get("/products/my-products/");

      console.log("Owner Products:", response.data);

      setProducts(response.data);
    } catch (error) {
      console.log("Owner Products Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Products...</h2>;
  }
  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await API.delete(`/products/delete/${productId}/`);

      setProducts((previousProducts) =>
        previousProducts.filter((product) => product.id !== productId),
      );

      console.log("Product Deleted Successfully");
    } catch (error) {
      console.log("Delete Product Error:", error.response?.data);
    }
  };

  return (
    <div className="owner-products-page">
      <div className="owner-products-header">
        <div>
          <h1>My Products</h1>
          <p>Manage products available in your tea shop</p>
        </div>

        <a href="/create-product" className="add-product-button">
          + Add Product
        </a>
      </div>

      <h2>Total Products: {products.length}</h2>

      {products.length === 0 ? (
        <div className="no-products">
          <h2>No Products Found</h2>
          <p>Add your first tea product.</p>
        </div>
      ) : (
        <div className="owner-product-grid">
          {products.map((product) => (
            <div className="owner-product-card" key={product.id}>
              <div className="owner-product-image-container">
                {product.image ? (
                  <img
                    src={
                      product.image.startsWith("http")
                        ? product.image
                        : `http://127.0.0.1:8000${product.image}`
                    }
                    alt={product.tea_name}
                    className="owner-product-image"
                  />
                ) : (
                  <div className="no-product-image">No Image</div>
                )}
              </div>

              <div className="owner-product-info">
                <h2>{product.tea_name}</h2>

                <span className="product-category">{product.category}</span>

                <p className="product-description">{product.description}</p>

                <h3 className="product-price">₹{product.price}</h3>

                <div className="owner-product-actions">
                  <button className="edit-product-button">Edit</button>
                  <button
                    className="delete-product-button"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OwnerProducts;
