var express = require('express');
var router = express.Router();
var UserController = require('../../controllers/users.controller');
var { requireAuth } = require('../../middlewares/auth');

// Authorize each API with middleware and map to the Controller Functions
// GET users listing.
router.get('/', requireAuth, UserController.getUsers);

// POST para crear usuarios (ruta principal)
router.post('/', requireAuth, UserController.createUser);
router.post('/registration', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/users', requireAuth, UserController.getUsers);
// router.post('/userByMail', requireAuth, UserController.getUsersByMail); // No implementado

// Rutas con ID para edición y eliminación
router.put('/:id', requireAuth, UserController.updateUser);
router.delete('/:id', requireAuth, UserController.deleteUser);

// Rutas sin ID (mantener compatibilidad)
router.put('/update', requireAuth, UserController.updateUser);
router.delete('/delete', requireAuth, UserController.deleteUser);

// Export the Router
module.exports = router;
