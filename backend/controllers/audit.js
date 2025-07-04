const AuditService = require('../services/audit.service');

// Obtener historial de auditoría
const getAuditHistory = async (req, res) => {
  try {
    const { page = 1, limit = 50, user, action, entity, startDate, endDate } = req.query;
    
    const filters = {};
    if (user) filters.user = user;
    if (action) filters.action = action;
    if (entity) filters.entity = entity;
    if (startDate && endDate) {
      filters.startDate = startDate;
      filters.endDate = endDate;
    }

    const result = await AuditService.getAuditHistory(
      parseInt(limit),
      parseInt(page),
      filters
    );

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error getting audit history:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

// Obtener estadísticas de auditoría
const getAuditStats = async (req, res) => {
  try {
    const stats = await AuditService.getAuditStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting audit stats:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

// Obtener actividad de un usuario específico
const getUserActivity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 20 } = req.query;

    const activities = await AuditService.getUserActivity(userId, parseInt(limit));
    
    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Error getting user activity:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

// Obtener últimos movimientos (para el dashboard)
const getRecentActivity = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const result = await AuditService.getAuditHistory(parseInt(limit), 1, {});
    
    res.json({
      success: true,
      data: result.audits
    });
  } catch (error) {
    console.error('Error getting recent activity:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
};

module.exports = {
  getAuditHistory,
  getAuditStats,
  getUserActivity,
  getRecentActivity
}; 