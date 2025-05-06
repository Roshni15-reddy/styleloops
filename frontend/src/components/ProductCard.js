import React from 'react';

const ProductCard = ({ product, onDelete }) => {
  return (
    <div style={styles.cardContainer}>
      <img
        src={`http://localhost:5000/${product.image}`}
        alt={product.name}
        width="100"
        style={styles.productImage}
      />
      <div>
        <h4>{product.name}</h4>
        <p>Category: {product.category}</p>
        <p>Price: ₹{product.price}</p>
        <p>Taken: {new Date(product.takenDate).toLocaleString()}</p>
        <p>Return: {new Date(product.returnDate).toLocaleString()}</p>
        {onDelete && (
          <button
            onClick={() => onDelete(product._id)}
            style={styles.deleteButton}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

// Internal CSS styles
const styles = {
  cardContainer: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  productImage: {
    borderRadius: "8px",
    marginRight: "15px",
  },
  deleteButton: {
    marginTop: "10px",
    background: "crimson",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default ProductCard;
