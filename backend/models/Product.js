const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: { type: String, enum: ['hamburguesas', 'entrantes', 'acompañamientos', 'ensaladas', 'pastas', 'bebidas-alcoholicas', 'bebidas-sin-alcohol', 'postres'] },
  available: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deletedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);