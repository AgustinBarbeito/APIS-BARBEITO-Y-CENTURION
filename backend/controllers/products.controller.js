const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, image, available } = req.body;
    const product = new Product({ name, description, price, image, available });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id, name, description, price, image, available } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image, available },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Plato no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ error: 'Plato no encontrado' });
    res.json({ message: 'Plato eliminado', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 