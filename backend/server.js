const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const adminRoutes = require('./routes/admin');
const clothingRoutes = require('./routes/clothing');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const searchRoutes = require('./routes/search');


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.options('*', cors());

// Routes
app.use('/api', clothingRoutes);
app.use('/api', cartRoutes);
app.use('/api', userRoutes);
app.use('/api', orderRoutes);
app.use('/api', searchRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Payment routes - temporarily inline until you fix the import issue
const { EsewaPaymentGateway, EsewaCheckStatus } = require('esewajs');
const { Transaction } = require('./models/Transaction'); // You'll need to convert this to CommonJS too

// eSewa Payment Routes
app.post("/initiate-payment", async (req, res) => {
    const { amount, productId } = req.body;
    console.log('Received request:', { amount, productId });
    
    try {
        const reqPayment = await EsewaPaymentGateway(
            amount, 0, 0, 0, productId, 
            process.env.MERCHANT_ID, 
            process.env.SECRET, 
            process.env.SUCCESS_URL, 
            process.env.FAILURE_URL, 
            process.env.ESEWAPAYMENT_URL, 
            undefined, 
            undefined
        );
        
        console.log('Esewa response:', reqPayment);
        
        if (!reqPayment) {
            return res.status(400).json({ error: "Error sending data" });
        }
        
        if (reqPayment.status === 200) {
            const transaction = new Transaction({
                product_id: productId,
                amount: amount,
            });
            await transaction.save();
            console.log("Transaction saved:", transaction);
            
            return res.json({
                url: reqPayment.request.res.responseUrl,
            });
        }
    } catch (error) {
        console.error("Error in EsewaInitiatePayment:", error);
        return res.status(400).json({ error: "Error sending data" });
    }
});

app.post("/payment-status", async (req, res) => {
    const { product_id } = req.body;
    
    try {
        const transaction = await Transaction.findOne({ product_id });
        if (!transaction) {
            return res.status(400).json({ message: "Transaction not found" });
        }

        const paymentStatusCheck = await EsewaCheckStatus(
            transaction.amount, 
            transaction.product_id, 
            process.env.MERCHANT_ID, 
            process.env.ESEWAPAYMENT_STATUS_CHECK_URL
        );

        if (paymentStatusCheck.status === 200) {
            transaction.status = paymentStatusCheck.data.status;
            await transaction.save();
            return res.status(200).json({ 
                message: "Transaction status updated successfully" 
            });
        }
    } catch (error) {
        console.error("Error updating transaction status:", error);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});