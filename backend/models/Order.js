const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clothing',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    sessionId:{
        type: String,
        required: true,
    },
    shippingInfo:{
        firstName: String,
        lastName: String,
        email: String,
        address: String,
        city: String,
    },
    items: [orderItemSchema],
    paymentMethod: {
        type: String,
        enum: ['cod', 'online'], required: true
    }, 
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);