import "../styles/Loader.css";
import logo from "../assets/logo.png";

function Loader() {

    return (

        <div className="loader-container">

            <div className="loader-card">

                <img
                    src={logo}
                    alt="logo"
                />

                <div className="tea-loader"></div>

                <h2>Brewing Fresh Tea...</h2>

                <p>Please wait while we prepare your experience ☕</p>

            </div>

        </div>

    );

}

export default Loader;