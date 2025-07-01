import React from 'react';

export default function KrustyNosotros() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Nuestra Historia</h1>
        <div className="prose prose-lg mx-auto">
          <p className="mb-6">
            Krusty Burger nació en Springfield como el sueño de Krusty el Payaso, quien quería ofrecer a la comunidad las mejores hamburguesas de la ciudad.
          </p>
          <p className="mb-6">
            Desde nuestros inicios, nos hemos comprometido a servir comida de la más alta calidad, utilizando ingredientes frescos y recetas únicas que nos han convertido en un ícono de la gastronomía local.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Nuestra Misión</h2>
              <p>
                Ofrecer la mejor experiencia gastronómica en comida rápida, manteniendo los más altos estándares de calidad y servicio.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Nuestra Visión</h2>
              <p>
                Ser reconocidos como el mejor restaurante de comida rápida de Springfield, expandiendo nuestra presencia mientras mantenemos la calidad que nos caracteriza.
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 p-8 rounded-lg my-12">
            <h2 className="text-2xl font-bold mb-4">Nuestros Valores</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Calidad en cada ingrediente</li>
              <li>Servicio excepcional</li>
              <li>Innovación constante</li>
              <li>Compromiso con la comunidad</li>
              <li>Satisfacción del cliente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 