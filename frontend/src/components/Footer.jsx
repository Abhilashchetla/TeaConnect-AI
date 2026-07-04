import "../styles/Footer.css";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand">

          <img
            src={logo}
            alt="TeaConnect AI"
          />

          <h2>TeaConnect AI</h2>

          <p>
            Fresh Tea. Fresh Experience.
          </p>

        </div>

        <div>

          <h3>Explore</h3>

          <a href="/">Home</a>

          <a href="/shops">Tea Shops</a>

          <a href="/products">Products</a>

          <a href="/cart">Cart</a>

        </div>

        <div>

          <h3>Support</h3>

          <a href="/">Help Center</a>

          <a href="/">Privacy Policy</a>

          <a href="/">Terms & Conditions</a>

        </div>

        <div>

          <h3>Contact</h3>

          <p>📧 support@teaconnect.ai</p>

          <p>📞 +91 80747 14029</p>

          <p>📍 Hyderabad, India</p>

        </div>

      </div>

      <hr />

      <div className="footer-bottom">

        © {new Date().getFullYear()} TeaConnect AI.

        Crafted with ❤️ for Tea Lovers.

      </div>

    </footer>
  );
}

export default Footer;