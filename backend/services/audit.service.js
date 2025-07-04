const Audit = require('../models/audit');

class AuditService {
  // Registrar una acción de auditoría
  static async logAction(userId, action, entity, entityId = null, entityName = null, details = null, req = null) {
    try {
      const auditEntry = new Audit({
        user: userId,
        action,
        entity,
        entityId,
        entityName,
        details,
        ipAddress: req ? req.ip : null,
        userAgent: req ? req.get('User-Agent') : null
      });

      await auditEntry.save();
      return auditEntry;
    } catch (error) {
      console.error('Error logging audit action:', error);
      // No lanzamos el error para no interrumpir la operación principal
    }
  }

  // Obtener el historial de auditoría
  static async getAuditHistory(limit = 50, page = 1, filters = {}) {
    try {
      const skip = (page - 1) * limit;
      let query = {};

      // Aplicar filtros
      if (filters.user) {
        query.user = filters.user;
      }
      if (filters.action) {
        query.action = filters.action;
      }
      if (filters.entity) {
        query.entity = filters.entity;
      }
      if (filters.startDate && filters.endDate) {
        query.createdAt = {
          $gte: new Date(filters.startDate),
          $lte: new Date(filters.endDate)
        };
      }

      const audits = await Audit.find(query)
        .populate('user', 'email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Audit.countDocuments(query);

      return {
        audits,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      console.error('Error getting audit history:', error);
      throw error;
    }
  }

  // Obtener estadísticas de auditoría
  static async getAuditStats() {
    try {
      const stats = await Audit.aggregate([
        {
          $group: {
            _id: {
              action: '$action',
              entity: '$entity'
            },
            count: { $sum: 1 }
          }
        },
        {
          $group: {
            _id: '$_id.entity',
            actions: {
              $push: {
                action: '$_id.action',
                count: '$count'
              }
            },
            total: { $sum: '$count' }
          }
        }
      ]);

      return stats;
    } catch (error) {
      console.error('Error getting audit stats:', error);
      throw error;
    }
  }

  // Obtener últimos movimientos de un usuario específico
  static async getUserActivity(userId, limit = 20) {
    try {
      const activities = await Audit.find({ user: userId })
        .populate('user', 'email')
        .sort({ createdAt: -1 })
        .limit(limit);

      return activities;
    } catch (error) {
      console.error('Error getting user activity:', error);
      throw error;
    }
  }
}

module.exports = AuditService; 