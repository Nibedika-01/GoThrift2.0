const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { authMiddleware, adminMiddleware } = require('./auth');

// GET: Fetch all orders (admin only)
router.get('/orders', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
