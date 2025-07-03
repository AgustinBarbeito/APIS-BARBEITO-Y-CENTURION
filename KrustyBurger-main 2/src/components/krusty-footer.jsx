import React from 'react';
import { Link } from 'react-router-dom';


export default function KrustyFooter() {
  return (
    <footer className="krusty-footer">
      <div className="krusty-footer-container">
        <div className="krusty-footer-section krusty-footer-logo-section">
          <img src="/krusty-burger-logo.png" alt="Krusty Burger Logo" className="krusty-footer-logo" />
          <h3 className="krusty-footer-title">Krusty Burger</h3>
          <p className="krusty-footer-description">"No es solo una hamburguesa, es una Krusty Burger"</p>
        </div>
        <div className="krusty-footer-section">
          <h3 className="krusty-footer-subtitle">MENÚ</h3>
          <ul className="krusty-footer-list">
            <li><Link to="/menu">Hamburguesas</Link></li>
            <li><Link to="/menu">Acompañamientos</Link></li>
            <li><Link to="/menu">Bebidas</Link></li>
            <li><Link to="/menu">Postres</Link></li>
          </ul>
        </div>
        <div className="krusty-footer-section">
          <h3 className="krusty-footer-subtitle">HORARIOS</h3>
          <p className="krusty-footer-text">Lunes a Viernes: 10:00 - 22:00</p>
          <p className="krusty-footer-text">Sábados y Domingos: 11:00 - 23:00</p>
          <p className="krusty-footer-text">Feriados: 12:00 - 21:00</p>
        </div>
        <div className="krusty-footer-section">
          <h3 className="krusty-footer-subtitle">CONTACTO</h3>
          <p className="krusty-footer-text">Teléfono: 555-KRUSTY</p>
          <p className="krusty-footer-text">Email: info@krustyburger.com</p>
          <div className="krusty-footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
      <div className="krusty-footer-bottom">
        <p className="krusty-footer-copyright">© {new Date().getFullYear()} Krusty Burger. Todos los derechos reservados.</p>
        <p className="krusty-footer-legal">"Los ingredientes pueden contener pedazos de payaso" - Advertencia legal</p>
      </div>
    </footer>
  );
} 