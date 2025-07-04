import React from 'react';
import KrustyHeader from '../components/krusty-header';
import KrustyFooter from '../components/krusty-footer';
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <div className="home-container">
      <KrustyHeader />
      <main className="home-main">
        {/* HERO */}
        <section className="home-hero-section">
          <div className="home-hero-left">
            <h1 className="home-hero-title">KRUSTY BURGER</h1>
            <p className="home-hero-subtitle">Las mejores hamburguesas de Springfield, ahora en tu ciudad.</p>
            <div className="home-hero-buttons">
              <Link to="/menu">
                <button className="home-menu-button">VER MENÚ</button>
              </Link>
              <Link to="/nosotros">
                <button className="home-about-button">CONÓCENOS</button>
              </Link>
            </div>
          </div>
          <div className="home-hero-right">
            <img src="/krusty-burger-logo.png" alt="Krusty Burger Logo" width={350} height={350} />
          </div>
        </section>

        {/* ESPECIALIDADES */}
        <section className="home-specialties-section">
          <div className="home-specialties-header">
            <div className="home-specialties-title-container">
              <h2 className="home-specialties-title">NUESTRAS ESPECIALIDADES</h2>
              <div className="home-specialties-title-bg"></div>
            </div>
          </div>
          <div className="home-specialties-cards">
            {/* Card Menú */}
            <div className="home-menu-card">
              <img src="/homer-bart-milhouse.png" alt="Menú Krusty Burger" className="home-card-image" />
              <h3 className="home-card-title">DESCUBRE NUESTRO MENÚ COMPLETO</h3>
              <p className="home-card-description">Disfruta de nuestras Krusty Burgers, Papas Krusty, Nuggets Tomy y Daly y Buzz Cola. Como dice Krusty: "Si no te da un ataque al corazón, ¡te devolvemos tu dinero!" (Oferta no válida en Springfield ni alrededores).</p>
              <Link to="/menu">
                <button className="home-card-button home-menu-card-button">
                  VER MENÚ COMPLETO <span className="arrow">→</span>
                </button>
              </Link>
            </div>
            {/* Card Costiburger */}
            <div className="home-costiburger-card">
              <div className="home-new-badge">NUEVO</div>
              <h3 className="home-card-title home-costiburger-title">
                <span role="img" aria-label="costiburger">🐷</span>COSTIBURGER
              </h3>
              <img src="/costiburger.png" alt="Costiburger" className="home-card-image" />
              <p className="home-card-description">Nuestra promoción estrella inspirada en la McRib. Deliciosas costillitas de cerdo, salsa BBQ, cebolla y pepinillos. ¡Una experiencia gastronómica que Homero Simpson aprobaría!</p>
              <div className="home-costiburger-footer">
                <div className="home-costiburger-price">
                  <span className="home-price-label">PRECIO ESPECIAL</span>
                  <span className="home-price-value">$8500</span>
                </div>
                <Link to="/menu">
                  <button className="home-card-button home-costiburger-button">ORDENAR AHORA</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* NUESTRA HISTORIA */}
        <section className="home-history-section">
          <div className="home-history-header">
            <h2 className="home-history-title">NUESTRA HISTORIA</h2>
            <p className="home-history-subtitle">Desde 1989, Krusty Burger ha sido parte de la vida de Springfield. Descubre nuestra historia, nuestros éxitos y algunos fracasos memorables como la legendaria "Burger²".</p>
            <Link to="/nosotros">
              <button className="home-history-button">CONOCE MÁS</button>
            </Link>
          </div>
          <div className="home-history-images">
            <img src="/homer-bart-milhouse.png" alt="Clientes disfrutando en Krusty Burger" className="home-history-image" />
            <img src="/krusty-exterior.png" alt="Krusty Burger Original" className="home-history-image" />
            <img src="/krusty-familia.png" alt="Experiencia familiar" className="home-history-image" />
          </div>
        </section>
      </main>
      <KrustyFooter />
    </div>
  );
} 