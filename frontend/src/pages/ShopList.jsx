import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/ShopList.css";
import { useNavigate } from "react-router-dom";

function ShopList() {

  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadNearbyShops();
  }, []);

  // Load all shops (fallback)
  const loadShops = async () => {
    try {

      const response = await API.get("/shops/list/");

      setShops(response.data);

    } catch (error) {

      console.log("Shop Error:", error.response?.data);

    } finally {

      setLoading(false);

    }
  };

  // Load nearby shops
  const loadNearbyShops = () => {

    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      loadShops();
      return;
    }

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        try {

          const response = await API.post(
            "/shops/nearby/",
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
          );

          console.log(response.data);

          setShops(response.data);

        } catch (error) {

          console.log(error.response?.data);

          loadShops();

        } finally {

          setLoading(false);

        }

      },

      () => {

        alert("Location permission denied. Showing all tea shops.");

        loadShops();

      }

    );

  };

  if (loading) {
    return (
      <div className="shops-loading">
        Loading Nearby Tea Shops...
      </div>
    );
  }

  return (

    <div className="shops-page">

      <div className="shops-header">

        <h1>Explore Nearby Tea Shops</h1>

        <p>
          Discover fresh tea shops around your current location.
        </p>

      </div>

      {shops.length === 0 ? (

        <div className="no-shops">

          <h2>No Tea Shops Found</h2>

          <p>No nearby tea shops are available.</p>

        </div>

      ) : (

        <div className="shops-grid">

          {shops.map((shop) => (

            <div className="shop-card" key={shop.id}>

              <div className="shop-icon">
                ☕
              </div>

              <div className="shop-information">

                <h2>{shop.shop_name}</h2>

                <p className="shop-location">
                  📍 {shop.city}
                </p>

                {shop.address && (
                  <p className="shop-address">
                    {shop.address}
                  </p>
                )}

                {shop.distance && (
                  <p className="shop-distance">
                    📏 {shop.distance} km away
                  </p>
                )}

                <div className="shop-rating">
                  ⭐⭐⭐⭐⭐
                  <span>
                    {shop.rating || "New Shop"}
                  </span>
                </div>

                <button
                  className="view-shop-button"
                  onClick={() =>
                    navigate(`/shops/${shop.id}/products`)
                  }
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