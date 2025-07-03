const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

// Datos de los productos del menú original
const products = [
  // HAMBURGUESAS
  {
    name: 'COSTIBURGER',
    description: 'La hamburguesa favorita de Homero, ahora en Krusty Burger. Con salsa barbacoa y sin lechuga!',
    price: 12000,
    category: 'hamburguesas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751486820/costiburger_rkl0xf.png',
    available: true
  },
  {
    name: 'KRUSTY BURGER DELUXE',
    description: 'Triple carne, queso cheddar, panceta crocante, cebolla caramelizada y salsa secreta Krusty.',
    price: 10500,
    category: 'hamburguesas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751486822/krusty-burger-deluxe_aekq85.png',
    available: true
  },
  {
    name: 'LA LISA VEGGIE',
    description: 'Hamburguesa de garbanzos y espinaca, con tomate, palta y alioli vegano.',
    price: 9500,
    category: 'hamburguesas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751486822/lisa-veggie_smi6rk.png',
    available: true
  },
  {
    name: 'MOE MACABRA',
    description: 'Medallón de carne picante, queso azul, pepinos encurtidos y jalapeños.',
    price: 9800,
    category: 'hamburguesas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751486822/moe-macabra_zrceel.png',
    available: true
  },
  {
    name: 'LA BARTMAN',
    description: 'Medallón empanizado y frito, cheddar, nachos triturados, barbacoa dulce y cebolla crujiente.',
    price: 9000,
    category: 'hamburguesas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751486823/bartman-burger_nk98b5.png',
    available: true
  },
  {
    name: 'LA EXCELENTE',
    description: 'Carne de wagyu (o eso dice el menú), queso brie, rúcula y cebolla morada.',
    price: 11500,
    category: 'hamburguesas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751486822/La_excelente_epkjb9.png',
    available: true
  },
  {
    name: 'LA RADIACTIVA REAL',
    description: 'Una bomba de cheddar, jalapeños y cebolla crocante, digna del trono nuclear de Springfield.',
    price: 10000,
    category: 'hamburguesas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751486823/radiactiva-burger_gxfogf.png',
    available: true
  },

  // ENTRANTES
  {
    name: 'CROQUETAS DE PATTY Y SELMA',
    description: 'Ahumadas, intensas y con sabor fuerte... como las tías.',
    price: 5500,
    category: 'entrantes',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487180/croquetas-patty-selma_d7dk6g.png',
    available: true
  },
  {
    name: 'DEDOS DE OTTO',
    description: 'Bastones de mozzarella rebozados, con salsa picante.',
    price: 5800,
    category: 'entrantes',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487179/dedos-otto_z4vq9c.png',
    available: true
  },
  {
    name: 'MINI PANCHOS DE AYUDANTE DE SANTA',
    description: 'Mini hot dogs con ketchup, mostaza y cebolla frita.',
    price: 6200,
    category: 'entrantes',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487179/mini-panchos_b33zet.png',
    available: true
  },

  // ACOMPAÑAMIENTOS
  {
    name: 'PAPAS KRUSTY',
    description: 'Papas fritas con sal y pimienta. Crujientes por fuera, suaves por dentro.',
    price: 4500,
    category: 'acompañamientos',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487187/papas-fritas_wf3wqq.png',
    available: true
  },
  {
    name: 'AROS DE CEBOLLA',
    description: 'Aros de cebolla fritos y crujientes. Con rebozado especial Krusty.',
    price: 5000,
    category: 'acompañamientos',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487186/onion-rings_wd3s8r.png',
    available: true
  },
  {
    name: 'NUGGETS TOMY Y DALY',
    description: '6 unidades con salsa a elección. Forma de ratón o gato según disponibilidad.',
    price: 6000,
    category: 'acompañamientos',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487185/nuggets-tomy-daly_x6gyla.png',
    available: true
  },

  // ENSALADAS
  {
    name: 'ENSALADA LISA LA VEGETARIANA',
    description: 'Orgánica, fresca, con tofu marinado, zanahoria rallada, rúcula y semillas.',
    price: 7500,
    category: 'ensaladas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487157/ensalada-lisa_zyj2gi.png',
    available: true
  },
  {
    name: 'CÉSAR FLANDERS',
    description: 'Tradicional ensalada César, con crutones bendecidos.',
    price: 7000,
    category: 'ensaladas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487158/cesar-flanders_cmy7f0.png',
    available: true
  },
  {
    name: 'SPRINGFIELD MIXTA',
    description: 'Lechuga, tomate, cebolla morada, huevo duro y aderezo duff-mostaza.',
    price: 6500,
    category: 'ensaladas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487158/springfield-mixta_zmzi2v.png',
    available: true
  },

  // PASTAS
  {
    name: 'SPAGHETTI A LO LUIGI',
    description: 'Con albóndigas gigantes y salsa pomodoro estilo Springfield.',
    price: 8500,
    category: 'pastas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487253/spaghetti-luigi_tgq5x6.png',
    available: true
  },
  {
    name: 'RAVIOLES DEL ABUELO SIMPSON',
    description: 'Rellenos de carne, con salsa de crema y queso...',
    price: 9000,
    category: 'pastas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487255/ravioles-abuelo_nzavqt.png',
    available: true
  },
  {
    name: 'FIDEOS DE BART AL PESTO',
    description: 'Traviesos, verdes y deliciosos. Con albahaca fresca y piñones.',
    price: 8000,
    category: 'pastas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487254/fideos-bart_vinejz.png',
    available: true
  },

  // BEBIDAS ALCOHÓLICAS
  {
    name: 'CERVEZA DUFF CLÁSICA',
    description: 'El alma de Springfield. Fría y espumosa.',
    price: 5000,
    category: 'bebidas-alcoholicas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487278/duff_clasica_fmvoif.png',
    available: true
  },
  {
    name: 'DUFF NEGRA LENNY & CARL',
    description: 'Más intensa. Para hablar de la vida en la barra.',
    price: 5500,
    category: 'bebidas-alcoholicas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487277/duff-negra_sgpxo7.png',
    available: true
  },
  {
    name: 'LLAMARADA MOE',
    description: '¡Arde al servirlo! Mezcla secreta de licores.',
    price: 7000,
    category: 'bebidas-alcoholicas',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487279/llamarada-moe_wegegl.png',
    available: true
  },

  // BEBIDAS SIN ALCOHOL
  {
    name: 'BUZZ COLA',
    description: 'La bebida oficial de Springfield. Con cafeína extra.',
    price: 3500,
    category: 'bebidas-sin-alcohol',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487283/buzz_cola_x6dygj.png',
    available: true
  },
  {
    name: 'AGUA FLANDERS',
    description: 'Agua bendecida. Fresca y pura como la fe.',
    price: 2500,
    category: 'bebidas-sin-alcohol',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487283/agua-flanders_anyfk4.png',
    available: true
  },
  {
    name: 'MALTEADA DE CHOCOLATE RAFITA',
    description: 'Cremosa y dulce. Con extra de chocolate.',
    price: 4500,
    category: 'bebidas-sin-alcohol',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487284/malteada-rafita_oqbuea.png',
    available: true
  },

  // POSTRES
  {
    name: 'DONA ROSA',
    description: 'La dona favorita de Homero. Con glaseado rosa y sprinkles.',
    price: 3500,
    category: 'postres',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487269/dona_nhswjd.png',
    available: true
  },
  {
    name: 'HELADO KRUSTY',
    description: 'Helado de vainilla con toppings a elección.',
    price: 4000,
    category: 'postres',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487269/helado-krusty_v7wydu.png',
    available: true
  },
  {
    name: 'TARTA DE LA ABUELA',
    description: 'Tarta de manzana casera. Como la hacía la abuela Simpson.',
    price: 5500,
    category: 'postres',
    image: 'https://res.cloudinary.com/dj5b5game/image/upload/v1751487270/tarta-abuela_hrkmpi.png',
    available: true
  }
];

// Función para cargar los productos
async function loadProducts() {
  try {
    // Conectar a MongoDB
    const mongoUrl = 'mongodb+srv://azulcenturion:bQ89J6yIOoih6D8s@cluster0.dfo83ha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Conectado a MongoDB Atlas');

    // Limpiar productos existentes (opcional)
    await Product.deleteMany({});
    console.log('🗑️ Productos existentes eliminados');

    // Insertar todos los productos
    const insertedProducts = await Product.insertMany(products);
    
    console.log(`✅ ${insertedProducts.length} productos cargados exitosamente`);
    
    // Mostrar resumen por categoría
    const categories = {};
    insertedProducts.forEach(product => {
      if (!categories[product.category]) {
        categories[product.category] = 0;
      }
      categories[product.category]++;
    });
    
    console.log('\n📊 Resumen por categoría:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} productos`);
    });

  } catch (error) {
    console.error('❌ Error cargando productos:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

// Ejecutar el script
loadProducts(); 