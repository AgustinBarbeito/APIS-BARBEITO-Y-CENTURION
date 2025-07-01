"use client"

import { KrustyHeader } from "@/components/krusty-header.jsx"
import { KrustyFooter } from "@/components/krusty-footer.jsx"
import Image from "next/image"
import { BurgerCard } from "@/components/burger-card.jsx"
import { ProductCard } from "@/components/product-card.jsx"
import { QuantitySelector } from "@/components/quantity-selector.jsx"
import { IngredientSelector } from "@/components/ingredient-selector.jsx"
import { useCart } from "@/context/cart-context.jsx"
import { useState, useRef } from "react"

// Lista de ingredientes para la Costiburger
const costiburgerIngredients = [
  { id: "1", name: "Costillitas de cerdo", price: 0, default: true, isAnimal: true },
  { id: "2", name: "Salsa BBQ", price: 0, default: true, isAnimal: false },
  { id: "3", name: "Cebolla", price: 0, default: true, isAnimal: false },
  { id: "4", name: "Pepinillos", price: 0, default: true, isAnimal: false },
  { id: "5", name: "Queso cheddar", price: 0, default: false, isAnimal: true },
  { id: "6", name: "Jalapeños", price: 500, default: false, isAnimal: false },
  { id: "7", name: "Salsa picante", price: 300, default: false, isAnimal: false },
  { id: "8", name: "Cebolla caramelizada", price: 600, default: false, isAnimal: false },
]

export default function MenuPage() {
  const { addItem } = useCart()
  const [showCostiburgerQuantity, setShowCostiburgerQuantity] = useState(false)
  const [showCostiburgerIngredients, setShowCostiburgerIngredients] = useState(false)
  const [selectedCostiburgerType, setSelectedCostiburgerType] = useState(null)
  const [selectedCostiburgerQuantity, setSelectedCostiburgerQuantity] = useState(1)

  // Definir los productos con sus propiedades dietéticas
  const burgers = [
    {
      name: "KRUSTY BURGER DELUXE 🍔",
      image: "/krusty-burger-deluxe.png",
      description: "Triple carne, queso cheddar, panceta crocante, cebolla caramelizada y salsa secreta Krusty.",
      quote: "¡Tan buena que olvidás la carne contaminada!",
      prices: {
        simple: "$10500",
        doble: "$13000"
      },
      isVegetarianOption: false,
      isSpicy: false,
      isGlutenFree: true
    },
    {
      name: "LA BARTMAN 🦇",
      image: "/bartman-burger.png",
      description: "Medallón empanizado y frito, cheddar, nachos triturados, barbacoa dulce y cebolla crujiente.",
      quote: "¡Ay caramba!",
      prices: {
        simple: "$9000",
        deluxe: "$12000"
      },
      isVegetarianOption: false,
      isSpicy: false,
      isGlutenFree: false
    },
    {
      name: "LA EXCELENTE 💰",
      image: "/burns-burger.png",
      description: "Carne de wagyu (o eso dice el menú), queso brie, rúcula y cebolla morada.",
      quote: "Excelente.",
      prices: {
        simple: "$11500",
        doble: "$14500"
      },
      isVegetarianOption: true,
      isSpicy: false,
      isGlutenFree: true
    },
    {
      name: "LA LISA VEGGIE 🌱",
      image: "/lisa-veggie.png",
      description: "Hamburguesa de garbanzos y espinaca, con tomate, palta y alioli vegano.",
      quote: "Sin sufrimiento animal, ni sufrimiento del paladar.",
      prices: {
        veggie: "$9500"
      },
      isVegetarianOption: true,
      isSpicy: false,
      isGlutenFree: true
    },
    {
      name: "LA RADIACTIVA REAL 👑",
      image: "/radiactiva-burger.png",
      description: "Carne de res, queso cheddar, cebolla caramelizada, salsa BBQ y aros de cebolla.",
      quote: "¡Excelente!",
      prices: {
        simple: "$10000",
        doble: "$12500"
      },
      isVegetarianOption: false,
      isSpicy: false,
      isGlutenFree: true
    },
    {
      name: "LA MOE MACABRA 💀",
      image: "/moe-macabra.png",
      description: "Carne de res, queso azul, cebolla caramelizada, salsa de whisky y bacon.",
      quote: "¡Moe! ¡Moe! ¡Moe!",
      prices: {
        simple: "$9500",
        doble: "$12000"
      },
      isVegetarianOption: false,
      isSpicy: false,
      isGlutenFree: true
    }
  ]

  const sides = [
    {
      name: "PAPAS KRUSTY 🍟",
      image: "/papas-fritas.png",
      description: "Papas fritas con sal y pimienta. Crujientes por fuera, suaves por dentro.",
      quote: "¡Las favoritas de Springfield!",
      price: "$4500",
      isVegetarianOption: true,
      isSpicy: false,
      isGlutenFree: true,
    },
    {
      name: "AROS DE CEBOLLA 🧅",
      image: "/onion-rings.png",
      description: "Aros de cebolla fritos y crujientes. Con rebozado especial Krusty.",
      quote: "Redondos como las donas de Homero.",
      price: "$5000",
      isVegetarianOption: true,
      isSpicy: false,
      isGlutenFree: false,
    },
    {
      name: "NUGGETS TOMY Y DALY 🐭",
      image: "/nuggets-tomy-daly.png",
      description: "6 unidades con salsa a elección. Forma de ratón o gato según disponibilidad.",
      quote: "¡Violentamente deliciosos!",
      price: "$6000",
      isVegetarianOption: false,
      isSpicy: false,
      isGlutenFree: false,
    },
  ]

  const bebidasSinAlcohol = [
    {
      name: "AGUA FLANDERS",
      image: "/agua-flanders.png",
      description: "Agua mineral con gas y sabor a felicidad.",
      price: "$3500"
    },
    {
      name: "BUZZ COLA",
      image: "/buzz cola.png",
      description: "La bebida oficial de Springfield. Con cafeína extra y sabor a felicidad.",
      price: "$3500"
    },
    {
      name: "MALTEADA DE CHOCOLATE RAFITA",
      image: "/malteada-rafita.png",
      description: "Malteada cremosa con chocolate y galletitas.",
      price: "$4500"
    }
  ];

  const bebidasAlcoholicas = [
    {
      name: "DUFF CLÁSICA",
      image: "/duff clasica.png",
      description: "La cerveza más famosa de Springfield.",
      price: "$5000"
    },
    {
      name: "DUFF NEGRA LENNY Y CARL",
      image: "/duff-negra.png",
      description: "Cerveza negra con sabor a amistad.",
      price: "$5500"
    },
    {
      name: "LLAMARADA MOE",
      image: "/llamarada-moe.png",
      description: "La bebida más famosa de la Taberna de Moe.",
      price: "$6000"
    }
  ];

  const starters = [
    {
      name: "CROQUETAS DE PATTY Y SELMA 🚬",
      image: "/croquetas-patty-selma.png",
      description: "Ahumadas, intensas y con sabor fuerte… como las tías.",
      quote: "Con un toque de tabaco.",
      price: "$5500",
      isVegetarianOption: false,
      isSpicy: false,
      isGlutenFree: false,
    },
    {
      name: "DEDOS DE OTTO 🎸",
      image: "/dedos-otto.png",
      description: "Bastones de mozzarella rebozados, con salsa picante.",
      quote: "Muy, muy chill...",
      price: "$5800",
      isVegetarianOption: true,
      isSpicy: true,
      isGlutenFree: false,
    },
    {
      name: "MINI PANCHOS DE AYUDANTE DE SANTA 🌭",
      image: "/mini-panchos.png",
      description: "Mini hot dogs con ketchup, mostaza y cebolla frita.",
      quote: "¡Guau, guau!",
      price: "$6200",
      isVegetarianOption: false,
      isSpicy: false,
      isGlutenFree: false,
    },
  ]

  const salads = [
    {
      name: "ENSALADA LISA LA VEGETARIANA 🥗",
      image: "/ensalada-lisa.png",
      description: "Orgánica, fresca, con tofu marinado, zanahoria rallada, rúcula y semillas.",
      quote: "Aprobada por activistas.",
      price: "$7500",
      isVegetarianOption: true,
      isSpicy: false,
      isGlutenFree: true,
    },
    {
      name: "CÉSAR FLANDERS 🙏",
      image: "/cesar-flanders.png",
      description: "Tradicional ensalada César, con crutones bendecidos.",
      quote: "¡Hola-Hola vecino saludable!",
      price: "$7000",
      isVegetarianOption: true,
      isSpicy: false,
      isGlutenFree: false,
    },
    {
      name: "SPRINGFIELD MIXTA 🥚",
      image: "/springfield-mixta.png",
      description: "Lechuga, tomate, cebolla morada, huevo duro y aderezo duff-mostaza.",
      quote: "Simple pero efectiva.",
      price: "$6500",
      isVegetarianOption: true,
      isSpicy: false,
      isGlutenFree: true,
    },
  ]

  const pastas = [
    {
      name: "SPAGHETTI A LO LUIGI 🍝",
      image: "/spaghetti-luigi.png",
      description: "Con albóndigas gigantes y salsa pomodoro estilo Springfield.",
      quote: "¡Mamma mia, qué delicia!",
      price: "$8500",
      isVegetarianOption: false,
      isSpicy: false,
      isGlutenFree: false,
    },
    {
      name: "RAVIOLES DEL ABUELO 👴",
      image: "/ravioles-abuelo.png",
      description: "Rellenos de ricotta y espinaca, con salsa casera.",
      quote: "Receta secreta de la familia.",
      price: "$9000",
      isVegetarianOption: true,
      isSpicy: false,
      isGlutenFree: false,
    },
    {
      name: "FIDEOS BART AL PESTO 🦇",
      image: "/fideos-bart.png",
      description: "Fideos con salsa pesto y queso rallado.",
      quote: "¡Ay caramba!",
      price: "$8000",
      isVegetarianOption: true,
      isSpicy: false,
      isGlutenFree: false,
    },
  ]

  const desserts = [
    {
      name: "DONA EXPLOSIVA HOMERO 🍩",
      image: "/dona.png",
      description: "Donas XL con glaseado rosa y chispas multicolor.",
      quote: '"Mmm... donas."',
      price: "$4000"
    },
    {
      name: "TARTA DE MANZANA DE LA ABUELA BOUVIER 🥧",
      image: "/tarta-abuela.png",
      description: "Clásica, tibia y con aroma a nostalgia.",
      quote: '"Receta de cinco generaciones."',
      price: "$4500"
    },
    {
      name: "HELADO KRUSTY CREAM 🍦",
      image: "/helado-krusty.png",
      description: "Tres sabores, galletitas rotas y una risa grabada.",
      quote: '"¡Jajaja! (risa de payaso)"',
      price: "$4000"
    }
  ]

  // Referencias para scroll
  const costiburgerRef = useRef(null)
  const burgersRef = useRef(null)
  const startersRef = useRef(null)
  const sidesRef = useRef(null)
  const saladsRef = useRef(null)
  const pastasRef = useRef(null)
  const drinksRef = useRef(null)
  const dessertsRef = useRef(null)
  const bebidasAlcoholicasRef = useRef(null)

  const handleScrollTo = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleCostiburgerPriceClick = (type) => {
    setSelectedCostiburgerType(type)
    setShowCostiburgerQuantity(true)
  }

  const handleCostiburgerQuantityConfirm = (quantity) => {
    setSelectedCostiburgerQuantity(quantity)
    setShowCostiburgerQuantity(false)
    setShowCostiburgerIngredients(true)
  }

  const handleCostiburgerQuantityCancel = () => {
    setShowCostiburgerQuantity(false)
    setSelectedCostiburgerType(null)
  }

  const handleCostiburgerIngredientConfirm = (selectedIngredients, extraPrice, options) => {
    const costiburger = {
      name: "COSTIBURGER 🦖",
      image: "/costiburger 2.png",
      description: "La hamburguesa más grande de Springfield. Con costillitas de cerdo, salsa BBQ y más.",
      quote: "¡Ay caramba!",
      prices: {
        simple: "$12000",
        doble: "$15000",
      },
      isVegetarianOption: false,
      isSpicy: false,
      isGlutenFree: false,
      selectedIngredients,
      extraPrice,
      ...options,
    }

    addItem(costiburger, selectedCostiburgerType, selectedCostiburgerQuantity)
    setShowCostiburgerIngredients(false)
    setSelectedCostiburgerType(null)
    setSelectedCostiburgerQuantity(1)
  }

  const handleCostiburgerIngredientCancel = () => {
    setShowCostiburgerIngredients(false)
    setSelectedCostiburgerType(null)
    setSelectedCostiburgerQuantity(1)
  }

  const ProductSection = ({ title, products, type = "standard" }) => (
    <section className="py-8">
      <h2 className="text-3xl font-bold font-simpsons text-simpsons-red mb-6 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} type={type} onAddToCart={addItem} />
        ))}
      </div>
    </section>
  )

  return (
    <main className="min-h-screen bg-white">
      <KrustyHeader />
      <div className="container mx-auto px-4 py-8">
        {/* Filtro de categorías */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 sticky top-20 z-30 bg-simpsons-light-blue py-4 rounded-xl shadow-brutal">
          <button onClick={() => handleScrollTo(costiburgerRef)} className="bg-simpsons-yellow text-simpsons-blue font-bold py-2 px-4 rounded-full font-simpsons border-2 border-simpsons-yellow hover:border-simpsons-blue transition-all">NUEVA COSTIBURGER</button>
          <button onClick={() => handleScrollTo(burgersRef)} className="bg-white text-simpsons-red font-bold py-2 px-4 rounded-full font-simpsons border-2 border-simpsons-red hover:bg-simpsons-yellow hover:text-simpsons-blue transition-all">HAMBURGUESAS</button>
          <button onClick={() => handleScrollTo(startersRef)} className="bg-white text-simpsons-red font-bold py-2 px-4 rounded-full font-simpsons border-2 border-simpsons-red hover:bg-simpsons-yellow hover:text-simpsons-blue transition-all">ENTRADAS</button>
          <button onClick={() => handleScrollTo(sidesRef)} className="bg-white text-simpsons-red font-bold py-2 px-4 rounded-full font-simpsons border-2 border-simpsons-red hover:bg-simpsons-yellow hover:text-simpsons-blue transition-all">ACOMPAÑAMIENTOS</button>
          <button onClick={() => handleScrollTo(saladsRef)} className="bg-white text-simpsons-red font-bold py-2 px-4 rounded-full font-simpsons border-2 border-simpsons-red hover:bg-simpsons-yellow hover:text-simpsons-blue transition-all">ENSALADAS</button>
          <button onClick={() => handleScrollTo(pastasRef)} className="bg-white text-simpsons-red font-bold py-2 px-4 rounded-full font-simpsons border-2 border-simpsons-red hover:bg-simpsons-yellow hover:text-simpsons-blue transition-all">PASTAS</button>
          <button onClick={() => handleScrollTo(drinksRef)} className="bg-white text-simpsons-red font-bold py-2 px-4 rounded-full font-simpsons border-2 border-simpsons-red hover:bg-simpsons-yellow hover:text-simpsons-blue transition-all">BEBIDAS</button>
          <button onClick={() => handleScrollTo(dessertsRef)} className="bg-white text-simpsons-red font-bold py-2 px-4 rounded-full font-simpsons border-2 border-simpsons-red hover:bg-simpsons-yellow hover:text-simpsons-blue transition-all">POSTRES</button>
        </div>
        {/* Título y frase */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-simpsons text-simpsons-red drop-shadow-[1px_1px_0_#000] inline-block bg-white py-2 px-6 rounded-lg border-4 border-black transform rotate-[-1deg] shadow-brutal">
            MENÚ
          </h1>
          <div className="mt-4 max-w-2xl mx-auto">
            <p className="text-xl font-simpsons">"La comida que te hace decir ¡Ay caramba!" - Krusty el Payaso</p>
          </div>
        </div>
        {/* Barra de opciones antes de la Costiburger */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-brutal border border-gray-200">
            <img src="/icon-vegetarian.png" alt="Vegetariano" className="w-6 h-6" />
            <span className="font-bold text-simpsons-blue">Opción vegetariana</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-brutal border border-gray-200">
            <img src="/icon-spicy.png" alt="Picante" className="w-6 h-6" />
            <span className="font-bold text-simpsons-red">Picante intenso</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-brutal border border-gray-200">
            <img src="/icon-gluten-free.png" alt="Sin TACC" className="w-6 h-6" />
            <span className="font-bold text-simpsons-blue">Opción sin TACC</span>
          </div>
        </div>
        {/* Costiburger Section */}
        <section ref={costiburgerRef} className="py-0 mb-16">
          <div className="w-full bg-simpsons-yellow py-12 px-2 rounded-3xl flex flex-col items-center">
            <div className="mb-6">
              <span className="bg-simpsons-red text-white font-bold px-6 py-2 rounded-full text-lg font-simpsons shadow-brutal">PROMOCIÓN ESPECIAL</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-simpsons text-simpsons-blue mb-2 text-center">¡NUEVA COSTIBURGER!</h2>
            <p className="text-xl md:text-2xl text-center mb-8 font-bold text-simpsons-blue-dark">La hamburguesa favorita de Homero, ahora en Krusty Burger.<br />¡Con salsa barbacoa y sin lechuga!</p>
            <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-4xl">
              <div className="flex-1 flex justify-center">
                <img src="/costiburger 2.png" alt="Costiburger" style={{maxHeight: '240px', width: 'auto', maxWidth: '100%'}} />
              </div>
              <div className="flex-1 bg-white rounded-3xl shadow-brutal p-6 flex flex-col gap-4 items-center">
                <p className="text-lg font-bold text-simpsons-blue-dark text-center">Medallón de carne, salsa barbacoa, cebolla crispy, pan de papa y mucho sabor.</p>
                <div className="flex gap-4 mt-2">
                  <button onClick={() => handleCostiburgerPriceClick('simple')} className="bg-simpsons-blue text-white rounded-full px-4 py-2 font-bold shadow-brutal">Simple $12000</button>
                  <button onClick={() => handleCostiburgerPriceClick('doble')} className="bg-simpsons-blue-dark text-white rounded-full px-4 py-2 font-bold shadow-brutal">Doble $15000</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Product Sections */}
        <section ref={burgersRef}>
          <h2 className="text-3xl font-bold font-simpsons text-simpsons-red mb-6 text-center">HAMBURGUESAS 🍔</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {burgers.map((burger, index) => (
              <BurgerCard key={index} burger={burger} onAddToCart={addItem} />
            ))}
          </div>
        </section>
        <section ref={startersRef}>
          <h2 className="text-3xl font-bold font-simpsons text-simpsons-red mb-6 text-center">ENTRADAS 🍟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {starters.map((product, index) => (
              <ProductCard key={index} product={product} onAddToCart={addItem} />
            ))}
          </div>
        </section>
        <section ref={sidesRef}>
          <h2 className="text-3xl font-bold font-simpsons text-simpsons-red mb-6 text-center">ACOMPAÑAMIENTOS 🧅</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sides.map((product, index) => (
              <ProductCard key={index} product={product} onAddToCart={addItem} />
            ))}
          </div>
        </section>
        <section ref={saladsRef}>
          <h2 className="text-3xl font-bold font-simpsons text-simpsons-red mb-6 text-center">ENSALADAS 🥗</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salads.map((product, index) => (
              <ProductCard key={index} product={product} onAddToCart={addItem} />
            ))}
          </div>
        </section>
        <section ref={pastasRef}>
          <h2 className="text-3xl font-bold font-simpsons text-simpsons-red mb-6 text-center">PASTAS 🍝</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastas.map((product, index) => (
              <ProductCard key={index} product={product} onAddToCart={addItem} />
            ))}
          </div>
        </section>
        <section ref={drinksRef}>
          <h2 className="text-3xl font-bold font-simpsons text-simpsons-red mb-6 text-center">BEBIDAS SIN ALCOHOL 🥤</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bebidasSinAlcohol.map((product, index) => (
              <ProductCard key={index} product={product} onAddToCart={addItem} />
            ))}
          </div>
        </section>
        <section ref={bebidasAlcoholicasRef}>
          <h2 className="text-3xl font-bold font-simpsons text-simpsons-red mb-6 text-center">BEBIDAS ALCOHÓLICAS 🍺</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bebidasAlcoholicas.map((product, index) => (
              <ProductCard key={index} product={product} onAddToCart={addItem} />
            ))}
          </div>
        </section>
        <section ref={dessertsRef}>
          <h2 className="text-3xl font-bold font-simpsons text-simpsons-red mb-6 text-center">POSTRES 🍩</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {desserts.map((product, index) => (
              <ProductCard key={index} product={product} onAddToCart={addItem} />
            ))}
          </div>
        </section>
        {/* Modals */}
        {showCostiburgerQuantity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4 font-simpsons">¿Cuántas Costiburgers?</h3>
              <QuantitySelector
                onConfirm={handleCostiburgerQuantityConfirm}
                onCancel={handleCostiburgerQuantityCancel}
              />
            </div>
          </div>
        )}

        {showCostiburgerIngredients && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4 font-simpsons">Personaliza tu Costiburger</h3>
              <IngredientSelector
                ingredients={costiburgerIngredients}
                onConfirm={handleCostiburgerIngredientConfirm}
                onCancel={handleCostiburgerIngredientCancel}
              />
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center my-16">
        <div className="bg-simpsons-yellow border-4 border-black rounded-xl px-8 py-6 shadow-brutal text-center max-w-3xl mx-auto transform rotate-[-2deg]">
          <p className="font-bold text-lg text-simpsons-red mb-2">"Si encuentras un dedo en tu comida, ¡felicidades! ¡Has ganado un cupón de descuento!"</p>
          <p className="text-xs text-gray-700">*Krusty Burger no se hace responsable por dedos, uñas, dientes u otros apéndices encontrados en sus productos.</p>
        </div>
      </div>
      <KrustyFooter />
    </main>
  )
} 