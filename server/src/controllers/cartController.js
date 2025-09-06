const prisma = require('../config/db');

// @desc    Get user's shopping cart
// @route   GET /api/cart
const getCart = async (req, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: { product: true }, // Also fetch the product details
    });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// @desc    Add an item to the cart
// @route   POST /api/cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const existingCartItem = await prisma.cartItem.findFirst({
      where: { userId, productId },
    });

    if (existingCartItem) {
      // If item already in cart, update quantity
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
        include: { product: true },
      });
      res.json(updatedItem);
    } else {
      // If new item, create it
      const newItem = await prisma.cartItem.create({
        data: { userId, productId, quantity },
        include: { product: true },
      });
      res.status(201).json(newItem);
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

// @desc    Remove an item from the cart
// @route   DELETE /api/cart/:productId
const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    await prisma.cartItem.deleteMany({
        where: { userId, productId: parseInt(productId) }
    });
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
};

