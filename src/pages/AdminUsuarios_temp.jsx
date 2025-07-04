import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Estados para filtrado
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    username: '',
    email: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthAndLoadUsuarios();
  }, []);

  const checkAuthAndLoadUsuarios = async () => {
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

      // Cargar usuarios
      await loadUsuarios();
    } catch (error) {
      console.error('Error:', error);
      navigate('/login');
    }
  };

  const loadUsuarios = async () => {
    try {
      const sessionId = localStorage.getItem('sessionId');
      const response = await fetch('http://localhost:3001/api/users', {
        headers: {
          'Content-Type': 'application/json',
          'session-id': sessionId
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
        setFilteredUsuarios(data);
      } else {
        setError('Error cargando usuarios');
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
    const url = editingUsuario 
      ? `http://localhost:3001/api/users/${editingUsuario._id}`
      : 'http://localhost:3001/api/users';
    
    const method = editingUsuario ? 'PUT' : 'POST';

    // Validar password en creación
    if (!editingUsuario && !formData.password) {
      setError('La contraseña es requerida para nuevos usuarios');
      return;
    }

    // Preparar datos según el backend
    const userData = {
      username: formData.name,
      email: formData.email,
      password: formData.password
    };

    // Para edición, agregar el ID
    if (editingUsuario) {
      userData.id = editingUsuario._id;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'session-id': sessionId
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        setSuccess(editingUsuario ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente');
        setShowForm(false);
        setEditingUsuario(null);
        resetForm();
        await loadUsuarios();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error en la operación');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const handleEdit = (usuario) => {
    setEditingUsuario(usuario);
    setFormData({
      name: usuario.username, // El backend usa 'username'
      email: usuario.email,
      password: '', // No mostrar password actual
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      return;
    }

    const sessionId = localStorage.getItem('sessionId');
    try {
      const response = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'session-id': sessionId
        }
      });

      if (response.ok) {
        setSuccess('Usuario eliminado exitosamente');
        await loadUsuarios();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error eliminando usuario');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: ''
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUsuario(null);
    resetForm();
  };

  // Funciones de filtrado
  const applyFilters = () => {
    let filtered = usuarios;

    // Filtro por término de búsqueda general
    if (searchTerm) {
      filtered = filtered.filter(usuario =>
        usuario.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtros específicos
    if (filters.username) {
      filtered = filtered.filter(usuario =>
        usuario.username.toLowerCase().includes(filters.username.toLowerCase())
      );
    }

    if (filters.email) {
      filtered = filtered.filter(usuario =>
        usuario.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    setFilteredUsuarios(filtered);
  };

  // Aplicar filtros cuando cambien los criterios
  useEffect(() => {
    applyFilters();
  }, [usuarios, searchTerm, filters]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      username: '',
      email: ''
    });
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div className="admin-usuarios-container">
      <header className="admin-usuarios-header">
        <div className="admin-usuarios-header-content">
          <div className="header-left">
            <button onClick={() => navigate('/admin')} className="back-button">
              ← Volver al Panel
            </button>
            <h1>👥 Administración de Usuarios</h1>
          </div>
          <button 
            onClick={() => setShowForm(true)} 
            className="add-button"
          >
            ➕ Agregar Usuario
          </button>
        </div>
      </header>

      <main className="admin-usuarios-main">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* Sección de filtros */}
        <div className="filters-section">
          <div className="filters-header">
            <h3>🔍 Filtros de Búsqueda</h3>
            <button onClick={clearFilters} className="clear-filters-button">
              🗑️ Limpiar Filtros
            </button>
          </div>
          
          <div className="filters-content">
            <div className="search-filter">
              <label htmlFor="searchTerm">🔍 Búsqueda General:</label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="specific-filters">
              <div className="filter-group">
                <label htmlFor="usernameFilter">👤 Nombre:</label>
                <input
                  type="text"
                  id="usernameFilter"
                  placeholder="Filtrar por nombre..."
                  value={filters.username}
                  onChange={(e) => setFilters({...filters, username: e.target.value})}
                />
              </div>
              
              <div className="filter-group">
                <label htmlFor="emailFilter">📧 Email:</label>
                <input
                  type="text"
                  id="emailFilter"
                  placeholder="Filtrar por email..."
                  value={filters.email}
                  onChange={(e) => setFilters({...filters, email: e.target.value})}
                />
              </div>
            </div>
          </div>
          
          <div className="filters-summary">
            <span>📊 Mostrando {filteredUsuarios.length} de {usuarios.length} usuarios</span>
          </div>
        </div>

        {showForm && (
          <div className="form-overlay">
            <div className="form-modal">
              <h2>{editingUsuario ? '✏️ Editar Usuario' : '➕ Nuevo Usuario'}</h2>
              <form onSubmit={handleSubmit} className="usuario-form">
                <div className="form-group">
                  <label htmlFor="name">Nombre *</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    Contraseña {editingUsuario ? '(dejar vacío para mantener)' : '*'}
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required={!editingUsuario}
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={handleCancel} className="cancel-button">
                    ❌ Cancelar
                  </button>
                  <button type="submit" className="save-button">
                    {editingUsuario ? '💾 Actualizar' : '💾 Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="usuarios-grid">
          {filteredUsuarios.length === 0 ? (
            <div className="empty-state">
              <h3>👥 No se encontraron usuarios</h3>
              <p>Intenta ajustar los filtros de búsqueda</p>
              <button onClick={clearFilters} className="clear-filters-button">
                🗑️ Limpiar Filtros
              </button>
            </div>
          ) : (
            filteredUsuarios.map((usuario) => {
              return (
                <div key={usuario._id} className="usuario-card">
                  <div className="usuario-header">
                    <h3>{usuario.username}</h3>
                  </div>
                  
                  <div className="usuario-content">
                    <p className="usuario-email">📧 {usuario.email}</p>
                    <p className="usuario-date">
                      📅 Creado: {new Date(usuario.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="usuario-actions">
                    <button 
                      onClick={() => handleEdit(usuario)} 
                      className="edit-button"
                    >
                      ✏️ Editar
                    </button>
                    {usuario.email !== 'admin@krusty.com' && (
                      <button 
                        onClick={() => handleDelete(usuario._id)} 
                        className="delete-button"
                      >
                        🗑️ Eliminar
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminUsuarios; 