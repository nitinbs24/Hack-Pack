// src/controllers/productController.js
const prisma = require('../config/db');

// @desc    Fetch all products
// @route   GET /api/products
const getProducts = async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
};

// @desc    Fetch single product
// @route   GET /api/products/:id
const getProductById = async (req, res) => {
    const product = await prisma.product.findUnique({ where: { id: parseInt(req.params.id) } });
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// @desc    Create a product
// @route   POST /api/products
const createProduct = async (req, res) => {
    const { title, description, price, category, imageUrl } = req.body;
    const product = await prisma.product.create({
        data: {
            title,
            description,
            price: parseFloat(price),
            category,
            imageUrl,
            sellerId: req.user.id,
        },
    });
    res.status(201).json(product);
};

// @desc    Update a product
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: parseInt(req.params.id) } });

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Check if user is the owner
  if (product.sellerId !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });

  res.json(updatedProduct);
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: parseInt(req.params.id) } });

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  if (product.sellerId !== req.user.id) {
    return res.status(401).json({ message: 'User not authorized' });
  }

  await prisma.product.delete({ where: { id: parseInt(req.params.id) } });

  res.json({ message: 'Product removed' });
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};