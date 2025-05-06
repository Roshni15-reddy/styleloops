import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import HomePage from './components/HomePage'; // 🆕 Home with slider and products

const App = () => {
  const navbarStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#000',
    zIndex: 1000
  };

  const navLeftStyle = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  };

  const navRightStyle = {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  };

  const navButton = {
    background: '#fff',
    color: '#000',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none'
  };

  return (
    <Router>
      {/* Landing Page with Full Background Image */}
      <Routes>
        <Route path="/" element={
          <div style={styles.landingPage}>
            <div style={styles.landingContent}>
              <h1 style={styles.landingTitle}>STYLE LOOPS</h1>
              <Link to="/home">
                <button style={styles.landingButton}>Go to Homepage</button>
              </Link>
            </div>
          </div>
        } />

        <Route path="*" element={
          <>
            {/* Shared Navbar */}
            <div style={navbarStyle}>
              <div style={navLeftStyle}>
                <Link to="/home" style={navButton}>Home</Link>
                <Link to="/about" style={navButton}>About</Link>
                <Link to="/service" style={navButton}>Services</Link>
                <Link to="/contact" style={navButton}>Contact</Link>
              </div>
              <div style={navRightStyle}>
                <Link to="/register" style={navButton}>Register</Link>
                <Link to="/login" style={navButton}>Login</Link>
              </div>
            </div>

            {/* Page Routes */}
            <div style={{ paddingTop: '70px' }}>
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/service" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/user" element={<UserDashboard />} />
              </Routes>
            </div>
          </>
        } />
      </Routes>
    </Router>
  );
};

// Custom Styles
const styles = {
  landingPage: {
    backgroundImage: 'url("/m1.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // This ensures the background image covers the entire screen height
    width: '100%', // Ensure it covers full width
    color: '#fff',
    position: 'relative',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  landingContent: {
    textAlign: 'center',
  },
  landingTitle: {
    fontSize: '3rem',
    marginBottom: '30px',
    textShadow: '2px 2px 5px #000',
    color: '#fff',
  },
  landingButton: {
    background: '#000',
    color: '#fff',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default App;
