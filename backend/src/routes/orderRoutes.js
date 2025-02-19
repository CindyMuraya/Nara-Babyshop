const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Order = require("../models/Order");
const router = express.Router();

// Create a new order
router.post("/orders", authMiddleware, async (req, res) => {
  try {
    const { products, totalPrice } = req.body;
    const order = new Order({
      user: req.user.userId,
      products,
      totalPrice,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all orders for an authenticated user
router.get("/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId }).populate(
      "products.product"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get a specific order by ID
router.get("/orders/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("products.product");
    if (!order) return res.status(404).json({ msg: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Update order status (Admin only)
router.put("/orders/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;