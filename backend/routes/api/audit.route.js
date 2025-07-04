const express = require('express');
const router = express.Router();
const auditController = require('../../controllers/audit');
const { requireAuth } = require('../../middlewares/auth');

// Todas las rutas requieren autenticación
router.use(requireAuth);

// Obtener historial de auditoría
router.get('/history', auditController.getAuditHistory);

// Obtener estadísticas de auditoría
router.get('/stats', auditController.getAuditStats);

// Obtener actividad de un usuario específico
router.get('/user/:userId', auditController.getUserActivity);

// Obtener últimos movimientos
router.get('/recent', auditController.getRecentActivity);

module.exports = router; 