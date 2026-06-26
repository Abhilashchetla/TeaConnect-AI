import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import CreateShop from "./pages/CreateShop";
import CreateProduct from "./pages/CreateProduct";
import ProductList from "./pages/ProductList";
import ShopList from "./pages/ShopList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import CustomerDashboard from "./pages/CustomerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-shop" element={<CreateShop />} />

        <Route path="/create-product" element={<CreateProduct />} />

        <Route path="/products" element={<ProductList />} />

        <Route path="/shops" element={<ShopList />} />
        <Route path="/customer" element={<CustomerDashboard />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
