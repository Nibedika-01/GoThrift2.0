const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/Order');
const { authMiddleware, adminMiddleware, userMiddleware } = require('./auth');


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

// GET: Fetch orders by user ID
router.get('/orders/user/:userId', userMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Param userId:", userId);
    console.log("Req.userId:", req.userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId");
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (req.userId.toString() !== userId.toString()){
      console.log("Unauthorized access");
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const orders = await Order.find({ userId })
      .populate('items.product')
      .sort({ createdAt: -1 });

    console.log("Orders found:", orders);
    res.json(orders);
  } catch (error) {
    console.error('Catch error:', error.message, error.stack);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});



router.post('/orders', userMiddleware, async (req, res) => {
  try {
    const { sessionId, shippingInfo, items, paymentMethod, status } = req.body;

    const newOrder = new Order({
      userId: req.userId,
      sessionId,
      shippingInfo,
      items,
      paymentMethod,
      status: status,
      createdAt: new Date()
    });
    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: error.message });
  }
})

router.delete('/orders/:orderId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const order = await Order.findOneAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/orders/:orderId', async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['Pending', 'Shipped', 'Delivered'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
