import React from 'react';

const Services = () => {
  const containerStyle = {
    backgroundImage: "url('./images/image.png')", // Make sure this path is correct
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '50px',
  };

  const contentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '30px 40px',
    borderRadius: '12px',
    maxWidth: '500px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  };

  const headingStyle = {
    marginBottom: '20px',
    fontSize: '28px',
    color: '#222',
  };

  const paragraphStyle = {
    fontSize: '16px',
    color: '#444',
    lineHeight: '1.6',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h2 style={headingStyle}>Our Services</h2>
        <p style={paragraphStyle}><strong>Clothing Rental</strong><br />
          Rent high-quality clothes for special events, everyday wear, and more.</p>
        <p style={paragraphStyle}><strong>Tailoring Services</strong><br />
          Get your rented clothes tailored to fit you perfectly.</p>
        <p style={paragraphStyle}><strong>Online Consultation</strong><br />
          Need help choosing the right outfit? Book an online consultation with our fashion experts.</p>
      </div>
    </div>
  );
};

export default Services;
