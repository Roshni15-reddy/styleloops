import React, { useState, useEffect } from 'react';
import API from '../api';

const AdminDashboard = () => {
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    const res = await API.get('/products');
    setProducts(res.data);
    const fb = await API.get('/feedbacks');
    setFeedbacks(fb.data);
    const ord = await API.get('/orders');
    setOrders(ord.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (image) data.append('image', image);

    if (editingId) {
      await API.put(`/products/${editingId}`, data);
    } else {
      await API.post('/products', data);
    }

    setForm({});
    setImage(null);
    setEditingId(null);
    fetchData();
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    fetchData();
  };

  const startEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      takenDate: new Date(product.takenDate).toISOString().slice(0, 16),
      returnDate: new Date(product.returnDate).toISOString().slice(0, 16),
    });
    setEditingId(product._id);
    setImage(null);
  };

  const handleOrderAction = async (orderId, action) => {
    await API.put(`/orders/${orderId}`, { status: action });
    fetchData();
  };

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  };

  const formStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    maxWidth: '500px',
    margin: 'auto',
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '100%',
    fontSize: '14px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  const editButtonStyle = {
    backgroundColor: '#ffc107',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '5px',
    marginRight: '10px',
    cursor: 'pointer',
  };

  const deleteButtonStyle = {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const productCardStyle = {
    border: '1px solid #ddd',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
  };

  const productImageStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginRight: '15px',
  };

  const feedbackStyle = {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const orderCardStyle = {
    border: '1px solid #ddd',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

  return (
    <div style={containerStyle}>
      <h2>Admin Dashboard</h2>

      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name || ''}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category || ''}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price || ''}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="takenDate"
          type="datetime-local"
          value={form.takenDate || ''}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="returnDate"
          type="datetime-local"
          value={form.returnDate || ''}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={inputStyle}
        />
        <button style={buttonStyle} type="submit">
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      <h3>Posted Products</h3>
      {products.map((p) => (
        <div key={p._id} style={productCardStyle}>
          <img
            src={`http://localhost:5000/uploads/${p.image}`}
            alt={p.name}
            style={productImageStyle}
          />
          <div>
            <p><strong>{p.name}</strong> - {p.category} - ₹{p.price}</p>
            <p>🟢 <strong>Available Between:</strong> {formatDate(p.takenDate)} – {formatDate(p.returnDate)}</p>
            <button style={editButtonStyle} onClick={() => startEdit(p)}>
              Edit
            </button>
            <button style={deleteButtonStyle} onClick={() => deleteProduct(p._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}

      <h3>User Orders (Dress Selection)</h3>
      {orders.map((order) => (
        <div key={order._id} style={orderCardStyle}>
          <p><strong>{order.name}</strong> (Product: {order.productName})</p>
          <p>Email: {order.email}</p>
          <p>Requested for: {new Date(order.requestedDate).toLocaleString()}</p>
          <p>Status: {order.status}</p>
          <button
            style={buttonStyle}
            onClick={() => handleOrderAction(order._id, 'Approved')}
          >
            Approve
          </button>
          <button
            style={buttonStyle}
            onClick={() => handleOrderAction(order._id, 'Rejected')}
          >
            Reject
          </button>
        </div>
      ))}

      <h3>User Feedback</h3>
      {feedbacks.map((fb) => (
        <div key={fb._id} style={feedbackStyle}>
          <p><strong>{fb.userId?.name}:</strong> {fb.feedbackText}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
