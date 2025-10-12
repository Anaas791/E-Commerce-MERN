import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductPage.css"; // ✅ External CSS

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    quantity: 1,
  });
  const [message, setMessage] = useState("");

  // 🟢 Fetch products from backend when page loads
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // 🧠 Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 Handle order submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.address) {
      setMessage("⚠️ Please fill all fields!");
      return;
    }

    const order = {
      ...formData,
      productId: selectedProduct._id,
    };

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

  // 🧾 Open order form
  const openOrderForm = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
    setMessage("");
  };

  // ❌ Close order form
  const closeForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  return (
    <div className="product-page">
      <h1 className="title">🛍️ Product List</h1>

      {products.length === 0 ? (
        <p className="loading">Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
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
