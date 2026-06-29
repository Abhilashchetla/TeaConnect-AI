import React, { useEffect, useState } from "react";
import API from "../services/api";

function ShopList() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      setLoading(true);

      const res = await API.get("/shops/list/");

      setShops(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Shops...</h2>;
  }

  return (
    <div>
      <h2>Shops</h2>

      {shops.map((shop) => (
        <div key={shop.id}>
          <h4>{shop.shop_name}</h4>
          <p>{shop.city}</p>
        </div>
      ))}
    </div>
  );
}

export default ShopList;