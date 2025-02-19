const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Product = require("../models/Product");
const router = express.Router();

// Create a new product (Admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const product = new Product({ name, price, description, category, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Update a product (Admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, image },
      { new: true }
    );
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete a product (Admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;