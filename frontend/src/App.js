import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductPage from "./ProductPage";
import Admin from "./Admin";
import AddProduct from "./AddProduct";
import Contact from "./Contact";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      {/* 🧭 Navigation Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <h1 className="shop-name">🛍️ Buyzaar</h1>
        </div>

        {/* 🔍 Search Bar */}
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link home-link">🏠 Home</Link>
          <Link to="/admin" className="nav-link">📋 Orders</Link>
          <Link to="/admin/add-product" className="nav-link add-product-link">➕ Add Product</Link>
          <Link to="/contact" className="nav-link">📞 Contact</Link>
        </div>
      </nav>

      {/* 🔀 Routes */}
      <Routes>
        <Route path="/" element={<ProductPage searchQuery={searchQuery} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* 🌍 Global Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Buyzaar. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </Router>
  );
}

export default App;
