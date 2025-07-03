const express = require('express');
const router = express.Router();

// Importar routers individuales
const userRouter = require('./user.route');
const productRouter = require('./product.route');
const authRouter = require('../auth');

// Montar los routers
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/', productRouter);

module.exports = router; 