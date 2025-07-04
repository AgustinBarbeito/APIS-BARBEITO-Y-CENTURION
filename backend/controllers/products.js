const Product = require('../models/Product');
const mongoose = require('mongoose');
const AuditService = require('../services/audit.service');

exports.getProducts = async (req, res) => {
  try {
    const { nombre, disponible, admin } = req.query;
    let filter = {};
    if (nombre) filter.name = { $regex: nombre, $options: 'i' };
    if (disponible !== undefined) filter.available = disponible === 'true';

    // Si no es admin, solo mostrar productos disponibles y no eliminados
    if (!admin || admin === 'false') {
      filter.deleted = false;
      filter.available = true;
    }

    const products = await Product.find(filter);

    // Si es admin, marcar los eliminados como no disponibles
    let modifiedProducts = products;
    if (admin && admin === 'true') {
      modifiedProducts = products.map(product => {
        if (product.deleted) {
          return {
            ...product.toObject(),
            available: false,
            deleted: true
          };
        }
        return product;
      });
    }

    res.json(modifiedProducts);
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
    
    // Registrar auditoría
    if (req.user) {
      await AuditService.logAction(
        req.user.id,
        'CREATE',
        'PRODUCT',
        product._id,
        product.name,
        `Producto creado: ${product.name} - $${product.price}`,
        req
      );
    }
    
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
    
    // Obtener el producto antes de actualizarlo para auditoría
    const oldProduct = await Product.findOne({ _id: req.params.id, deleted: false });
    
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      update,
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    
    // Registrar auditoría
    if (req.user) {
      const changes = [];
      if (oldProduct.name !== product.name) changes.push(`nombre: ${oldProduct.name} → ${product.name}`);
      if (oldProduct.price !== product.price) changes.push(`precio: $${oldProduct.price} → $${product.price}`);
      if (oldProduct.available !== product.available) changes.push(`disponible: ${oldProduct.available} → ${product.available}`);
      
      await AuditService.logAction(
        req.user.id,
        'UPDATE',
        'PRODUCT',
        product._id,
        product.name,
        `Producto actualizado: ${changes.join(', ')}`,
        req
      );
    }
    
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
    
    // Registrar auditoría
    if (req.user) {
      await AuditService.logAction(
        req.user.id,
        'DELETE',
        'PRODUCT',
        product._id,
        product.name,
        `Producto eliminado: ${product.name}`,
        req
      );
    }
    
    res.json({ message: 'Producto marcado como no disponible', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Restaurar producto eliminado lógicamente
exports.restoreProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, deleted: true },
      { deleted: false, deletedBy: null, deletedAt: null, updatedAt: new Date() },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: 'Producto no encontrado o no está eliminado' });
    
    // Registrar auditoría
    if (req.user) {
      await AuditService.logAction(
        req.user.id,
        'UPDATE',
        'PRODUCT',
        product._id,
        product.name,
        `Producto restaurado: ${product.name}`,
        req
      );
    }
    
    res.json({ message: 'Producto restaurado exitosamente', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};