import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav style={{ padding: '16px', background: '#fff', borderBottom: '1px solid #eee', marginBottom: 24 }}>
      <div style={{ display: 'flex', gap: 24 }}>
        <Link href="/">Inicio</Link>
        <Link href="/menu">Menú</Link>
        <Link href="/pedido">Pedido</Link>
        <Link href="/nosotros">Nosotros</Link>
      </div>
    </nav>
  );
} 