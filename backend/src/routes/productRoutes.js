router.post("/products", authMiddleware, async (req, res) => {
    try {
      const { name, price, description, category, image } = req.body;
      const product = new Product({ name, price, description, category, image });
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  });
  
  router.get("/products", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  });
  
  router.get("/products/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ msg: "Product not found" });
      res.json(product);
    } catch (error) {
      res.status(500).json({ msg: "Server error" });
    }
  });
  
    router.put("/products/:id", authMiddleware, async (req, res) => {
        try {
        const { name, price, description, category, image } = req.body;
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: "Product not found" });
    
        product.name = name;
        product.price = price;
        product.description = description;
        product.category = category;
        product.image = image;
    
        await product.save();
        res.json(product);
        } catch (error) {
        res.status(500).json({ msg: "Server error" });
        }
    });

module.exports = router;
