const Product = require('../models/Product');
const mongoose = require('mongoose');

exports.getProducts = async (req, res) => {
  try {
    const { nombre, disponible } = req.query;
    let filter = { deleted: false };
    if (nombre) filter.name = { $regex: nombre, $options: 'i' };
    if (disponible !== undefined) filter.available = disponible === 'true';
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductsById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, deleted: false });
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, disponible, categoria } = req.body;
    const imagen = req.file ? req.file.buffer.toString('base64') : undefined;
    const product = new Product({ 
      name: nombre, 
      description: descripcion, 
      price: precio, 
      available: disponible,
      category: categoria || 'hamburguesas', // default category
      image: imagen 
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, disponible, categoria } = req.body;
    const update = { description: descripcion, price: precio, available: disponible };
    if (nombre) update.name = nombre;
    if (categoria) update.category = categoria;
    if (req.file) update.image = req.file.buffer.toString('base64');
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      update,
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null; // Para auditoría
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      { deleted: true, deletedBy: userId, deletedAt: new Date() },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado lógicamente', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};