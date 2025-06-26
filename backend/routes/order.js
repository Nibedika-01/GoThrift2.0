const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');
const Order = require('../models/Order');


//checks the token to vlidate user, if valid then gets the userId from the token and moves forward
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: 'No token provided' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch(error){
        res.status(401).json({ message: 'Invalid token' });
    }
}

//POST: create order from cart
router.post('/order', authMiddleware, async (req, res) => {
    try{
        const {sessionId, paymentMethod, shippingInfo} = req.body;
        const cart = await Cart.findOne({sessionId}).populate('items.product');
        if( !cart || cart.items.length === 0){
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
        await Cart.findOneAndUpdate({ sessionId }, { $set: {items: []}}); //clear cart
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch(error){
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;