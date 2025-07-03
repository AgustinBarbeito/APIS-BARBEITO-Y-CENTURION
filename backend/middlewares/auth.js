const { sessions } = require('../controllers/authController');

const requireAuth = (req, res, next) => {
  try {
    // Obtener sessionId del header o body
    const sessionId = req.headers['session-id'] || req.body.sessionId;
    
    if (!sessionId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Session ID requerido' 
      });
    }
    
    // Verificar si la sesión existe
    if (!sessions.has(sessionId)) {
      return res.status(401).json({ 
        success: false, 
        message: 'Sesión inválida o expirada' 
      });
    }
    
    // Agregar información del usuario a la request
    const session = sessions.get(sessionId);
    req.user = {
      id: session.userId,
      email: session.email,
      role: session.role
    };
    
    next();
  } catch (error) {
    console.error('Error en middleware de autenticación:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
};

// Middleware para verificar si es admin
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Acceso denegado. Se requieren permisos de administrador' 
    });
  }
  next();
};

module.exports = {
  requireAuth,
  requireAdmin
}; 