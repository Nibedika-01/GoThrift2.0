const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// POST: Add item to cart
router.post('/cart', async (req, res) => {
  try {
    const { sessionId, productId, quantity } = req.body;
    if (!sessionId || !productId || !quantity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      cart = new Cart({ sessionId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    cart.updatedAt = Date.now();
    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//to remove cart item from db
router.post('/cart/remove', async(req, res) => {
    try{
        const {sessionId, productId} = req.body;
        const cart = await Cart.findOne({ sessionId });
        if(!cart){
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        cart.updatedAt = Date.now();
        await cart.save();
        res.status(200).json({ message: 'Item removed from the cart',cart })
    } catch (error){
        res.status(500).json({ message: error.message })
    }
});

// GET: Fetch cart by sessionId
router.get('/cart/:sessionId', async (req, res) => {
  try {
    console.log('Requested sessionId:', req.params.sessionId);
    const { sessionId } = req.params;
    const cart = await Cart.findOne({ sessionId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;