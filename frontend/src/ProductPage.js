import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductPage.css"; // ✅ Import external CSS

function ProductPage() {
  const [products, setProducts] = useState([]);

  // 🟢 Fetch products from backend when page loads
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // 🟢 Handle placing an order
  const handleOrder = async (product) => {
    const customerName = prompt("Enter your name:");
    const phone = prompt("Enter your phone:");
    const address = prompt("Enter your address:");

    if (!customerName || !phone || !address) {
      alert("⚠️ Please fill all details before placing an order!");
      return;
    }

    const order = {
      customerName,
      phone,
      address,
      productId: product._id,
      quantity: 1,
    };

    try {
      await axios.post("http://localhost:5000/api/orders", order);
      alert("✅ Order placed successfully!");
    } catch (error) {
      alert("❌ Failed to place order. Please try again.");
      console.error("Order Error:", error);
    }
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
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-category">{product.category}</p>
              <p className="product-price">Rs : {product.price}</p>
              <button
                className="order-btn"
                onClick={() => handleOrder(product)}
              >
                Place Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
