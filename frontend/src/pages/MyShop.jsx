import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/MyShop.css";

function MyShop() {

    const [shop, setShop] = useState({
        shop_name: "",
        owner_name: "",
        address: "",
        phone: "",
        opening_time: "",
        closing_time: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadShop();
    }, []);

    const loadShop = async () => {

        try {

            const res = await API.get("/shops/my-shop/");

            setShop(res.data);
            

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        setShop({

            ...shop,

            [e.target.name]: e.target.value

        });

    };

    const updateShop = async () => {

        try {

            await API.put("/shops/update/", shop);

            alert("Shop Updated Successfully");

        }

        catch (err) {

            console.log(err);

            alert("Update Failed");

        }

    };

    if (loading)
        return <h2>Loading Shop...</h2>;

    return (

        <div className="shop-page">

            <div className="shop-card">

                <h1>My Tea Shop</h1>

                <input
                    name="shop_name"
                    value={shop.shop_name}
                    onChange={handleChange}
                    placeholder="Shop Name"
                />

                <input
                    name="owner_name"
                    value={shop.owner_name}
                    onChange={handleChange}
                    placeholder="Owner Name"
                />

                <textarea
                    name="address"
                    value={shop.address}
                    onChange={handleChange}
                    placeholder="Address"
                />

                <input
                    name="phone"
                    value={shop.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                />

                <div className="time-row">

                    <input
                        type="time"
                        name="opening_time"
                        value={shop.opening_time}
                        onChange={handleChange}
                    />

                    <input
                        type="time"
                        name="closing_time"
                        value={shop.closing_time}
                        onChange={handleChange}
                    />

                </div>

                <button onClick={updateShop}>

                    Save Changes

                </button>

            </div>

        </div>

    );

}

export default MyShop;