import React, { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import "../styles/CreateProduct.css";

function CreateProduct() {
  const [product, setProduct] = useState({
    tea_name: "",
    category: "",
    description: "",
    price: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle normal inputs
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image input
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setProduct({
        ...product,
        image: selectedImage,
      });

      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  // Submit Product
  const submitProduct = async () => {
    if (
      !product.tea_name ||
      !product.category ||
      !product.description ||
      !product.price
    ) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("tea_name", product.tea_name);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("price", product.price);

      if (product.image) {
        formData.append("image", product.image);
      }

      const response = await API.post(
        "/products/create/",
        formData
      );

      console.log("Created Product:", response.data);

      toast.success("Product Added Successfully");

      setProduct({
        tea_name: "",
        category: "",
        description: "",
        price: "",
        image: null,
      });

      setImagePreview(null);

    } catch (error) {
      console.log(
        "Product Error:",
        error.response?.data
      );

      toast.error(
        error.response?.data?.error ||
        "Failed to Add Product"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-product-page">

      <div className="create-product-card">

        <div className="create-product-header">
          <h1>Add New Product</h1>

          <p>Add a new tea product to your shop</p>
        </div>

        <div className="product-form">

          {/* Tea Name */}

          <div className="form-group">
            <label>Tea Name</label>

            <input
              type="text"
              name="tea_name"
              placeholder="Enter tea name"
              value={product.tea_name}
              onChange={handleChange}
            />
          </div>


          {/* Category */}

          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
            >
              <option value="">
                Select Category
              </option>

              <option value="Masala Tea">
                Masala Tea
              </option>

              <option value="Ginger Tea">
                Ginger Tea
              </option>

              <option value="Green Tea">
                Green Tea
              </option>

              <option value="Lemon Tea">
                Lemon Tea
              </option>

              <option value="Black Tea">
                Black Tea
              </option>
            </select>
          </div>


          {/* Description */}

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Enter product description"
              value={product.description}
              onChange={handleChange}
            />
          </div>


          {/* Price */}

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              name="price"
              placeholder="Enter product price"
              value={product.price}
              onChange={handleChange}
            />
          </div>


          {/* Product Image */}

          <div className="form-group">
            <label>Product Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
            />

            {/* Image Preview */}

            {imagePreview && (
              <div className="image-preview-container">

                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="image-preview"
                />

              </div>
            )}
          </div>


          {/* Submit Button */}

          <button
            className="add-product-btn"
            onClick={submitProduct}
            disabled={loading}
          >
            {loading
              ? "Adding Product..."
              : "Add Product"
            }
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateProduct;