// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// --- 1. IMPORT YOUR ROUTE FILES ---
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the EcoFinds API!" });
});

// --- 2. USE THE ROUTES ---
// This tells Express that for any URL starting with /api/auth,
// it should look in the authRoutes file to find a match.
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
