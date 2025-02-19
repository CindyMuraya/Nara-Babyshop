router.delete("/products/:id", authMiddleware, async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: "Product not found" });

        await product.remove();
        res.json({ msg: "Product removed" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
},

    module.exports = router);
