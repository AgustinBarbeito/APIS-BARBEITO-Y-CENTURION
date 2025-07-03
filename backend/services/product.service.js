const Product = require('../models/Product');

class ProductService {
  // Buscar productos con filtros opcionales
  async buscarProductos(filtros = {}) {
    try {
      const { name, category, price, deleted = false } = filtros;
      let query = { deleted };
      if (name) query.name = { $regex: name, $options: 'i' };
      if (category) query.category = category;
      if (price) query.price = { $lte: parseFloat(price) };
      const productos = await Product.find(query);
      return { success: true, data: productos, total: productos.length };
    } catch (error) {
      return { success: false, error: 'Error al buscar productos: ' + error.message };
    }
  }

  // Buscar producto por ID
  async buscarProductoPorId(id) {
    try {
      const producto = await Product.findOne({ _id: id, deleted: false });
      if (!producto) return { success: false, error: 'Producto no encontrado' };
      return { success: true, data: producto };
    } catch (error) {
      return { success: false, error: 'Error al buscar producto: ' + error.message };
    }
  }

  // Alta de producto
  async altaProducto(datosProducto) {
    try {
      const { name, description, price, category, image } = datosProducto;
      if (!name || !price) return { success: false, error: 'Nombre y precio son requeridos' };
      const nuevoProducto = new Product({
        name,
        description: description || '',
        price: parseFloat(price),
        category: category || 'general',
        image: image || '',
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      await nuevoProducto.save();
      return { success: true, data: nuevoProducto, message: 'Producto creado exitosamente' };
    } catch (error) {
      return { success: false, error: 'Error al crear producto: ' + error.message };
    }
  }

  // Modificación de producto
  async modificarProducto(id, datosActualizados) {
    try {
      const { name, description, price, category, image } = datosActualizados;
      const productoExistente = await Product.findOne({ _id: id, deleted: false });
      if (!productoExistente) return { success: false, error: 'Producto no encontrado' };
      
      const updateData = { updatedAt: new Date() };
      if (name) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (price) updateData.price = parseFloat(price);
      if (category) updateData.category = category;
      if (image !== undefined) updateData.image = image;

      const productoActualizado = await Product.findOneAndUpdate(
        { _id: id, deleted: false },
        updateData,
        { new: true }
      );
      return { success: true, data: productoActualizado, message: 'Producto actualizado exitosamente' };
    } catch (error) {
      return { success: false, error: 'Error al modificar producto: ' + error.message };
    }
  }

  // Baja lógica de producto
  async bajaProducto(id, usuarioEliminador = null) {
    try {
      const producto = await Product.findOne({ _id: id, deleted: false });
      if (!producto) return { success: false, error: 'Producto no encontrado' };
      
      const productoEliminado = await Product.findOneAndUpdate(
        { _id: id, deleted: false },
        { deleted: true, deletedBy: usuarioEliminador ? usuarioEliminador.id : null, deletedAt: new Date() },
        { new: true }
      );
      return { success: true, data: productoEliminado, message: 'Producto eliminado exitosamente' };
    } catch (error) {
      return { success: false, error: 'Error al eliminar producto: ' + error.message };
    }
  }

  // Baja física de producto
  async bajaFisicaProducto(id) {
    try {
      const producto = await Product.findById(id);
      if (!producto) return { success: false, error: 'Producto no encontrado' };
      
      await Product.findByIdAndDelete(id);
      return { success: true, message: 'Producto eliminado físicamente de la base de datos' };
    } catch (error) {
      return { success: false, error: 'Error al eliminar producto: ' + error.message };
    }
  }

  // Restaurar producto
  async restaurarProducto(id) {
    try {
      const producto = await Product.findOneAndUpdate(
        { _id: id, deleted: true },
        { deleted: false, deletedBy: null, deletedAt: null, updatedAt: new Date() },
        { new: true }
      );
      if (!producto) return { success: false, error: 'Producto no encontrado o no está eliminado' };
      return { success: true, data: producto, message: 'Producto restaurado exitosamente' };
    } catch (error) {
      return { success: false, error: 'Error al restaurar producto: ' + error.message };
    }
  }

  // Buscar productos por categoría
  async buscarPorCategoria(categoria) {
    try {
      const productos = await Product.find({ category: categoria, deleted: false });
      return { success: true, data: productos, total: productos.length };
    } catch (error) {
      return { success: false, error: 'Error al buscar productos por categoría: ' + error.message };
    }
  }

  // Obtener categorías disponibles
  async obtenerCategorias() {
    try {
      const categorias = await Product.distinct('category', { deleted: false });
      return { success: true, data: categorias };
    } catch (error) {
      return { success: false, error: 'Error al obtener categorías: ' + error.message };
    }
  }

  // Estadísticas de productos
  async obtenerEstadisticas() {
    try {
      const totalProductos = await Product.countDocuments({ deleted: false });
      const productosActivos = await Product.countDocuments({ deleted: false });
      const productosEliminados = await Product.countDocuments({ deleted: true });
      const categorias = await Product.distinct('category', { deleted: false });
      const precioPromedio = await Product.aggregate([
        { $match: { deleted: false } },
        { $group: { _id: null, promedio: { $avg: '$price' } } }
      ]);
      
      return { 
        success: true, 
        data: { 
          total: totalProductos, 
          activos: productosActivos, 
          eliminados: productosEliminados, 
          categorias: categorias.length,
          precioPromedio: precioPromedio[0]?.promedio || 0
        } 
      };
    } catch (error) {
      return { success: false, error: 'Error al obtener estadísticas: ' + error.message };
    }
  }
}

module.exports = new ProductService();