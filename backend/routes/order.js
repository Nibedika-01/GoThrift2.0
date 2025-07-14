const express = require('express');
const router = express.Router();
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

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (req.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized to access this user\'s orders' });
    }
    const orders = await Order.find({ userId })
      .populate('items.product')
      .sort({ createdAt: -1 });

    res.json(orders);
    console.log("orders:", orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
});


router.post('/orders', authMiddleware, async(req, res) => {
  try{
    const { sessionId, shippingInfo, items, paymentMethod, status } = req.body;

    const newOrder = new Order({
      sessionId,
      shippingInfo,
      items,
      paymentMethod,
      status: status,
      createdAt: new Date()
    });
    await newOrder.save();
    
    res.status(201).json({message: 'Order placed successfully', order: newOrder});

  } catch(error){
    console.error('Error creating order:', error);
    res.status(500).json({message: error.message});
  }
})

router.delete('/orders/:orderId',authMiddleware, adminMiddleware, async (req, res) => {
  try{
    const order = await Order.findOneAndDelete(req.params.orderId);
    if(!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  }catch (err) {
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
