const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT']
  },
  entity: {
    type: String,
    required: true,
    enum: ['PRODUCT', 'USER', 'AUTH']
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false // Puede ser null para acciones como LOGIN/LOGOUT
  },
  entityName: {
    type: String,
    required: false // Nombre descriptivo del elemento afectado
  },
  details: {
    type: String,
    required: false // Detalles adicionales del cambio
  },
  ipAddress: {
    type: String,
    required: false
  },
  userAgent: {
    type: String,
    required: false
  }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Índices para mejorar el rendimiento de las consultas
auditSchema.index({ user: 1, createdAt: -1 });
auditSchema.index({ entity: 1, createdAt: -1 });
auditSchema.index({ action: 1, createdAt: -1 });
auditSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Audit', auditSchema); 