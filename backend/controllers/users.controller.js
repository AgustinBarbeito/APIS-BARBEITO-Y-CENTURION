const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { sessions } = require('./authController');
const AuditService = require('../services/audit.service');

exports.getUsers = async (req, res) => {
  try {
    const { username, email } = req.query;
    let filter = { deleted: false };
    if (username) filter.username = { $regex: username, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };
    const users = await User.find(filter);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, deleted: false });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Verificar que el email no exista ya (incluyendo usuarios eliminados lógicamente)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    
    // Registrar auditoría
    if (req.user) {
      await AuditService.logAction(
        req.user.id,
        'CREATE',
        'USER',
        user._id,
        user.email,
        `Usuario creado: ${user.email}`,
        req
      );
    }
    
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Obtener el usuario antes de actualizarlo para auditoría
    const oldUser = await User.findOne({ _id: req.params.id, deleted: false });
    if (!oldUser) return res.status(404).json({ error: 'Usuario no encontrado' });
    
    // Verificar que el email no esté en uso por otro usuario
    if (email && email !== oldUser.email) {
      const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
      if (existingUser) {
        return res.status(400).json({ error: 'El email ya está registrado por otro usuario' });
      }
    }
    
    const update = { username, email };
    if (password) update.password = await bcrypt.hash(password, 10);
    
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      update,
      { new: true }
    );
    
    // Registrar auditoría
    if (req.user) {
      const changes = [];
      if (oldUser.username !== user.username) changes.push(`username: ${oldUser.username} → ${user.username}`);
      if (oldUser.email !== user.email) changes.push(`email: ${oldUser.email} → ${user.email}`);
      if (password) changes.push('password: actualizada');
      
      await AuditService.logAction(
        req.user.id,
        'UPDATE',
        'USER',
        user._id,
        user.email,
        `Usuario actualizado: ${changes.join(', ')}`,
        req
      );
    }
    
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    // Obtener el usuario antes de eliminarlo para auditoría
    const user = await User.findOne({ _id: req.params.id, deleted: false });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    
    // Verificar que no sea el admin principal
    if (user.email === 'admin@krusty.com') {
      return res.status(400).json({ error: 'No se puede eliminar el usuario administrador principal' });
    }
    
    // Eliminar físicamente de la base de datos
    await User.findByIdAndDelete(req.params.id);
    
    // Registrar auditoría
    if (req.user) {
      await AuditService.logAction(
        req.user.id,
        'DELETE',
        'USER',
        user._id,
        user.email,
        `Usuario eliminado físicamente: ${user.email}`,
        req
      );
    }
    
    res.json({ message: 'Usuario eliminado definitivamente de la base de datos' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, deleted: false });
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Generar un session-id simple (en producción usar JWT o sesiones reales)
    const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);

    // Guardar la sesión en memoria
    sessions.set(sessionId, {
      userId: user._id,
      email: user.email
    });

    // Registrar auditoría de login
    await AuditService.logAction(
      user._id,
      'LOGIN',
      'AUTH',
      null,
      user.email,
      'Inicio de sesión exitoso',
      req
    );

    res.json({ sessionId, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};