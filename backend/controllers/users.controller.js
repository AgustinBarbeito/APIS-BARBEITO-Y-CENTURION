const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { sessions } = require('./authController');

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const update = { username, email };
    if (password) update.password = await bcrypt.hash(password, 10);
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      update,
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null; // Para auditoría
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      { deleted: true, deletedBy: userId, deletedAt: new Date() },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado lógicamente', user });
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

    res.json({ sessionId, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};