import React, { useRef } from 'react';
import KrustyHeader from '../components/krusty-header';
import KrustyFooter from '../components/krusty-footer';

const sections = [
  {
    id: 'hamburguesas',
    title: 'HAMBURGUESAS',
    color: '#3E5F8A',
    items: [
      {
        name: 'KRUSTY BURGER DELUXE',
        emoji: '🍔',
        image: '/krusty-burger-deluxe.png',
        desc: 'Triple carne, queso cheddar, panceta crocante, cebolla caramelizada y salsa secreta Krusty.',
        phrase: '"¡Tan buena que olvidás la carne contaminada!"',
        variants: [
          { label: 'SIMPLE', price: 10500 },
          { label: 'DOBLE', price: 13000 },
        ],
      },
      {
        name: 'LA LISA VEGGIE',
        emoji: '🌱',
        image: '/lisa-veggie.png',
        desc: 'Hamburguesa de garbanzos y espinaca, con tomate, palta y alioli vegano.',
        phrase: '"Sin sufrimiento animal, ni sufrimiento del paladar."',
        variants: [
          { label: 'VEGGIE', price: 9500 },
        ],
        icons: ['veggie'],
      },
      {
        name: 'MOE MACABRA',
        emoji: '🔥',
        image: '/moe-macabra.png',
        desc: 'Medallón de carne picante, queso azul, pepinos encurtidos y jalapeños.',
        phrase: '"Oscura como el alma de Moe."',
        variants: [
          { label: 'SIMPLE', price: 9800 },
          { label: 'DOBLE', price: 12000 },
        ],
        icons: ['spicy'],
      },
      {
        name: 'LA BARTMAN',
        emoji: '🐔',
        image: '/bartman-burger.png',
        desc: 'Medallón empanizado y frito, cheddar, nachos triturados, barbacoa dulce y cebolla crujiente.',
        phrase: '"¡Ay caramba!"',
        variants: [
          { label: 'SIMPLE', price: 9000 },
          { label: 'DELUXE', price: 12000 },
        ],
      },
      {
        name: 'LA EXCELENTE',
        emoji: '💰',
        image: '/la excelente.png',
        desc: 'Carne de wagyu (o eso dice el menú), queso brie, rúcula y cebolla morada.',
        phrase: '"Excelente."',
        variants: [
          { label: 'SIMPLE', price: 11500 },
          { label: 'DOBLE', price: 14500 },
        ],
      },
      {
        name: 'LA RADIACTIVA REAL',
        emoji: '👑',
        image: '/radiactiva-burger.png',
        desc: 'Una bomba de cheddar, jalapeños y cebolla crocante, digna del trono nuclear de Springfield.',
        phrase: '"¡Brilla en la oscuridad!"',
        variants: [
          { label: 'SIMPLE', price: 10000 },
          { label: 'DOBLE', price: 13000 },
        ],
      },
    ],
  },
  {
    id: 'entrantes',
    title: 'ENTRANTES',
    color: '#D4173F',
    items: [
      {
        name: 'CROQUETAS DE PATTY Y SELMA',
        emoji: '🚬',
        image: '/croquetas-patty-selma.png',
        desc: 'Ahumadas, intensas y con sabor fuerte... como las tías.',
        phrase: '"Con un toque de tabaco."',
        variants: [
          { label: '', price: 5500 },
        ],
      },
      {
        name: 'DEDOS DE OTTO',
        emoji: '🎸',
        image: '/dedos-otto.png',
        desc: 'Bastones de mozzarella rebozados, con salsa picante.',
        phrase: '"Muy, muy chill..."',
        variants: [
          { label: '', price: 5800 },
        ],
        icons: ['spicy'],
      },
      {
        name: 'MINI PANCHOS DE AYUDANTE DE SANTA',
        emoji: '🌭',
        image: '/mini-panchos.png',
        desc: 'Mini hot dogs con ketchup, mostaza y cebolla frita.',
        phrase: '"¡Guau, guau!"',
        variants: [
          { label: '', price: 6200 },
        ],
      },
    ],
  },
  {
    id: 'acompañamientos',
    title: 'ACOMPAÑAMIENTOS',
    color: '#3E5F8A',
    items: [
      {
        name: 'PAPAS KRUSTY',
        emoji: '🍟',
        image: '/papas-fritas.png',
        desc: 'Papas fritas con sal y pimienta. Crujientes por fuera, suaves por dentro.',
        phrase: '"¡Las favoritas de Springfield!"',
        variants: [
          { label: '', price: 4500 },
        ],
      },
      {
        name: 'AROS DE CEBOLLA',
        emoji: '🧅',
        image: '/onion-rings.png',
        desc: 'Aros de cebolla fritos y crujientes. Con rebozado especial Krusty.',
        phrase: '"Redondos como las donas de Homero."',
        variants: [
          { label: '', price: 5000 },
        ],
      },
      {
        name: 'NUGGETS TOMY Y DALY',
        emoji: '🐭',
        image: '/nuggets-tomy-daly.png',
        desc: '6 unidades con salsa a elección. Forma de ratón o gato según disponibilidad.',
        phrase: '"¡Violentamente deliciosos!"',
        variants: [
          { label: '', price: 6000 },
        ],
      },
    ],
  },
  {
    id: 'ensaladas',
    title: 'ENSALADAS',
    color: '#3E5F8A',
    items: [
      {
        name: 'ENSALADA LISA LA VEGETARIANA',
        emoji: '🥗',
        image: '/ensalada-lisa.png',
        desc: 'Orgánica, fresca, con tofu marinado, zanahoria rallada, rúcula y semillas.',
        phrase: '"Aprobada por activistas."',
        variants: [
          { label: '', price: 7500 },
        ],
        icons: ['veggie'],
      },
      {
        name: 'CÉSAR FLANDERS',
        emoji: '🙏',
        image: '/cesar-flanders.png',
        desc: 'Tradicional ensalada César, con crutones bendecidos.',
        phrase: '"¡Hola-Hola vecino saludable!"',
        variants: [
          { label: '', price: 7000 },
        ],
      },
      {
        name: 'SPRINGFIELD MIXTA',
        emoji: '🥚',
        image: '/springfield-mixta.png',
        desc: 'Lechuga, tomate, cebolla morada, huevo duro y aderezo duff-mostaza.',
        phrase: '"Simple pero efectiva."',
        variants: [
          { label: '', price: 6500 },
        ],
      },
    ],
  },
  {
    id: 'pastas',
    title: 'PASTAS',
    color: '#3E5F8A',
    items: [
      {
        name: 'SPAGHETTI A LO LUIGI',
        emoji: '🍝',
        image: '/spaghetti-luigi.png',
        desc: 'Con albóndigas gigantes y salsa pomodoro estilo Springfield.',
        phrase: '"¡Mamma mia, qué delicia!"',
        variants: [
          { label: '', price: 8500 },
        ],
      },
      {
        name: 'RAVIOLES DEL ABUELO SIMPSON',
        emoji: '🥟',
        image: '/ravioles-abuelo.png',
        desc: 'Rellenos de carne, con salsa de crema y queso... ',
        phrase: '"Con historias incluidas."',
        variants: [
          { label: '', price: 9000 },
        ],
      },
      {
        name: 'FIDEOS DE BART AL PESTO',
        emoji: '😈',
        image: '/fideos-bart.png',
        desc: 'Traviesos, verdes y deliciosos. Con albahaca fresca y piñones.',
        phrase: '"¡Cómete mis shorts!"',
        variants: [
          { label: '', price: 8000 },
        ],
      },
    ],
  },
  {
    id: 'bebidas-alcoholicas',
    title: 'BEBIDAS ALCOHÓLICAS',
    color: '#3E5F8A',
    items: [
      {
        name: 'CERVEZA DUFF CLÁSICA',
        emoji: '🍺',
        image: '/duff clasica.png',
        desc: 'El alma de Springfield. Fría y espumosa.',
        phrase: '"La cerveza oficial de Homero Simpson."',
        variants: [
          { label: '', price: 5000 },
        ],
      },
      {
        name: 'DUFF NEGRA LENNY & CARL',
        emoji: '🖤',
        image: '/duff-negra.png',
        desc: 'Más intensa. Para hablar de la vida en la barra.',
        phrase: '"Para momentos filosóficos."',
        variants: [
          { label: '', price: 5500 },
        ],
      },
      {
        name: 'LLAMARADA MOE',
        emoji: '🔥',
        image: '/llamarada-moe.png',
        desc: '¡Arde al servirlo! Mezcla secreta de licores.',
        phrase: '"Versión sin fuego disponible."',
        variants: [
          { label: '', price: 7000 },
        ],
      },
    ],
  },
  {
    id: 'bebidas-sin-alcohol',
    title: 'BEBIDAS SIN ALCOHOL',
    color: '#3E5F8A',
    items: [
      {
        name: 'BUZZ COLA',
        emoji: '🥤',
        image: '/buzz cola.png',
        desc: 'La bebida oficial de Springfield. Con cafeína extra.',
        phrase: '"¡El secreto está en el jarabe!"',
        variants: [
          { label: '', price: 3500 },
        ],
      },
      {
        name: 'MALTEADA DE CHOCOLATE RAFITA',
        emoji: '🍫',
        image: '/malteada-rafita.png',
        desc: 'Muy dulce, con extra crema y chispas de chocolate.',
        phrase: '"¡Sabe a arcoíris!"',
        variants: [
          { label: '', price: 4800 },
        ],
      },
      {
        name: 'AGUA DE FLANDERS',
        emoji: '💧',
        image: '/agua-flanders.png',
        desc: 'Filtrada. Bendecida. Sospechosamente buena.',
        phrase: '"Hidratación divina."',
        variants: [
          { label: '', price: 3000 },
        ],
      },
    ],
  },
  {
    id: 'postres',
    title: 'POSTRES',
    color: '#3E5F8A',
    items: [
      {
        name: 'DONA EXPLOSIVA HOMERO',
        emoji: '🍩',
        image: '/dona.png',
        desc: 'Donas XL con glaseado rosa y chispas multicolor.',
        phrase: '"Mmm... donas."',
        variants: [
          { label: '', price: 4000 },
        ],
      },
      {
        name: 'TARTA DE MANZANA DE LA ABUELA BOUVIER',
        emoji: '🥧',
        image: '/tarta-abuela.png',
        desc: 'Clásica, tibia y con aroma a nostalgia.',
        phrase: '"Receta de cinco generaciones."',
        variants: [
          { label: '', price: 4500 },
        ],
      },
      {
        name: 'HELADO KRUSTY CREAM',
        emoji: '🍦',
        image: '/helado-krusty.png',
        desc: 'Tres sabores, galletitas rotas y una risa grabada.',
        phrase: '"¡Jajaja! (risa de payaso)"',
        variants: [
          { label: '', price: 5000 },
        ],
      },
    ],
  },
];

export default function Menu() {
  const costiburgerRef = useRef(null);
  const hamburguesasRef = useRef(null);
  const entrantesRef = useRef(null);
  const acompañamientosRef = useRef(null);
  const ensaladasRef = useRef(null);
  const pastasRef = useRef(null);
  const bebidasAlcoholicasRef = useRef(null);
  const bebidasSinAlcoholRef = useRef(null);
  const postresRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="menu-container">
      <KrustyHeader />
      <div className="menu-content">
        {/* Filtro de categorías */}
        <div className="menu-filters">
          <button onClick={() => scrollToSection(costiburgerRef)} className="menu-filter-btn">NUEVA COSTIBURGER</button>
          <button onClick={() => scrollToSection(hamburguesasRef)} className="menu-filter-btn-secondary">HAMBURGUESAS</button>
          <button onClick={() => scrollToSection(entrantesRef)} className="menu-filter-btn-secondary">ENTRADAS</button>
          <button onClick={() => scrollToSection(acompañamientosRef)} className="menu-filter-btn-secondary">ACOMPAÑAMIENTOS</button>
          <button onClick={() => scrollToSection(ensaladasRef)} className="menu-filter-btn-secondary">ENSALADAS</button>
          <button onClick={() => scrollToSection(pastasRef)} className="menu-filter-btn-secondary">PASTAS</button>
          <button onClick={() => scrollToSection(bebidasAlcoholicasRef)} className="menu-filter-btn-secondary">BEBIDAS ALCOHÓLICAS</button>
          <button onClick={() => scrollToSection(bebidasSinAlcoholRef)} className="menu-filter-btn-secondary">BEBIDAS SIN ALCOHOL</button>
          <button onClick={() => scrollToSection(postresRef)} className="menu-filter-btn-secondary">POSTRES</button>
        </div>

        {/* Barra de opciones */}
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

        {/* Sección Costiburger */}
        <section ref={costiburgerRef} className="menu-costiburger-section">
          <div className="menu-costiburger-container">
            <div className="menu-costiburger-badge">
              <span>PROMOCIÓN ESPECIAL</span>
            </div>
            <h2 className="menu-costiburger-title">¡NUEVA COSTIBURGER!</h2>
            <p className="menu-costiburger-description">
              La hamburguesa favorita de Homero, ahora en Krusty Burger.<br />
              ¡Con salsa barbacoa y sin lechuga!
            </p>
            <div className="menu-costiburger-content">
              <div className="menu-costiburger-image">
                <img src="/costiburger 2.png" alt="Costiburger" />
              </div>
              <div className="menu-costiburger-details">
                <p>Medallón de carne, salsa barbacoa, cebolla crispy, pan de papa y mucho sabor.</p>
                <div className="menu-costiburger-buttons">
                  <button className="menu-costiburger-btn">Simple $12000</button>
                  <button className="menu-costiburger-btn menu-costiburger-btn-dark">Doble $15000</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secciones de productos */}
        <section ref={hamburguesasRef} className="menu-section">
          <h2 className="menu-section-title">HAMBURGUESAS 🍔</h2>
          <div className="menu-products-grid">
            {sections[0].items.map((item, index) => (
              <div key={index} className="menu-product-card">
                <img src={item.image} alt={item.name} className="menu-product-image" />
                <div className="menu-product-content">
                  <div className="menu-product-header">
                    <h3 className="menu-product-title">{item.name}</h3>
                    {item.icons && (
                      <div className="menu-product-icons">
                        {item.icons.map((icon, i) => (
                          <img key={i} src={icon === 'veggie' ? '/icon-vegetarian.png' : `/icon-${icon}.png`} alt={icon} />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="menu-product-description">{item.desc}</p>
                  <p className="menu-product-quote">{item.phrase}</p>
                  <div className="menu-product-variants">
                    {item.variants.map((variant, i) => (
                      <span key={i} className="menu-product-variant">
                        {variant.label} ${variant.price}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={entrantesRef} className="menu-section">
          <h2 className="menu-section-title">ENTRADAS 🍟</h2>
          <div className="menu-products-grid">
            {sections[1].items.map((item, index) => (
              <div key={index} className="menu-product-card">
                <img src={item.image} alt={item.name} className="menu-product-image" />
                <div className="menu-product-content">
                  <div className="menu-product-header">
                    <h3 className="menu-product-title">{item.name}</h3>
                    {item.icons && (
                      <div className="menu-product-icons">
                        {item.icons.map((icon, i) => (
                          <img key={i} src={icon === 'veggie' ? '/icon-vegetarian.png' : `/icon-${icon}.png`} alt={icon} />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="menu-product-description">{item.desc}</p>
                  <p className="menu-product-quote">{item.phrase}</p>
                  <div className="menu-product-variants">
                    {item.variants.map((variant, i) => (
                      <span key={i} className="menu-product-variant">
                        {variant.label} ${variant.price}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={acompañamientosRef} className="menu-section">
          <h2 className="menu-section-title">ACOMPAÑAMIENTOS 🧅</h2>
          <div className="menu-products-grid">
            {sections[2].items.map((item, index) => (
              <div key={index} className="menu-product-card">
                <img src={item.image} alt={item.name} className="menu-product-image" />
                <div className="menu-product-content">
                  <div className="menu-product-header">
                    <h3 className="menu-product-title">{item.name}</h3>
                    {item.icons && (
                      <div className="menu-product-icons">
                        {item.icons.map((icon, i) => (
                          <img key={i} src={icon === 'veggie' ? '/icon-vegetarian.png' : `/icon-${icon}.png`} alt={icon} />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="menu-product-description">{item.desc}</p>
                  <p className="menu-product-quote">{item.phrase}</p>
                  <div className="menu-product-variants">
                    {item.variants.map((variant, i) => (
                      <span key={i} className="menu-product-variant">
                        {variant.label} ${variant.price}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={ensaladasRef} className="menu-section">
          <h2 className="menu-section-title">ENSALADAS 🥗</h2>
          <div className="menu-products-grid">
            {sections[3].items.map((item, index) => (
              <div key={index} className="menu-product-card">
                <img src={item.image} alt={item.name} className="menu-product-image" />
                <div className="menu-product-content">
                  <div className="menu-product-header">
                    <h3 className="menu-product-title">{item.name}</h3>
                    {item.icons && (
                      <div className="menu-product-icons">
                        {item.icons.map((icon, i) => (
                          <img key={i} src={icon === 'veggie' ? '/icon-vegetarian.png' : `/icon-${icon}.png`} alt={icon} />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="menu-product-description">{item.desc}</p>
                  <p className="menu-product-quote">{item.phrase}</p>
                  <div className="menu-product-variants">
                    {item.variants.map((variant, i) => (
                      <span key={i} className="menu-product-variant">
                        {variant.label} ${variant.price}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={pastasRef} className="menu-section">
          <h2 className="menu-section-title">PASTAS 🍝</h2>
          <div className="menu-products-grid">
            {sections[4].items.map((item, index) => (
              <div key={index} className="menu-product-card">
                <img src={item.image} alt={item.name} className="menu-product-image" />
                <div className="menu-product-content">
                  <div className="menu-product-header">
                    <h3 className="menu-product-title">{item.name}</h3>
                    {item.icons && (
                      <div className="menu-product-icons">
                        {item.icons.map((icon, i) => (
                          <img key={i} src={icon === 'veggie' ? '/icon-vegetarian.png' : `/icon-${icon}.png`} alt={icon} />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="menu-product-description">{item.desc}</p>
                  <p className="menu-product-quote">{item.phrase}</p>
                  <div className="menu-product-variants">
                    {item.variants.map((variant, i) => (
                      <span key={i} className="menu-product-variant">
                        {variant.label} ${variant.price}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={bebidasAlcoholicasRef} className="menu-section">
          <h2 className="menu-section-title">BEBIDAS ALCOHÓLICAS 🍺</h2>
          <div className="menu-products-grid">
            {sections[5].items.map((item, index) => (
              <div key={index} className="menu-product-card">
                <img src={item.image} alt={item.name} className="menu-product-image" />
                <div className="menu-product-content">
                  <div className="menu-product-header">
                    <h3 className="menu-product-title">{item.name}</h3>
                    {item.icons && (
                      <div className="menu-product-icons">
                        {item.icons.map((icon, i) => (
                          <img key={i} src={icon === 'veggie' ? '/icon-vegetarian.png' : `/icon-${icon}.png`} alt={icon} />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="menu-product-description">{item.desc}</p>
                  <p className="menu-product-quote">{item.phrase}</p>
                  <div className="menu-product-variants">
                    {item.variants.map((variant, i) => (
                      <span key={i} className="menu-product-variant">
                        {variant.label} ${variant.price}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={bebidasSinAlcoholRef} className="menu-section">
          <h2 className="menu-section-title">BEBIDAS SIN ALCOHOL 🥤</h2>
          <div className="menu-products-grid">
            {sections[6].items.map((item, index) => (
              <div key={index} className="menu-product-card">
                <img src={item.image} alt={item.name} className="menu-product-image" />
                <div className="menu-product-content">
                  <div className="menu-product-header">
                    <h3 className="menu-product-title">{item.name}</h3>
                    {item.icons && (
                      <div className="menu-product-icons">
                        {item.icons.map((icon, i) => (
                          <img key={i} src={icon === 'veggie' ? '/icon-vegetarian.png' : `/icon-${icon}.png`} alt={icon} />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="menu-product-description">{item.desc}</p>
                  <p className="menu-product-quote">{item.phrase}</p>
                  <div className="menu-product-variants">
                    {item.variants.map((variant, i) => (
                      <span key={i} className="menu-product-variant">
                        {variant.label} ${variant.price}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section ref={postresRef} className="menu-section">
          <h2 className="menu-section-title">POSTRES 🍩</h2>
          <div className="menu-products-grid">
            {sections[7].items.map((item, index) => (
              <div key={index} className="menu-product-card">
                <img src={item.image} alt={item.name} className="menu-product-image" />
                <div className="menu-product-content">
                  <div className="menu-product-header">
                    <h3 className="menu-product-title">{item.name}</h3>
                    {item.icons && (
                      <div className="menu-product-icons">
                        {item.icons.map((icon, i) => (
                          <img key={i} src={icon === 'veggie' ? '/icon-vegetarian.png' : `/icon-${icon}.png`} alt={icon} />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="menu-product-description">{item.desc}</p>
                  <p className="menu-product-quote">{item.phrase}</p>
                  <div className="menu-product-variants">
                    {item.variants.map((variant, i) => (
                      <span key={i} className="menu-product-variant">
                        {variant.label} ${variant.price}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección final */}
        <div className="menu-footer-section">
          <div className="menu-footer-card">
            <p className="menu-footer-text">"Si encuentras un dedo en tu comida, ¡felicidades! ¡Has ganado un cupón de descuento!"</p>
            <p className="menu-footer-disclaimer">*Krusty Burger no se hace responsable por dedos, uñas, dientes u otros apéndices encontrados en sus productos.</p>
          </div>
        </div>
      </div>
      <KrustyFooter />
    </div>
  );
} 