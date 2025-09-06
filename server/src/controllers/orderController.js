const prisma = require('../config/db');

// @desc    Create a new order from the user's cart
// @route   POST /api/orders/checkout
const createOrderFromCart = async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Get all items in the user's cart
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true }, // Include product details to get the price
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty' });
    }

    // 2. Calculate the total amount
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    // 3. Use a transaction to ensure all database operations succeed or none do
    const newOrder = await prisma.$transaction(async (tx) => {
      // Create the main Order record
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
        },
      });

      // Create an OrderItem for each item that was in the cart
      await tx.orderItem.createMany({
        data: cartItems.map((item) => ({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: item.product.price, // Store the price at the time of purchase
        })),
      });

      // Clear the user's shopping cart
      await tx.cartItem.deleteMany({
        where: { userId },
      });

      return order;
    });

    // 4. Fetch the full order details to return to the user
    const fullOrderDetails = await prisma.order.findUnique({
      where: { id: newOrder.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
    });

    res.status(201).json(fullOrderDetails);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong during checkout', error });
  }
};

// @desc    Get the logged-in user's order history
// @route   GET /api/orders
const getOrderHistory = async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }, // Show most recent orders first
      include: {
        items: {
          include: {
            product: true, // Include product details for each item in the order
          },
        },
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

module.exports = {
  createOrderFromCart,
  getOrderHistory,
};

