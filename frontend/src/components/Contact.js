import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Contact Us</h2>
        <p style={styles.content}>
          If you have any questions or inquiries, feel free to reach out to us using the form below:
        </p>

        <form onSubmit={handleSubmit} style={styles.contactForm}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.inputField}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.inputField}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            style={styles.textareaField}
          />
          <button type="submit" style={styles.submitButton}>Send Message</button>
        </form>

        <div style={styles.contactInfo}>
          <p style={styles.info}>Address: 123 Fashion Street, City, Country</p>
          <p style={styles.info}>Phone: +1234567890</p>
          <p style={styles.info}>Email: contact@rentalclothing.com</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundImage: "url('/image.png')", // Update path if needed
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    color: "#fff",
  },
  formWrapper: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "30px",
    borderRadius: "10px",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  },
  title: {
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "10px",
  },
  content: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "20px",
    textAlign: "center",
  },
  contactForm: {
    display: "flex",
    flexDirection: "column",
  },
  inputField: {
    padding: "12px",
    marginBottom: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
  },
  textareaField: {
    padding: "12px",
    marginBottom: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
    height: "150px",
    resize: "none",
  },
  submitButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  contactInfo: {
    marginTop: "20px",
    textAlign: "center",
  },
  info: {
    fontSize: "16px",
  },
};

export default Contact;
