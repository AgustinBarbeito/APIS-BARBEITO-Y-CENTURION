import React from 'react';
import KrustyHeader from '../components/krusty-header';
import KrustyFooter from '../components/krusty-footer';

export default function Nosotros() {
  return (
    <div className="nosotros-container">
      <KrustyHeader />
      <main className="nosotros-main">
        {/* TÍTULO Y FRASE */}
        <section className="nosotros-section">
          <div className="nosotros-header">
            <h1 className="nosotros-title">NUESTRA HISTORIA</h1>
            <p className="nosotros-subtitle">"Donde la comida es tan graciosa como un ataque al corazón" - Krusty el Payaso</p>
          </div>

          {/* HISTORIA PRINCIPAL */}
          <div className="nosotros-history">
            <div className="nosotros-history-content">
              <h2 className="nosotros-history-title">Desde 1989, alimentando a Springfield</h2>
              <p className="nosotros-history-text">Krusty Burger abrió sus puertas en 1989 como parte del imperio comercial de Krusty el Payaso. Lo que comenzó como una pequeña hamburguesería en Springfield se ha convertido en una cadena internacional con más de 300 locales en todo el país.</p>
              <p className="nosotros-history-text">Nuestra receta secreta, desarrollada por el propio Krusty (y varios químicos alimentarios), ha permanecido prácticamente sin cambios durante décadas. ¿Por qué cambiar algo que ya es perfectamente mediocre?</p>
              <div className="nosotros-warning">"Los ingredientes pueden contener pedazos de payaso" - Advertencia legal</div>
            </div>
            <div className="nosotros-history-image">
              <img src="/krusty-exterior.png" alt="Krusty Burger Springfield" />
            </div>
          </div>

          {/* BURGER² - ÉXITO Y FRACASO */}
          <div className="nosotros-burger2">
            <h2 className="nosotros-burger2-title">BURGER² - NUESTRO MAYOR ÉXITO (Y FRACASO)</h2>
            <div className="nosotros-burger2-content">
              <div className="nosotros-burger2-column">
                <img src="/kent-burger-cuadrado.png" alt="Burger2 Lanzamiento" className="nosotros-burger2-image" />
                <h3 className="nosotros-burger2-subtitle">El concepto revolucionario</h3>
                <p className="nosotros-burger2-text">La Burger² utilizaba un proceso patentado donde la carne de vaca se usaba como alimento para otra vaca, que luego era procesada en hamburguesa. Esto creaba una hamburguesa "al cuadrado" - dos vacas en una.</p>
                <p className="nosotros-burger2-text">Según los científicos de Krusty Burger, este proceso "duplicaba el sabor a vaca" sin necesidad de usar más carne, ahorrando millones en costos de producción.</p>
                <div className="nosotros-burger2-quote">"La FDA aún está investigando cómo logramos alimentar vacas con carne de vaca sin violar las leyes de la naturaleza. Nosotros también queremos saberlo." - Departamento Legal de Krusty Burger</div>
              </div>
              <div className="nosotros-burger2-column">
                <h3 className="nosotros-burger2-subtitle">El lanzamiento que hizo historia</h3>
                <p className="nosotros-burger2-text">En 1994, Krusty Burger revolucionó la industria con el lanzamiento de la "Burger²" (Burger al Cuadrado), un concepto innovador que prometía "el doble de sabor con la misma cantidad de carne".</p>
                <p className="nosotros-burger2-text">El evento fue cubierto por Kent Brockman de Canal 6, quien describió la hamburguesa como "un avance culinario que desafía tanto a la lógica como a las leyes de la física".</p>
                <div className="nosotros-burger2-quote-blue">"Es como comer dos hamburguesas, pero solo pagas por una y media... ¡y solo comes una!" - Krusty el Payaso</div>
                <img src="/burger-cuadrado-explicacion.png" alt="Burger2 Explicación" className="nosotros-burger2-image" />
              </div>
            </div>
            <h3 className="nosotros-burger2-result">El resultado inesperado</h3>
            <p className="nosotros-burger2-text">Aunque inicialmente fue un éxito de ventas, la Burger² tuvo que ser retirada del mercado después de que varios clientes reportaran efectos secundarios como "sabor a déjà vu" y "sensación de estar comiendo la misma hamburguesa dos veces".</p>
            <p className="nosotros-burger2-text">A pesar de las controversias, algunos clientes como Homer Simpson se convirtieron en fanáticos leales de la Burger².</p>
            <div className="nosotros-warning">"Después de 15 demandas y una investigación del Departamento de Salud, decidimos que era mejor volver a nuestras hamburguesas tradicionales, que solo causan problemas cardíacos normales." - Krusty el Payaso</div>
            <img src="/krusty-gone-crazy.gif" alt="Homer Burger" className="nosotros-burger2-final-image" />
            <p className="nosotros-burger2-caption">La reacción de los clientes fue mixta, pero las imágenes de Homer disfrutando la hamburguesa se volvieron virales en Springfield.</p>
            <img src="/krusty-fila.png" alt="Fila Krusty Burger" className="nosotros-burger2-final-image" />
            <p className="nosotros-burger2-caption">A pesar de los escándalos, la gente sigue haciendo fila para probar nuestras creaciones.</p>
          </div>

          {/* EXPERIENCIA ÚNICA */}
          <div className="nosotros-experience">
            <h2 className="nosotros-experience-title">UNA EXPERIENCIA ÚNICA</h2>
            <div className="nosotros-experience-grid">
              <div className="nosotros-experience-card">
                <img src="/krusty-familia.png" alt="Para toda la familia" className="nosotros-experience-image" />
                <h3 className="nosotros-experience-subtitle">Para toda la familia</h3>
                <p className="nosotros-experience-text">Un lugar donde las familias pueden disfrutar de comidas económicas en un ambiente lleno de colores y personajes divertidos. ¡Incluso Marge aprueba nuestras ensaladas!</p>
              </div>
              <div className="nosotros-experience-card">
                <img src="/krusty-juegos.png" alt="Diversión garantizada" className="nosotros-experience-image" />
                <h3 className="nosotros-experience-subtitle">Diversión garantizada</h3>
                <p className="nosotros-experience-text">Nuestras áreas de juegos están diseñadas para que los niños se diviertan mientras los adultos disfrutan de un momento de paz. ¡Piscina de pelotas desinfectada mensualmente!</p>
              </div>
              <div className="nosotros-experience-card">
                <img src="/krusty-autoservicio.png" alt="Servicio rápido" className="nosotros-experience-image" />
                <h3 className="nosotros-experience-subtitle">Servicio rápido</h3>
                <p className="nosotros-experience-text">Nuestro autoservicio te permite disfrutar de tu Krusty Burger sin salir del auto. Ideal para cuando tienes prisa o simplemente no quieres que te vean comiendo aquí.</p>
              </div>
            </div>
          </div>

          {/* SABÍAS QUE... */}
          <div className="nosotros-facts">
            <h2 className="nosotros-facts-title">¿SABÍAS QUE...?</h2>
            <div className="nosotros-facts-grid">
              <div className="nosotros-facts-card">
                <div className="nosotros-facts-header">
                  <span className="nosotros-facts-number">1</span>
                  <span className="nosotros-facts-subtitle">Clientes ilustres</span>
                </div>
                <p className="nosotros-facts-text">El ex-presidente Bush visitó nuestro local en 1992, declarando que nuestras hamburguesas eran "tan americanas como el pastel de manzana".</p>
                <img src="/krusty-bush.png" alt="Clientes ilustres" className="nosotros-facts-image" />
              </div>
              <div className="nosotros-facts-card">
                <div className="nosotros-facts-header">
                  <span className="nosotros-facts-number-red">2</span>
                  <span className="nosotros-facts-subtitle">Personal comprometido</span>
                </div>
                <p className="nosotros-facts-text">Nuestros empleados son seleccionados entre los mejores... disponibles. Incluso Moe Szyslak trabajó con nosotros antes de abrir su taberna.</p>
                <img src="/empleados-krusty.png" alt="Personal comprometido" className="nosotros-facts-image" />
              </div>
            </div>
          </div>

          {/* BANNER FINAL */}
          <div className="nosotros-banner">
            "Si no te gusta nuestra comida, tenemos un formulario de quejas que va directo a la trituradora" - Krusty el Payaso
          </div>
        </section>
      </main>
      <KrustyFooter />
    </div>
  );
} 