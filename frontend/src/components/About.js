import React from 'react';

const About = () => {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentBox}>
        <h2 style={styles.title}>About Us</h2>
        <p style={styles.content}>
          Welcome to our Style Loops Service. We provide high-quality clothing rentals for every occasion.
          Our mission is to make fashion more affordable and accessible for everyone.
        </p>
        <p style={styles.content}>
          Our team is dedicated to offering top-notch service and ensuring that you have an excellent experience with us.
        </p>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundImage: "url('./images/image.png')", // adjust path if needed
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    display: "flex",
    justifyContent: "flex-end", // push content to right
    alignItems: "center", // center vertically
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  contentBox: {
    backgroundColor: "rgba(255, 255, 255, 0.85)", // light background for readability
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "600px",
    color: "#333",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  content: {
    fontSize: "16px",
    lineHeight: "1.6",
  },
};

export default About;
