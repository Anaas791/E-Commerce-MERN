import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductPage from "./ProductPage";
import Admin from "./Admin";

function App() {
  return (
    <Router>
      <nav
        style={{
          padding: "10px 20px",
          backgroundColor: "#f4f4f4",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "bold",
              marginRight: "20px",
            }}
          >
            🏠 Home
          </Link>
          <Link
            to="/admin"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            📋 Admin
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
