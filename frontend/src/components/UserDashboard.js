import React, { useEffect, useState } from 'react';
import API from '../api';

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orderForm, setOrderForm] = useState({});
  const [scanner, setScanner] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [dressRequest, setDressRequest] = useState({
    productName: '',
    date: '',
    time: '',
    address: '',
  });

  const fetchData = async () => {
    const res = await API.get('/products');
    setProducts(res.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleOrder = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(orderForm).forEach(([k, v]) => data.append(k, v));
    if (scanner) data.append('scannerImage', scanner);
    await API.post('/orders', data);
    alert('Order placed!');
    setOrderForm({});
    setScanner(null);
  };

  const handleDressRequest = async (e) => {
    e.preventDefault();
    await API.post('/dress-requests', dressRequest);
    alert('Dress request sent!');
    setDressRequest({ productName: '', date: '', time: '', address: '' });
  };

  const submitFeedback = async () => {
    await API.post('/feedbacks', { feedbackText });
    alert('Feedback sent!');
    setFeedbackText('');
  };

  return (
    <div style={styles.dashboardContainer}>
      <h2 style={styles.title}>User Dashboard</h2>

      {/* Product Display */}
      <h3 style={styles.sectionTitle}>Available Products</h3>
      {products.map(p => (
        <div key={p._id} style={styles.productCard}>
          <img src={`http://localhost:5000/uploads/${p.image}`} alt={p.name} width="120" style={styles.productImage} />
          <p><strong>Name:</strong> {p.name}</p>
          <p><strong>Category:</strong> {p.category}</p>
          <p><strong>Price:</strong> ₹{p.price}</p>
        </div>
      ))}

      {/* Dress Request Form */}
      <h3 style={styles.sectionTitle}>Request Dress</h3>
      <form onSubmit={handleDressRequest} style={styles.orderForm}>
        <select
          name="productName"
          value={dressRequest.productName}
          onChange={(e) => setDressRequest({ ...dressRequest, productName: e.target.value })}
          style={styles.inputField}
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p._id} value={p.name}>{p.name}</option>
          ))}
        </select>
        <input
          name="date"
          type="date"
          value={dressRequest.date}
          onChange={(e) => setDressRequest({ ...dressRequest, date: e.target.value })}
          required
          style={styles.inputField}
        />
        <input
          name="time"
          type="time"
          value={dressRequest.time}
          onChange={(e) => setDressRequest({ ...dressRequest, time: e.target.value })}
          required
          style={styles.inputField}
        />
        <textarea
          name="address"
          placeholder="Enter delivery address"
          value={dressRequest.address}
          onChange={(e) => setDressRequest({ ...dressRequest, address: e.target.value })}
          style={styles.textarea}
          required
        />
        <button type="submit" style={styles.submitButton}>Submit Request</button>
      </form>

      {/* Feedback Section */}
      <h3 style={styles.sectionTitle}>Submit Feedback</h3>
      <textarea
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        style={styles.feedbackTextarea}
      />
      <button onClick={submitFeedback} style={styles.submitButton}>Send</button>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    margin: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2rem',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginTop: '20px',
    color: '#333',
  },
  productCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    margin: '10px',
    padding: '15px',
    display: 'inline-block',
    width: '200px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  productImage: {
    borderRadius: '8px',
  },
  orderForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  inputField: {
    margin: '10px 0',
    padding: '8px',
    width: '80%',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  textarea: {
    margin: '10px 0',
    padding: '8px',
    width: '80%',
    height: '80px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  submitButton: {
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: '#5cb85c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  feedbackTextarea: {
    width: '80%',
    height: '100px',
    padding: '8px',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  }
};

export default UserDashboard;
