import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Wishlist.css";

function Wishlist() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const res = await API.get("/wishlist/user/1/");
    setItems(res.data);
  };

  const removeItem = async (id) => {

    await API.delete(`/wishlist/remove/${id}/`);

    loadWishlist();

  };

  return (

    <div className="wishlist-container">

      <h1>❤️ My Wishlist</h1>

      {

        items.length === 0 ?

        <h3>No products in wishlist.</h3>

        :

        items.map(item => (

          <div className="wishlist-card" key={item.id}>

            <h2>{item.tea_name}</h2>

            <p>Category : {item.category}</p>

            <h3>₹{item.price}</h3>

            <button
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>

          </div>

        ))

      }

    </div>

  );

}

export default Wishlist;