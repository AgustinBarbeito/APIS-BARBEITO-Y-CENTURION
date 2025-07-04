import React from 'react';
import KrustyHeader from '../components/krusty-header';
import KrustyFooter from '../components/krusty-footer';

const locations = [
  {
    name: 'Krusty Burger Springfield',
    address: '742 Evergreen Terrace, Springfield',
    phone: '555-KRUSTY',
    image: '/springfield-location.png',
  },
  {
    name: 'Krusty Burger Centro Comercial',
    address: 'Springfield Mall, Local 42',
    phone: '555-BURGER',
    image: '/mall-location.png',
  },
  {
    name: 'Krusty Burger Shelbyville',
    address: 'Shelbyville Plaza, Shelbyville',
    phone: '555-KRUST',
    image: '/shelbyville-location.png',
  },
];

export default function Ubicaciones() {
  return (
    <div className="locations-container">
      <KrustyHeader />
      <div className="locations-content">
        <div className="locations-header">
          <h2 className="locations-title">
            UBICACIONES
          </h2>
          <div className="locations-subtitle">
            <p>"Estamos en todas partes, como la culpa" - Krusty el Payaso</p>
          </div>
        </div>

        <div className="locations-grid">
          {locations.map((location, index) => (
            <div
              key={index}
              className="locations-card"
              style={{ transform: `rotate(${Math.random() * 2 - 1}deg)` }}
            >
              <div className="locations-card-header">
                <h3 className="locations-card-title">
                  {location.name}
                </h3>
              </div>
              <div className="locations-card-content">
                <div className="locations-image-container">
                  <img
                    src={location.image || "/placeholder.svg"}
                    alt={location.name}
                    className="locations-image"
                  />
                </div>
                <div className="locations-info">
                  <p className="locations-address">{location.address}</p>
                  <p className="locations-phone">Tel: {location.phone}</p>
                  <button className="locations-button">
                    CÓMO LLEGAR
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <KrustyFooter />
    </div>
  );
} 