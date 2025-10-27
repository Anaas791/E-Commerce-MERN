import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductPage.css";

function ProductPage({ searchQuery }) {  // 👈 Receive searchQuery here
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    quantity: 1,
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.address) {
      setMessage("⚠️ Please fill all fields!");
      return;
    }

    const order = { ...formData, productId: selectedProduct._id };

    try {
      await axios.post("http://localhost:5000/api/orders", order);
      setMessage("✅ Order placed successfully!");
      setFormData({ customerName: "", phone: "", address: "", quantity: 1 });
      setShowForm(false);
    } catch (error) {
      console.error("Order Error:", error);
      setMessage("❌ Failed to place order. Please try again.");
    }
  };

  const openOrderForm = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
    setMessage("");
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  const categories = [
    "All",
    "Electronic",
    "Fashion",
    "Beauty",
    "Home & Kitchen",
    "Grocery",
    "Sports",
    "Baby Products",
    "Automotive",
    "Hardware",
  ];

  // 🔍 Filter by category first
  const categoryFiltered =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category &&
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  // 🔎 Then filter by search text
  const finalFilteredProducts = categoryFiltered.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-page">
      <h1 className="title">🛍️ Product List</h1>

      {/* 🏷️ Category Bar */}
      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {finalFilteredProducts.length === 0 ? (
        <p className="loading">No products found.</p>
      ) : (
        <div className="product-grid">
          {finalFilteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-category">{product.category}</p>
              <p className="product-price">Rs : {product.price}</p>
              <button
                className="order-btn"
                onClick={() => openOrderForm(product)}
              >
                Place Order
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🧾 Order Popup Form */}
      {showForm && selectedProduct && (
        <div className="order-popup">
          <div className="order-popup-content">
            <button className="close-btn" onClick={closeForm}>
              ✖
            </button>
            <h2>🛒 Place Order</h2>
            <h3>{selectedProduct.name}</h3>
            <p className="popup-price">Rs : {selectedProduct.price}</p>

            <form onSubmit={handleSubmit} className="order-form">
              <input
                type="text"
                name="customerName"
                placeholder="Your Name"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <textarea
                name="address"
                placeholder="Delivery Address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                required
              />
              <button type="submit" className="submit-btn">
                ✅ Confirm Order
              </button>
            </form>

            {message && <p className="order-message">{message}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
