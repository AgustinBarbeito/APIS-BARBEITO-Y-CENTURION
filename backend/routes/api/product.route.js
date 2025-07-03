const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/products');
const { requireAuth } = require('../../middlewares/auth');

// GET público
router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.getProductsById);
// Rutas protegidas
router.post('/products', requireAuth, ProductController.createProduct);
router.put('/products/:id', requireAuth, ProductController.updateProduct);
router.delete('/products/:id', requireAuth, ProductController.deleteProduct);

module.exports = router; 