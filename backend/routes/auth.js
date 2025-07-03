const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para login
router.post('/login', authController.login);

// Ruta para logout
router.post('/logout', authController.logout);

// Ruta para verificar autenticación
router.post('/check', authController.checkAuth);

module.exports = router; 