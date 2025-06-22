const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const adminRoutes = require('./routes/admin'); 
const clothingRoutes = require('./routes/clothing');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));


// Basic Route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Routes
app.use('/api', clothingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', cartRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});