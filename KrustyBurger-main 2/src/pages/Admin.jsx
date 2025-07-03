import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const sessionId = localStorage.getItem('sessionId');
    const userData = localStorage.getItem('user');

    if (!sessionId || !userData) {
      navigate('/login');
      return;
    }

    // Verificar autenticación con el backend
    checkAuth(sessionId);
  }, [navigate]);

  const checkAuth = async (sessionId) => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId })
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        // Sesión inválida, redirigir al login
        localStorage.removeItem('sessionId');
        localStorage.removeItem('user');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const sessionId = localStorage.getItem('sessionId');
    
    try {
      await fetch('http://localhost:3001/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId })
      });
    } catch (error) {
      console.error('Error en logout:', error);
    }

    // Limpiar localStorage y redirigir
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Verificando autenticación...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>🏪 Panel de Administración</h1>
          <div className="admin-user-info">
            <span>👤 {user?.email}</span>
            <button onClick={handleLogout} className="logout-button">
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-welcome">
          <h2>¡Bienvenido, {user?.email}!</h2>
          <p>Selecciona una opción para gestionar el sistema</p>
        </div>

        <div className="admin-menu">
          <div className="admin-card" onClick={() => navigateTo('/admin/platos')}>
            <div className="admin-card-icon">🍔</div>
            <h3>Administración de Platos</h3>
            <p>Gestionar el menú de Krusty Burger</p>
            <ul>
              <li>📋 Listar todos los platos</li>
              <li>➕ Crear nuevos platos</li>
              <li>✏️ Modificar platos existentes</li>
              <li>🗑️ Eliminar platos</li>
            </ul>
          </div>

          <div className="admin-card" onClick={() => navigateTo('/admin/usuarios')}>
            <div className="admin-card-icon">👥</div>
            <h3>Administración de Usuarios</h3>
            <p>Gestionar usuarios del sistema</p>
            <ul>
              <li>📋 Listar todos los usuarios</li>
              <li>➕ Crear nuevos usuarios</li>
              <li>✏️ Modificar usuarios existentes</li>
              <li>🗑️ Eliminar usuarios</li>
            </ul>
          </div>
        </div>

        <div className="admin-stats">
          <div className="stat-card">
            <h4>📊 Estadísticas Rápidas</h4>
            <p>Próximamente: Dashboard con métricas</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin; 