const express = require('express');
const router = express.Router();

// Importar routers individuales
const userRouter = require('./user.route');
const productRouter = require('./product.route');
const authRouter = require('../auth');
const auditRouter = require('./audit.route');

// Montar los routers
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/audit', auditRouter);
router.use('/', productRouter);

module.exports = router; 