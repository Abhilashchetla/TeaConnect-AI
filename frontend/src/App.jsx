import {
 BrowserRouter,
 Routes,
 Route
}
from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import CreateShop from "./pages/CreateShop";
import CreateProduct from "./pages/CreateProduct";
import ProductList from "./pages/ProductList";
import ShopList from "./pages/ShopList";

function App() {

 return (

  <BrowserRouter>

   <Navbar />

   <Routes>

    <Route
     path="/"
     element={<Login />}
    />

    <Route
     path="/register"
     element={<Register />}
    />

    <Route
     path="/dashboard"
     element={<Dashboard />}
    />
    <Route
    path="/create-shop"
    element={<CreateShop />}
    />

    <Route
    path="/create-product"
    element={<CreateProduct />}
    />

    <Route
    path="/products"
    element={<ProductList />}
    />

    <Route
    path="/shops"
    element={<ShopList />}
    />

   </Routes>

  </BrowserRouter>
 );
}

export default App;