const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "COMPLETE", "FAILED", "REFUNDED"],
        default: "PENDING"
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { Transaction };
