// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// --- IMPORT YOUR ROUTE FILES ---
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes'); 


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the EcoFinds API!" });
});

// --- USE THE ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes); // <-- MAKE SURE THIS LINE IS HERE

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

