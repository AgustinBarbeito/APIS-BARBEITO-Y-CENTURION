const { Router } = require('express');
const ProductController = require('../controllers/products');
const { requireAuth } = require('../middlewares/auth');

const router = Router();
// GET público
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductsById);
// Rutas protegidas
router.post('/', requireAuth, ProductController.createProduct);
router.put('/:id', requireAuth, ProductController.updateProduct);
router.delete('/:id', requireAuth, ProductController.deleteProduct);
router.patch('/:id/restore', requireAuth, ProductController.restoreProduct);

module.exports = router;