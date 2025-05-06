import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/register', form);
    navigate('/login');
  };

  const containerStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #667eea, #764ba2)',
    fontFamily: 'Arial, sans-serif'
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    width: '300px'
  };

  const inputStyle = {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px'
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#667eea',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  };

  return (
    <div style={containerStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={titleStyle}>Register</h2>
        <input
          style={inputStyle}
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <select style={inputStyle} name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button style={buttonStyle} type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
