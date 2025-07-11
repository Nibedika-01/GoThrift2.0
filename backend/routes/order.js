const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');
const Order = require('../models/Order');


//checks the token to vlidate user, if valid then gets the userId from the token and moves forward
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId || decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

//POST: create order from cart
// order.js
router.post('/order', authMiddleware, async (req, res) => {
  try {
    const { sessionId, paymentMethod, shippingInfo } = req.body;
    if (!['cod', 'online'].includes(paymentMethod)) {
      return res.status(400).json({ message: 'Invalid payment method' });
    }
    const cart = await Cart.findOne({ sessionId }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ) + 150;

    const order = new Order({
      user: req.userId,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total,
      paymentMethod,
      shippingInfo,
      status: paymentMethod === 'cod' ? 'pending' : 'awaiting_payment',
    });

    await order.save();
    await Cart.findOneAndUpdate({ sessionId }, { $set: { items: [] } });
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/orders/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('Fetching orders for userID:', userId);
        const orders = await Order.find({ user: userId }).populate('items.product').sort({ createdAt: -1 });
        await new Promise(resolve => setTimeout(resolve, 500));
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({
            message: 'Internal sever error',
            error: error.message
        });
    }
})

module.exports = router;