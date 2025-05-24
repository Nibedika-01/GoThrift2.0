const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new item
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });

  try {
    const newItem = new Item({ name });
    await newItem.save();
    res.status(201).json(newItem);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
