import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Pedido from './pages/Pedido';
import Nosotros from './pages/Nosotros';
import Ubicaciones from './pages/Ubicaciones';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/pedido" element={<Pedido />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/ubicaciones" element={<Ubicaciones />} />
    </Routes>
  );
} 