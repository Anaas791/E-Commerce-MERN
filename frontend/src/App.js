import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductPage from "./ProductPage";
import Admin from "./Admin";
import AddProduct from "./AddProduct";
import Contact from "./Contact";
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
            📋 Orders
          </Link>

          <Link to="/admin/add-product" className="nav-link add-product-link">
            ➕ Add Product
          </Link>

          <Link to="/contact" className="nav-link">
            📞 Contact
          </Link>

        </div>
      </nav>

      {/* 🔀 Routes */}
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>

      {/* 🌟 Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <h3>🛍️ Luxury Shopping</h3>
            <p>
              Discover premium products at affordable prices. Shop smart,
              shop in style — only at Luxury Shopping!
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/admin">Admin</Link></li>
              <li><Link to="/admin/add-product">Add Product</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <Link to="/contact"><h4>Contact Us</h4></Link>
            <p>📞 +94 779808684 </p>
            <p>📧 support@luxuryshopping.com</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Luxury Shopping. All rights reserved.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;

