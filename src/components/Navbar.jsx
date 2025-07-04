import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-yellow-600">Krusty Burger</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-yellow-600">Inicio</Link>
          <Link to="/menu" className="hover:text-yellow-600">Menú</Link>
          <Link to="/pedido" className="hover:text-yellow-600">Pedido</Link>
          <Link to="/nosotros" className="hover:text-yellow-600">Nosotros</Link>
        </div>
      </div>
    </nav>
  );
} 