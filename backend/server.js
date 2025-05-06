const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rentalClothingApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Multer Setup for file upload (Scanner images)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.fieldname + ext);
  }
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowedTypes.test(file.mimetype);
  if (isValidExt && isValidMime) cb(null, true);
  else cb(new Error('Only .jpg, .jpeg, and .png files are allowed'));
};
const upload = multer({ storage, fileFilter });

// Schemas for MongoDB Models
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});
const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
  image: String,
  category: String,
  name: String,
  price: Number,
  takenDate: Date,
  returnDate: Date
});
const Product = mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: String,
  address: String,
  productName: String,
  amount: Number,
  scannerImage: String
});
const Order = mongoose.model('Order', orderSchema);

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  feedbackText: String,
  createdAt: { type: Date, default: Date.now }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Auth Middleware
const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Access forbidden' });
      }
      req.user = decoded;
      next();
    } catch {
      res.status(400).json({ error: 'Invalid token' });
    }
  };
};

// Auth Routes
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed', details: err });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'secretkey');
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Product Routes
app.post('/api/products', authMiddleware(['admin']), upload.single('image'), async (req, res) => {
  try {
    const { category, name, price, takenDate, returnDate } = req.body;
    const image = req.file ? req.file.filename : '';
    const product = new Product({ image, category, name, price, takenDate, returnDate });
    await product.save();
    res.json({ message: 'Product added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error adding product' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.put('/api/products/:id', authMiddleware(['admin']), upload.single('image'), async (req, res) => {
  try {
    const { category, name, price, takenDate, returnDate } = req.body;
    const updateData = { category, name, price, takenDate, returnDate };
    if (req.file) updateData.image = req.file.filename;
    await Product.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: 'Product updated successfully' });
  } catch {
    res.status(500).json({ error: 'Error updating product' });
  }
});

app.delete('/api/products/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Error deleting product' });
  }
});

// Order Routes
app.post('/api/orders', upload.single('scannerImage'), async (req, res) => {
  try {
    const { name, email, contact, address, productName, amount } = req.body;
    const scannerImage = req.file ? req.file.filename : '';
    const order = new Order({ name, email, contact, address, productName, amount, scannerImage });
    await order.save();
    res.json({ message: 'Order placed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order', details: err.message });
  }
});

app.get('/api/orders', authMiddleware(['admin']), async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.put('/api/orders/:id', authMiddleware(['admin']), upload.single('scannerImage'), async (req, res) => {
  try {
    const { name, email, contact, address, productName, amount } = req.body;
    const updateData = { name, email, contact, address, productName, amount };
    if (req.file) updateData.scannerImage = req.file.filename;
    await Order.findByIdAndUpdate(req.params.id, updateData);
    res.json({ message: 'Order updated successfully' });
  } catch {
    res.status(500).json({ error: 'Error updating order' });
  }
});

app.delete('/api/orders/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted successfully' });
  } catch {
    res.status(500).json({ error: 'Error deleting order' });
  }
});

// Feedback Routes
app.post('/api/feedbacks', authMiddleware(['user']), async (req, res) => {
  try {
    const { feedbackText } = req.body;
    const feedback = new Feedback({ userId: req.user.userId, feedbackText });
    await feedback.save();
    res.json({ message: 'Feedback submitted' });
  } catch {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

app.get('/api/feedbacks', authMiddleware(['admin']), async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('userId', 'name email');
    res.json(feedbacks);
  } catch {
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
