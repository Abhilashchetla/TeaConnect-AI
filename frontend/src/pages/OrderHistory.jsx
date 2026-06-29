import { useEffect, useState } from "react";
import API from "../services/api";

function OrderHistory() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            setLoading(true);

            const userId = 1;

            const res = await API.get(`/cart/history/${userId}/`);

            setOrders(res.data);

        } catch (err) {

            console.error(err);
            alert("Unable to load orders");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return <h2>Loading Orders...</h2>;
    }

    return (

        <div>

            <h1>Order History</h1>

            {
                orders.length === 0 ? (

                    <h3>No Orders Found</h3>

                ) : (

                    orders.map(order => (

                        <div
                            key={order.id}
                            style={{
                                border: "1px solid gray",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "8px"
                            }}
                        >

                            <h3>Order #{order.id}</h3>

                            <p>Total : ₹{order.total_amount}</p>

                            <p>Status : {order.status}</p>

                        </div>

                    ))

                )
            }

        </div>

    );

}

export default OrderHistory;