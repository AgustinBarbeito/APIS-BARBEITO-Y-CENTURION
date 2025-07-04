import React, { useRef, useEffect, useState } from 'react';
import { useCart } from '../context/cart-context';
import KrustyHeader from '../components/krusty-header';
import KrustyFooter from '../components/krusty-footer';

export default function Menu() {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Referencias para navegación por categorías
  const hamburguesasRef = useRef(null);
  const entrantesRef = useRef(null);
  const acompañamientosRef = useRef(null);
  const ensaladasRef = useRef(null);
  const pastasRef = useRef(null);
  const bebidasAlcoholicasRef = useRef(null);
  const bebidasSinAlcoholRef = useRef(null);
  const postresRef = useRef(null);

  // Mapeo de categorías a referencias
  const refs = {
    'hamburguesas': hamburguesasRef,
    'entrantes': entrantesRef,
    'acompañamientos': acompañamientosRef,
    'ensaladas': ensaladasRef,
    'pastas': pastasRef,
    'bebidas-alcoholicas': bebidasAlcoholicasRef,
    'bebidas-sin-alcohol': bebidasSinAlcoholRef,
    'postres': postresRef
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products');
        if (!res.ok) throw new Error('Error al cargar productos');
        const data = await res.json();
        console.log('Productos cargados:', data);
        console.log('Primer producto completo:', data[0]);
        setProductos(data);
      } catch (err) {
        console.error('Error cargando productos:', err);
        setError('No se pudieron cargar los productos.');
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // Configuración de categorías del menú
  const categorias = [
    { id: 'hamburguesas', title: 'HAMBURGUESAS', emoji: '🍔', color: '#3E5F8A' },
    { id: 'entrantes', title: 'ENTRADAS', emoji: '🍟', color: '#D4173F' },
    { id: 'acompañamientos', title: 'ACOMPAÑAMIENTOS', emoji: '🧅', color: '#3E5F8A' },
    { id: 'ensaladas', title: 'ENSALADAS', emoji: '🥗', color: '#3E5F8A' },
    { id: 'pastas', title: 'PASTAS', emoji: '🍝', color: '#3E5F8A' },
    { id: 'bebidas-alcoholicas', title: 'BEBIDAS ALCOHÓLICAS', emoji: '🍺', color: '#3E5F8A' },
    { id: 'bebidas-sin-alcohol', title: 'BEBIDAS SIN ALCOHOL', emoji: '🥤', color: '#3E5F8A' },
    { id: 'postres', title: 'POSTRES', emoji: '🍩', color: '#3E5F8A' },
  ];

  // Agrupación de productos por categoría
  const productosPorCategoria = {};
  categorias.forEach(cat => {
    productosPorCategoria[cat.id] = productos.filter(p => p.category === cat.id);
    console.log(`Categoría ${cat.id}:`, productosPorCategoria[cat.id]);
  });

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (producto) => {
    addToCart({
      id: producto._id,
      name: producto.name,
      price: producto.price,
      type: 'product',
      description: producto.description,
      category: producto.category
    });
  };

  return (
    <div className="menu-container">
      <KrustyHeader />
      <div className="menu-content">
        {/* Navegación por categorías */}
        <div className="menu-filters">
          {categorias.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => scrollToSection(refs[cat.id])}
              className={i === 0 ? 'menu-filter-btn' : 'menu-filter-btn-secondary'}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Indicadores de opciones especiales */}
        <div className="menu-options">
          <div className="menu-option">
            <img src="/icon-vegetarian.png" alt="Vegetariano" />
            <span>Opción vegetariana</span>
          </div>
          <div className="menu-option menu-option-spicy">
            <img src="/icon-spicy.png" alt="Picante" />
            <span>Picante intenso</span>
          </div>
          <div className="menu-option">
            <img src="/icon-gluten-free.png" alt="Sin TACC" />
            <span>Opción sin TACC</span>
          </div>
        </div>

        {loading && <p>Cargando productos...</p>}
        {error && <div className="error-message">{error}</div>}

        {/* Renderizado dinámico de secciones de productos */}
        {categorias.map(cat => (
          <section key={cat.id} ref={refs[cat.id]} className="menu-section">
            <h2 className="menu-section-title">{cat.title} {cat.emoji}</h2>
            <div className="menu-products-grid">
              {productosPorCategoria[cat.id] && productosPorCategoria[cat.id].length > 0 ? (
                productosPorCategoria[cat.id].map((item, index) => (
                  <div key={item._id || index} className="menu-product-card">
                    <img src={item.image || '/placeholder.svg'} alt={item.name} className="menu-product-image" />
                    <div className="menu-product-content">
                      <div className="menu-product-header">
                        <h3 className="menu-product-title">{item.name}</h3>
                      </div>
                      <p className="menu-product-description">{item.description}</p>
                      <div className="menu-product-variants">
                        <span className="menu-product-variant">
                          ${item.price}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="menu-product-button"
                      >
                        🛒 Agregar al Carrito
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-state">No hay productos en esta categoría.</p>
              )}
            </div>
          </section>
        ))}
      </div>
      <KrustyFooter />
    </div>
  );
} 