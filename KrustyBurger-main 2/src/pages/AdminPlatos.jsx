import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPlatos = () => {
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlato, setEditingPlato] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: 'hamburguesas',
    disponible: true
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndLoadPlatos();
  }, []);

  const checkAuthAndLoadPlatos = async () => {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
      navigate('/login');
      return;
    }

    try {
      // Verificar autenticación
      const authResponse = await fetch('http://localhost:3001/api/auth/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });

      if (!authResponse.ok) {
        navigate('/login');
        return;
      }

      // Cargar platos
      await loadPlatos();
    } catch (error) {
      console.error('Error:', error);
      navigate('/login');
    }
  };

  const loadPlatos = async () => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      const response = await fetch('http://localhost:3001/api/products', {
        headers: {
          'session-id': sessionId
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPlatos(data);
      } else {
        setError('Error cargando platos');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const sessionId = localStorage.getItem('sessionId');
    const url = editingPlato 
      ? `http://localhost:3001/api/products/${editingPlato._id}`
      : 'http://localhost:3001/api/products';
    
    const method = editingPlato ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'session-id': sessionId
        },
        body: JSON.stringify({
          ...formData,
          precio: parseFloat(formData.precio)
        })
      });

      if (response.ok) {
        setSuccess(editingPlato ? 'Plato actualizado exitosamente' : 'Plato creado exitosamente');
        setShowForm(false);
        setEditingPlato(null);
        resetForm();
        await loadPlatos();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error en la operación');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const handleEdit = (plato) => {
    setEditingPlato(plato);
    setFormData({
      nombre: plato.name || '',
      descripcion: plato.description || '',
      precio: plato.price ? plato.price.toString() : '',
      categoria: plato.category || 'hamburguesas',
      disponible: plato.available !== undefined ? plato.available : true
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este plato?')) {
      return;
    }

    const sessionId = localStorage.getItem('sessionId');
    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'session-id': sessionId
        }
      });

      if (response.ok) {
        setSuccess('Plato eliminado exitosamente');
        await loadPlatos();
      } else {
        setError('Error eliminando plato');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      categoria: 'hamburguesas',
      disponible: true
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPlato(null);
    resetForm();
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Cargando platos...</p>
      </div>
    );
  }

  return (
    <div className="admin-platos-container">
      <header className="admin-platos-header">
        <div className="admin-platos-header-content">
          <div className="header-left">
            <button onClick={() => navigate('/admin')} className="back-button">
              ← Volver al Panel
            </button>
            <h1>🍔 Administración de Platos</h1>
          </div>
          <button 
            onClick={() => setShowForm(true)} 
            className="add-button"
          >
            ➕ Agregar Plato
          </button>
        </div>
      </header>

      <main className="admin-platos-main">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {showForm && (
          <div className="form-overlay">
            <div className="form-modal">
              <h2>{editingPlato ? '✏️ Editar Plato' : '➕ Nuevo Plato'}</h2>
              <form onSubmit={handleSubmit} className="plato-form">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre *</label>
                  <input
                    type="text"
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="precio">Precio *</label>
                  <input
                    type="number"
                    id="precio"
                    step="0.01"
                    min="0"
                    value={formData.precio}
                    onChange={(e) => setFormData({...formData, precio: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="categoria">Categoría *</label>
                  <select
                    id="categoria"
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    required
                  >
                    <option value="hamburguesas">🍔 Hamburguesas</option>
                    <option value="entrantes">🍟 Entrantes</option>
                    <option value="acompañamientos">🧅 Acompañamientos</option>
                    <option value="ensaladas">🥗 Ensaladas</option>
                    <option value="pastas">🍝 Pastas</option>
                    <option value="bebidas-alcoholicas">🍺 Bebidas Alcohólicas</option>
                    <option value="bebidas-sin-alcohol">🥤 Bebidas Sin Alcohol</option>
                    <option value="postres">🍩 Postres</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.disponible}
                      onChange={(e) => setFormData({...formData, disponible: e.target.checked})}
                    />
                    Disponible
                  </label>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={handleCancel} className="cancel-button">
                    ❌ Cancelar
                  </button>
                  <button type="submit" className="save-button">
                    {editingPlato ? '💾 Actualizar' : '💾 Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="platos-grid">
          {platos.length === 0 ? (
            <div className="empty-state">
              <h3>🍽️ No hay platos registrados</h3>
              <p>Comienza agregando tu primer plato al menú</p>
              <button onClick={() => setShowForm(true)} className="add-first-button">
                ➕ Agregar Primer Plato
              </button>
            </div>
          ) : (
            platos.map((plato) => (
              <div key={plato._id} className="plato-card">
                <div className="plato-header">
                  <h3>{plato.name}</h3>
                  <span className={`status ${plato.available ? 'available' : 'unavailable'}`}>
                    {plato.available ? '✅ Disponible' : '❌ No disponible'}
                  </span>
                </div>
                
                <div className="plato-content">
                  {plato.description && (
                    <p className="plato-description">{plato.description}</p>
                  )}
                  <div className="plato-price">
                    <strong>${plato.price}</strong>
                  </div>
                </div>

                <div className="plato-actions">
                  <button 
                    onClick={() => handleEdit(plato)} 
                    className="edit-button"
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(plato._id)} 
                    className="delete-button"
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPlatos; 