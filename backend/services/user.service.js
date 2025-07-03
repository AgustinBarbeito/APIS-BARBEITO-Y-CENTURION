const User = require('../models/User');
const bcrypt = require('bcryptjs');

class UserService {
  // Buscar usuarios con filtros opcionales
  async buscarUsuarios(filtros = {}) {
    try {
      const { name, email, role, deleted = false } = filtros;
      let query = { deleted };
      if (name) query.name = { $regex: name, $options: 'i' };
      if (email) query.email = { $regex: email, $options: 'i' };
      if (role) query.role = role;
      const usuarios = await User.find(query).select('-password');
      return { success: true, data: usuarios, total: usuarios.length };
    } catch (error) {
      return { success: false, error: 'Error al buscar usuarios: ' + error.message };
    }
  }

  // Buscar usuario por ID
  async buscarUsuarioPorId(id) {
    try {
      const usuario = await User.findOne({ _id: id, deleted: false }).select('-password');
      if (!usuario) return { success: false, error: 'Usuario no encontrado' };
      return { success: true, data: usuario };
    } catch (error) {
      return { success: false, error: 'Error al buscar usuario: ' + error.message };
    }
  }

  // Buscar usuario por email
  async buscarUsuarioPorEmail(email) {
    try {
      const usuario = await User.findOne({ email, deleted: false });
      if (!usuario) return { success: false, error: 'Usuario no encontrado' };
      return { success: true, data: usuario };
    } catch (error) {
      return { success: false, error: 'Error al buscar usuario por email: ' + error.message };
    }
  }

  // Alta de usuario
  async altaUsuario(datosUsuario) {
    try {
      const { name, email, password, role = 'user' } = datosUsuario;
      if (!name || !email || !password) return { success: false, error: 'Nombre, email y contraseña son requeridos' };
      const usuarioExistente = await User.findOne({ email, deleted: false });
      if (usuarioExistente) return { success: false, error: 'El email ya está registrado' };
      const hashedPassword = await bcrypt.hash(password, 10);
      const nuevoUsuario = new User({ name, email, password: hashedPassword, role, deleted: false, createdAt: new Date(), updatedAt: new Date() });
      await nuevoUsuario.save();
      const usuarioResponse = nuevoUsuario.toObject();
      delete usuarioResponse.password;
      return { success: true, data: usuarioResponse, message: 'Usuario creado exitosamente' };
    } catch (error) {
      return { success: false, error: 'Error al crear usuario: ' + error.message };
    }
  }

  // Modificación de usuario
  async modificarUsuario(id, datosActualizados) {
    try {
      const { name, email, password, role } = datosActualizados;
      const usuarioExistente = await User.findOne({ _id: id, deleted: false });
      if (!usuarioExistente) return { success: false, error: 'Usuario no encontrado' };
      if (email && email !== usuarioExistente.email) {
        const emailExistente = await User.findOne({ email, _id: { $ne: id }, deleted: false });
        if (emailExistente) return { success: false, error: 'El email ya está registrado por otro usuario' };
      }
      const updateData = { updatedAt: new Date() };
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (role) updateData.role = role;
      if (password) updateData.password = await bcrypt.hash(password, 10);
      const usuarioActualizado = await User.findOneAndUpdate(
        { _id: id, deleted: false },
        updateData,
        { new: true }
      ).select('-password');
      return { success: true, data: usuarioActualizado, message: 'Usuario actualizado exitosamente' };
    } catch (error) {
      return { success: false, error: 'Error al modificar usuario: ' + error.message };
    }
  }

  // Baja lógica de usuario
  async bajaUsuario(id, usuarioEliminador = null) {
    try {
      const usuario = await User.findOne({ _id: id, deleted: false });
      if (!usuario) return { success: false, error: 'Usuario no encontrado' };
      if (usuario.email === 'admin@krusty.com') return { success: false, error: 'No se puede eliminar el usuario administrador principal' };
      const usuarioEliminado = await User.findOneAndUpdate(
        { _id: id, deleted: false },
        { deleted: true, deletedBy: usuarioEliminador ? usuarioEliminador.id : null, deletedAt: new Date() },
        { new: true }
      ).select('-password');
      return { success: true, data: usuarioEliminado, message: 'Usuario eliminado exitosamente' };
    } catch (error) {
      return { success: false, error: 'Error al eliminar usuario: ' + error.message };
    }
  }

  // Baja física de usuario
  async bajaFisicaUsuario(id) {
    try {
      const usuario = await User.findById(id);
      if (!usuario) return { success: false, error: 'Usuario no encontrado' };
      if (usuario.email === 'admin@krusty.com') return { success: false, error: 'No se puede eliminar el usuario administrador principal' };
      await User.findByIdAndDelete(id);
      return { success: true, message: 'Usuario eliminado físicamente de la base de datos' };
    } catch (error) {
      return { success: false, error: 'Error al eliminar usuario: ' + error.message };
    }
  }

  // Restaurar usuario
  async restaurarUsuario(id) {
    try {
      const usuario = await User.findOneAndUpdate(
        { _id: id, deleted: true },
        { deleted: false, deletedBy: null, deletedAt: null, updatedAt: new Date() },
        { new: true }
      ).select('-password');
      if (!usuario) return { success: false, error: 'Usuario no encontrado o no está eliminado' };
      return { success: true, data: usuario, message: 'Usuario restaurado exitosamente' };
    } catch (error) {
      return { success: false, error: 'Error al restaurar usuario: ' + error.message };
    }
  }

  // Verificar credenciales para login
  async verificarCredenciales(email, password) {
    try {
      const resultado = await this.buscarUsuarioPorEmail(email);
      if (!resultado.success) return { success: false, error: 'Credenciales inválidas' };
      const usuario = resultado.data;
      const passwordValido = await bcrypt.compare(password, usuario.password);
      if (!passwordValido) return { success: false, error: 'Credenciales inválidas' };
      const usuarioResponse = usuario.toObject();
      delete usuarioResponse.password;
      return { success: true, data: usuarioResponse };
    } catch (error) {
      return { success: false, error: 'Error al verificar credenciales: ' + error.message };
    }
  }

  // Estadísticas de usuarios
  async obtenerEstadisticas() {
    try {
      const totalUsuarios = await User.countDocuments({ deleted: false });
      const usuariosActivos = await User.countDocuments({ deleted: false });
      const usuariosEliminados = await User.countDocuments({ deleted: true });
      const admins = await User.countDocuments({ role: 'admin', deleted: false });
      const usuariosNormales = await User.countDocuments({ role: 'user', deleted: false });
      return { success: true, data: { total: totalUsuarios, activos: usuariosActivos, eliminados: usuariosEliminados, administradores: admins, usuarios: usuariosNormales } };
    } catch (error) {
      return { success: false, error: 'Error al obtener estadísticas: ' + error.message };
    }
  }
}

module.exports = new UserService();