import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar";

import OwnerDashboard from "./pages/OwnerDashboard";
import MyShop from "./pages/MyShop";
import Inventory from "./pages/Inventory";
import Analytics from "./pages/Analytics";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import CreateShop from "./pages/CreateShop";
import CreateProduct from "./pages/CreateProduct";
import ProductList from "./pages/ProductList";
import ShopList from "./pages/ShopList";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnerProducts from "./pages/OwnerProducts";

import OwnerOrders from "./pages/OwnerOrders";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Customer */}

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
          path="/shops/:shopId/products"
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

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["customer", "owner"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Shop Owner */}

        <Route
          path="/dashboard"
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
          path="/create-product"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <CreateProduct />
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
          path="/my-shop"
          element={
            <ProtectedRoute allowedRoles={["owner"]}>
              <MyShop />
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
