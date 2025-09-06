const express = require('express');
const router = express.Router();
const { createOrderFromCart, getOrderHistory } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// Define the API routes
router.route('/')
    .get(protect, getOrderHistory);

router.route('/checkout')
    .post(protect, createOrderFromCart);

// This is the most important line - it exports the router itself.
module.exports = router;

