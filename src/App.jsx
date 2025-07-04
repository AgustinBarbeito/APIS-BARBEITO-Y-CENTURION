import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Pedido from './pages/Pedido';
import Nosotros from './pages/Nosotros';
import Ubicaciones from './pages/Ubicaciones';
import Login from './pages/Login';
import Admin from './pages/Admin';
import AdminPlatos from './pages/AdminPlatos';
import AdminUsuarios from './pages/AdminUsuarios';
import Audit from './pages/Audit';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/pedido" element={<Pedido />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/ubicaciones" element={<Ubicaciones />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/platos" element={<AdminPlatos />} />
      <Route path="/admin/usuarios" element={<AdminUsuarios />} />
      <Route path="/admin/audit" element={<Audit />} />
    </Routes>
  );
} 