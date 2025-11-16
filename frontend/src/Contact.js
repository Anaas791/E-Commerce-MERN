// 📁 src/Contact.js
import React, { useState } from "react";
import "./Contact.css";
import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) {
    setStatus("⚠️ Please fill in all fields.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      setStatus("✅ Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("❌ Failed to send message.");
    }
  } catch (error) {
    console.error(error);
    setStatus("❌ Server error. Try again.");
  }
};


  return (
    <div className="contact-container">
      <h1>📞 Contact Buyzaar</h1>
      <p className="contact-intro">
        Have questions or need help? We’re here to assist you 24/7.
      </p>

      <div className="contact-form-wrapper">
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="contact-btn">
            ✉️ Send Message
          </button>
        </form>

        {status && <p className="contact-status">{status}</p>}
      </div>

      {/* 🧭 Contact Info + Social Links */}
      <div className="contact-info">
        <h3>📍 Our Store</h3>
        <p>Buyzaar Pvt Ltd</p>
        <p>Pannawa, Kobeigane, Sri Lanka</p>
        <p>📞 +94 77 980 8684</p>
        <p>📧 buyzaar@gmail.com</p>

        {/* 🌐 Social Links */}
        <div className="social-icons">
          <a
            href="https://wa.me/94779808684"
            target="_blank"
            rel="noreferrer"
            className="social-link whatsapp"
          >
            <FaWhatsapp />
          </a>

          <a
            href="https://www.facebook.com/luxuryshopping"
            target="_blank"
            rel="noreferrer"
            className="social-link facebook"
          >
            <FaFacebook />
          </a>

          <a
            href="https://www.instagram.com/luxuryshopping"
            target="_blank"
            rel="noreferrer"
            className="social-link instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.google.com/maps/place/Colombo,+Sri+Lanka"
            target="_blank"
            rel="noreferrer"
            className="social-link location"
          >
            <FaMapMarkerAlt />
          </a>
        </div>
      </div>

      {/* 🗺️ Google Map Embed */}
      <div className="map-container">
        <iframe
          title="Buyzaar Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4055751.121301841!2d79.861243!3d6.9270786!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcd4d115a5b4a5%3A0x1d02cd738c1dc0ea!2sPannawa%20Town!5e0!3m2!1sen!2slk!4v1763296719947!5m2!1sen!2slk"
          width="100%"
          height="300"
          style={{ border: "none", borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      
    </div>
  );
}

export default Contact;

