import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css"; // 👈 Import the CSS file

function Admin() {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from backend
  const fetchOrders = () => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🗑️ Delete order by ID
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      alert("✅ Order deleted successfully!");
      fetchOrders(); // refresh list
    } catch (err) {
      console.error("Error deleting order:", err);
      alert("❌ Failed to delete order!");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">📦 All Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet.</p>
      ) : (
        <div className="table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.customerName}</td>
                  <td>{order.phone}</td>
                  <td>{order.address}</td>
                  <td>{order.product?.name || "N/A"}</td>
                  <td>{order.quantity}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(order._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;
