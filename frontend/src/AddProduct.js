import React, { useState } from "react";
import axios from "axios";
import "./AddProduct.css";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  // 📸 Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // ✅ Handle submit with FormData
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("❌ Please select an image before submitting!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ " + res.data.message);

      // Clear fields after success
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage(null);

      // Reset file input visually
      document.getElementById("fileInput").value = "";
    } catch (err) {
      setMessage("❌ Failed to add product: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Price (Rs)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit">Add Product</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddProduct;
