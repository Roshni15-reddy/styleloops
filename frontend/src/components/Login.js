import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('/login', form);
    localStorage.setItem('token', res.data.token);
    res.data.role === 'admin' ? navigate('/admin') : navigate('/user');
  };

  const containerStyle = {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to right, #f857a6, #ff5858)',
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
    backgroundColor: '#f857a6',
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
        <h2 style={titleStyle}>Login</h2>
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
        <button style={buttonStyle} type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
