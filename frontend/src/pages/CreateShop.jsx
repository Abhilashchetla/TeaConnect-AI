import React, { useState } from "react";
import API from "../services/api";
import "../styles/CreateShop.css";

function CreateShop() {

    const [shop, setShop] = useState({
        shop_name: "",
        address: "",
        city: "",
        state: "",
    });

    const handleChange = (e) => {

        setShop({
            ...shop,
            [e.target.name]: e.target.value
        });

    };

    const submitShop = async () => {

        try {

            const response = await API.post(
                "/shops/create/",
                shop
            );

            console.log(response.data);

            alert("🎉 Shop Created Successfully!");

            setShop({
                shop_name: "",
                address: "",
                city: "",
                state: "",
            });

        } catch (error) {

            console.log(error.response?.data);

            alert(
                error.response?.data?.error ||
                "Failed to create shop"
            );

        }

    };
    const getCurrentLocation = () => {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        (position) => {

            setShop((prev) => ({
                ...prev,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }));

            alert("Location captured successfully!");

        },

        () => {
            alert("Unable to get your location.");
        }

    );
};

    return (

        <div className="create-shop-page">

            <div className="create-shop-card">

                <div className="shop-icon">
                    🏪
                </div>

                <h2>Create Your Tea Shop</h2>

                <p>
                    Register your tea shop and start selling premium tea
                    products on TeaConnect AI.
                </p>

                <div className="shop-form">

                    <input
                        type="text"
                        name="shop_name"
                        placeholder="Tea Shop Name"
                        value={shop.shop_name}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Shop Address"
                        value={shop.address}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={shop.city}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={shop.state}
                        onChange={handleChange}
                    />
                    <button
    type="button"
    className="location-btn"
    onClick={getCurrentLocation}
>
    📍 Use Shop Current Location
</button>

                    <button
                        className="create-btn"
                        onClick={submitShop}
                    >
                        Create Shop
                    </button>

                </div>

            </div>

        </div>

    );
}

export default CreateShop;