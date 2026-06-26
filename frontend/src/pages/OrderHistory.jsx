import { useEffect, useState } from "react";
import API from "../services/api";

function OrderHistory() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        const userId = 1;

        const res = await API.get(`/cart/history/${userId}/`);

        setOrders(res.data);

    };

    return (

        <div>

            <h1>Order History</h1>

            {

                orders.map(order => (

                    <div
                        key={order.id}
                        style={{
                            border:"1px solid gray",
                            padding:"10px",
                            marginBottom:"10px"
                        }}
                    >

                        <h3>Order #{order.id}</h3>

                        <p>Total : ₹{order.total_amount}</p>

                        <p>Status : {order.status}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default OrderHistory;