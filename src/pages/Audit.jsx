import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Audit = () => {
  const [auditHistory, setAuditHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    action: '',
    entity: '',
    startDate: '',
    endDate: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const sessionId = localStorage.getItem('sessionId');

  useEffect(() => {
    if (!sessionId) {
      navigate('/login');
      return;
    }
    fetchAuditHistory();
  }, [sessionId, currentPage, filters]);

  const fetchAuditHistory = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 20,
        ...filters
      });

      const response = await fetch(`http://localhost:3001/api/audit/history?${queryParams}`, {
        headers: {
          'session-id': sessionId
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || 'Error al cargar el historial de auditoría'}`);
      }

      const data = await response.json();
      setAuditHistory(data.data.audits);
      setTotalPages(data.data.totalPages);
    } catch (err) {
      console.error('Error fetching audit history:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      action: '',
      entity: '',
      startDate: '',
      endDate: ''
    });
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'CREATE': return 'var(--krusty-green)';
      case 'UPDATE': return 'var(--krusty-yellow)';
      case 'DELETE': return 'var(--krusty-red)';
      case 'LOGIN': return 'var(--krusty-blue)';
      case 'LOGOUT': return 'var(--krusty-orange)';
      default: return 'var(--krusty-gray)';
    }
  };

  const getEntityIcon = (entity) => {
    switch (entity) {
      case 'PRODUCT': return '🍔';
      case 'USER': return '👤';
      case 'AUTH': return '🔐';
      default: return '📝';
    }
  };

  if (loading) {
    return (
      <div className="audit-container">
        <div className="loading">Cargando historial de auditoría...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="audit-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="audit-container">
      <div className="audit-header">
        <h1>📋 Historial de Auditoría</h1>
        <p>Registro de todas las acciones realizadas en el sistema</p>
      </div>

      {/* Filtros */}
      <div className="audit-filters">
        <div className="filter-group">
          <label>Acción:</label>
          <select name="action" value={filters.action} onChange={handleFilterChange}>
            <option value="">Todas las acciones</option>
            <option value="CREATE">Crear</option>
            <option value="UPDATE">Actualizar</option>
            <option value="DELETE">Eliminar</option>
            <option value="LOGIN">Iniciar sesión</option>
            <option value="LOGOUT">Cerrar sesión</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Entidad:</label>
          <select name="entity" value={filters.entity} onChange={handleFilterChange}>
            <option value="">Todas las entidades</option>
            <option value="PRODUCT">Productos</option>
            <option value="USER">Usuarios</option>
            <option value="AUTH">Autenticación</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Fecha inicio:</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-group">
          <label>Fecha fin:</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </div>

        <button className="clear-filters-btn" onClick={clearFilters}>
          Limpiar filtros
        </button>
      </div>

      {/* Lista de auditoría */}
      <div className="audit-list">
        {auditHistory.length === 0 ? (
          <div className="no-audit">No se encontraron registros de auditoría</div>
        ) : (
          auditHistory.map((audit) => (
            <div key={audit._id} className="audit-item">
              <div className="audit-icon">
                <span style={{ fontSize: '1.5em' }}>{getEntityIcon(audit.entity)}</span>
              </div>
              
              <div className="audit-content">
                <div className="audit-header-row">
                  <span 
                    className="audit-action"
                    style={{ backgroundColor: getActionColor(audit.action) }}
                  >
                    {audit.action}
                  </span>
                  <span className="audit-entity">{audit.entity}</span>
                  <span className="audit-date">{formatDate(audit.createdAt)}</span>
                </div>
                
                <div className="audit-details">
                  <div className="audit-user">
                    <strong>Usuario:</strong> {audit.user?.email || 'N/A'}
                  </div>
                  {audit.entityName && (
                    <div className="audit-entity-name">
                      <strong>Elemento:</strong> {audit.entityName}
                    </div>
                  )}
                  {audit.details && (
                    <div className="audit-description">
                      <strong>Detalles:</strong> {audit.details}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="audit-pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          
          <span className="page-info">
            Página {currentPage} de {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}

      <div className="audit-footer">
        <button className="back-btn" onClick={() => navigate('/admin')}>
          Volver al Panel de Administración
        </button>
      </div>
    </div>
  );
};

export default Audit; 