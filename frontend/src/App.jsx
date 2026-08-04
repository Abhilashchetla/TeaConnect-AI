import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

// Customer
import CustomerDashboard from "./pages/CustomerDashboard";
import ProductList from "./pages/ProductList";
import ShopList from "./pages/ShopList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import Wishlist from "./pages/Wishlist";

// Common
import Profile from "./pages/Profile";

// Owner
import OwnerDashboard from "./pages/OwnerDashboard";
import MyShop from "./pages/MyShop";
import Inventory from "./pages/Inventory";
import Analytics from "./pages/Analytics";
import CreateShop from "./pages/CreateShop";
import CreateProduct from "./pages/CreateProduct";
import OwnerProducts from "./pages/OwnerProducts";
import OwnerOrders from "./pages/OwnerOrders";

// Delivery Agent
import DeliveryDashboard from "./pages/DeliveryDashboard";
import DeliveryOrders from "./pages/DeliveryOrders";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Footer
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ================================= */}
        {/* PUBLIC ROUTES */}
        {/* ================================= */}

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* ================================= */}
        {/* CUSTOMER ROUTES */}
        {/* ================================= */}

        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shops"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <ShopList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shops/:shopId/products"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <OrderHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* OWNER ROUTES */}
        {/* ================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-shop"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <CreateShop />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-shop"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <MyShop />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-product"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <CreateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/products"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <OwnerProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner-orders"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <OwnerOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <Inventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* DELIVERY AGENT ROUTES */}
        {/* ================================= */}

        <Route
          path="/delivery-dashboard"
          element={
            <ProtectedRoute allowedRoles={["delivery"]}>
              <DeliveryDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/delivery-orders"
          element={
            <ProtectedRoute allowedRoles={["delivery"]}>
              <DeliveryOrders />
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* COMMON PROFILE */}
        {/* ================================= */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["customer", "owner", "delivery"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
