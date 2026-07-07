import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/ShopList.css";
import { useNavigate } from "react-router-dom";

function ShopList() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      const response = await API.get("/shops/list/");

      console.log("Shops:", response.data);

      setShops(response.data);
    } catch (error) {
      console.log("Shop Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="shops-loading">Loading Tea Shops...</div>;
  }

  return (
    <div className="shops-page">
      <div className="shops-header">
        <h1>Explore Tea Shops</h1>

        <p>Discover fresh and delicious tea from our trusted tea shops</p>
      </div>

      {shops.length === 0 ? (
        <div className="no-shops">
          <h2>No Tea Shops Available</h2>

          <p>Please check again later.</p>
        </div>
      ) : (
        <div className="shops-grid">
          {shops.map((shop) => (
            <div className="shop-card" key={shop.id}>
              <div className="shop-icon">☕</div>

              <div className="shop-information">
                <h2>{shop.shop_name}</h2>

                <p className="shop-location">📍 {shop.city}</p>

                {shop.address && <p className="shop-address">{shop.address}</p>}

                <div className="shop-rating">
                  ⭐⭐⭐⭐⭐
                  <span>{shop.rating || "New Shop"}</span>
                </div>

                <button
                  className="view-shop-button"
                  onClick={() => navigate(`/shops/${shop.id}/products`)}
                >
                  View Products
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShopList;
