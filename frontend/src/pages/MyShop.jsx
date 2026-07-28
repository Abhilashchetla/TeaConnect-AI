import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/MyShop.css";

function MyShop() {
  const [shop, setShop] = useState({
    shop_name: "",
    address: "",
    city: "",
    state: "",
    rating: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadShop();
  }, []);

const loadShop = async () => {
  try {
    setLoading(true);

    const res = await API.get("/shops/my-shop/");

    setShop(res.data);
  } catch (err) {
    console.log(err.response);

    alert("Unable to load shop details.");
  } finally {
    setLoading(false);
  }
};
  const handleChange = (e) => {
    setShop({
      ...shop,
      [e.target.name]: e.target.value,
    });
  };

  const saveShop = async () => {
  try {
    setSaving(true);

    await API.put("/shops/update/", shop);

    alert("Shop updated successfully.");
  } catch (err) {
    console.log(err.response);

    alert("Failed to update shop.");
  } finally {
    setSaving(false);
  }
};
  if (loading) {
    return (
      <div className="shop-loading">
        <h2>Loading My Shop...</h2>
      </div>
    );
  }

  return (
    <div className="myshop-page">

      <div className="shop-header">

        <div className="shop-avatar">
          ☕
        </div>

        <div className="shop-info">
          <h1>{shop.shop_name || "My Tea Shop"}</h1>

          <p>
            Manage your tea shop information, address and business details.
          </p>
        </div>

      </div>

      <div className="shop-card">

        <h2>Shop Information</h2>

        <div className="shop-grid">

          <div className="form-group">
            <label>Shop Name</label>

            <input
              type="text"
              name="shop_name"
              value={shop.shop_name}
              onChange={handleChange}
              placeholder="Tea Shop Name"
            />
          </div>

          <div className="form-group">
            <label>City</label>

            <input
              type="text"
              name="city"
              value={shop.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>

          <div className="form-group full-width">
            <label>Address</label>

            <textarea
              name="address"
              value={shop.address}
              onChange={handleChange}
              rows="4"
              placeholder="Shop Address"
            />
          </div>
                    <div className="form-group">
            <label>State</label>

            <input
              type="text"
              name="state"
              value={shop.state}
              onChange={handleChange}
              placeholder="State"
            />
          </div>

          <div className="form-group">
            <label>Rating</label>

            <input
              type="number"
              name="rating"
              value={shop.rating}
              onChange={handleChange}
              placeholder="Rating"
              step="0.1"
              min="0"
              max="5"
            />
          </div>

        </div>

        <div className="shop-summary">

          <div className="summary-card">
            <h3>🏪 Shop</h3>
            <p>{shop.shop_name || "Not Available"}</p>
          </div>

          <div className="summary-card">
            <h3>📍 Location</h3>
            <p>{shop.city || "City"}</p>
          </div>

          <div className="summary-card">
            <h3>⭐ Rating</h3>
            <p>{shop.rating || "0.0"} / 5</p>
          </div>

        </div>

        <div className="button-section">

          <button
            className="save-btn"
            onClick={saveShop}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default MyShop;