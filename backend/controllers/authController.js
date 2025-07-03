const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Almacenamiento temporal de sesiones (en producción usar Redis o similar)
const sessions = new Map();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validar que se proporcionen email y password
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email y password son requeridos' 
      });
    }

    // Buscar usuario por email
    const user = await User.findOne({ email, deleted: false });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciales inválidas' 
      });
    }

    // Verificar password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Credenciales inválidas' 
      });
    }

    // Crear sesión simple
    const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessions.set(sessionId, {
      userId: user._id,
      email: user.email,
      createdAt: new Date()
    });

    // Devolver respuesta exitosa
    res.json({
      success: true,
      message: 'Login exitoso',
      sessionId: sessionId,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
};

exports.logout = (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (sessionId && sessions.has(sessionId)) {
      sessions.delete(sessionId);
    }
    
    res.json({ 
      success: true, 
      message: 'Logout exitoso' 
    });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
};

exports.checkAuth = (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId || !sessions.has(sessionId)) {
      return res.status(401).json({ 
        success: false, 
        message: 'No autenticado' 
      });
    }
    
    const session = sessions.get(sessionId);
    res.json({
      success: true,
      authenticated: true,
      user: {
        id: session.userId,
        email: session.email,
        role: session.role
      }
    });
  } catch (error) {
    console.error('Error en checkAuth:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
};

// Función para crear usuario admin inicial
exports.createInitialAdmin = async () => {
  try {
    const adminEmail = 'admin@krusty.com';
    const adminPassword = 'admin123';
    
    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({ email: adminEmail, deleted: false });
    
    if (!existingAdmin) {
      // Hashear password
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      
      // Crear usuario admin (ahora solo usuario común)
      const adminUser = new User({
        username: 'Administrador',
        email: adminEmail,
        password: hashedPassword,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      await adminUser.save();
      console.log('✅ Usuario admin creado exitosamente');
      console.log('📧 Email:', adminEmail);
      console.log('🔑 Password:', adminPassword);
    } else {
      console.log('ℹ️ Usuario admin ya existe');
    }
  } catch (error) {
    console.error('❌ Error creando usuario admin:', error);
  }
};

// Exportar sessions para el middleware
exports.sessions = sessions; 