import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductPage from "./ProductPage";
import Admin from "./Admin";
import AddProduct from "./AddProduct";
import "./App.css"; // 👈 External CSS

function App() {
  return (
    <Router>
      {/* 🧭 Navigation Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <h1 className="shop-name">🛍️ Luxury Shopping</h1> {/* 👈 Added shop name */}
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link home-link">
            🏠 Home
          </Link>

          <Link to="/admin" className="nav-link">
            📋 Admin
          </Link>

          <Link to="/admin/add-product" className="nav-link add-product-link">
            ➕ Add Product
          </Link>
        </div>
      </nav>

      {/* 🔀 Routes */}
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;

