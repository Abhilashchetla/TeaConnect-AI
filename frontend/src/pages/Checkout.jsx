import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Checkout() {

    const navigate = useNavigate();

    const placeOrder = async () => {

        const userId = 1;

        try {

            const res = await API.post(`/cart/place/${userId}/`);

            alert(res.data.message);

            navigate("/orders");

        } catch (err) {

            console.log(err);

            alert("Order Failed");

        }

    };

    return (

        <div>

            <h1>Checkout</h1>

            <button onClick={placeOrder}>
                Place Order
            </button>

        </div>

    );

}

export default Checkout;