import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* HERO */}
      <main className="flex-1 w-full">
        <section className="container mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-4">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-5xl md:text-7xl font-extrabold text-simpsons-red mb-6 font-simpsons">KRUSTY BURGER</h1>
            <p className="text-2xl text-gray-700 mb-8 font-semibold">Las mejores hamburguesas de Springfield, ahora en tu ciudad.</p>
            <div className="flex gap-4">
              <Link href="/menu">
                <button className="bg-simpsons-yellow text-simpsons-blue font-bold py-3 px-8 rounded-full font-simpsons text-lg shadow-md border-2 border-simpsons-yellow hover:border-simpsons-blue transition-all duration-300">VER MENÚ</button>
              </Link>
              <Link href="/nosotros">
                <button className="bg-white text-simpsons-blue font-bold py-3 px-8 rounded-full font-simpsons text-lg shadow-md border-2 border-simpsons-blue hover:bg-simpsons-blue hover:text-white transition-all duration-300">CONÓCENOS</button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image src="/krusty-burger-logo.png" alt="Krusty Burger Logo" width={350} height={350} />
          </div>
        </section>

        {/* ESPECIALIDADES */}
        <section className="w-full py-16 bg-gradient-to-b from-white to-simpsons-yellow/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block relative">
                <h2 className="text-4xl md:text-5xl font-extrabold font-simpsons text-simpsons-red bg-white px-8 py-2 rounded-lg border-4 border-black shadow-brutal z-10 relative">NUESTRAS ESPECIALIDADES</h2>
                <div className="absolute left-0 right-0 bottom-0 h-3 bg-simpsons-blue -z-10 rounded-full" style={{ transform: 'translateY(60%)' }}></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Card Menú */}
              <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between border-t-8 border-simpsons-blue">
                <Image src="/homer-bart-milhouse.png" alt="Menú Krusty Burger" width={400} height={200} className="rounded-lg mb-6 object-cover w-full h-48" />
                <h3 className="text-2xl font-bold text-simpsons-blue mb-2">DESCUBRE NUESTRO MENÚ COMPLETO</h3>
                <p className="text-gray-700 mb-6">Disfruta de nuestras Krusty Burgers, Papas Krusty, Nuggets Tomy y Daly y Buzz Cola. Como dice Krusty: "Si no te da un ataque al corazón, ¡te devolvemos tu dinero!" (Oferta no válida en Springfield ni alrededores).</p>
                <Link href="/menu">
                  <button className="bg-simpsons-blue text-white font-bold py-3 px-6 rounded-full text-lg flex items-center gap-2 hover:bg-simpsons-red transition-all duration-300">
                    VER MENÚ COMPLETO <span className="text-xl">→</span>
                  </button>
                </Link>
              </div>
              {/* Card Costiburger */}
              <div className="bg-simpsons-yellow rounded-2xl shadow-lg p-8 flex flex-col justify-between border-t-8 border-simpsons-red relative">
                <div className="absolute top-0 right-0 bg-simpsons-red text-white font-bold px-4 py-1 rounded-bl-2xl rounded-tr-2xl text-xs">NUEVO</div>
                <h3 className="text-2xl font-bold text-simpsons-red mb-2 flex items-center gap-2"><span role="img" aria-label="costiburger">🐷</span>COSTIBURGER</h3>
                <Image src="/costiburger.png" alt="Costiburger" width={400} height={200} className="rounded-lg mb-6 object-cover w-full h-48" />
                <p className="text-gray-700 mb-6">Nuestra promoción estrella inspirada en la McRib. Deliciosas costillitas de cerdo, salsa BBQ, cebolla y pepinillos. ¡Una experiencia gastronómica que Homero Simpson aprobaría!</p>
                <div className="flex justify-between items-center mt-auto">
                  <div>
                    <span className="text-sm text-gray-500 block">PRECIO ESPECIAL</span>
                    <span className="font-bold text-2xl text-simpsons-red">$8500</span>
                  </div>
                  <Link href="/menu">
                    <button className="bg-simpsons-red text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-simpsons-blue transition-all duration-300">ORDENAR AHORA</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NUESTRA HISTORIA */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-extrabold font-simpsons text-simpsons-blue mb-4">NUESTRA HISTORIA</h2>
              <p className="text-lg max-w-3xl mx-auto mb-8">Desde 1989, Krusty Burger ha sido parte de la vida de Springfield. Descubre nuestra historia, nuestros éxitos y algunos fracasos memorables como la legendaria "Burger²".</p>
              <Link href="/nosotros">
                <button className="bg-simpsons-red text-white font-bold py-3 px-8 rounded-full font-simpsons text-xl shadow-md hover:shadow-lg transition-all duration-300">CONOCE MÁS</button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Image src="/homer-bart-milhouse.png" alt="Clientes disfrutando en Krusty Burger" width={400} height={200} className="rounded-lg object-cover w-full h-48" />
              <Image src="/krusty-exterior.png" alt="Krusty Burger Original" width={400} height={200} className="rounded-lg object-cover w-full h-48" />
              <Image src="/krusty-familia.png" alt="Experiencia familiar" width={400} height={200} className="rounded-lg object-cover w-full h-48" />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Image src="/krusty-burger-logo.png" alt="Krusty Burger Logo" width={48} height={48} className="mb-2" />
            <h3 className="text-xl font-bold font-simpsons text-simpsons-red">Krusty Burger</h3>
            <p className="text-gray-600 mt-2 text-center md:text-left">"No es solo una hamburguesa, es una Krusty Burger"</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold font-simpsons text-simpsons-blue mb-4">MENÚ</h3>
            <ul className="space-y-2">
              <li><Link href="/menu" className="text-gray-600 hover:text-simpsons-blue transition-colors">Hamburguesas</Link></li>
              <li><Link href="/menu" className="text-gray-600 hover:text-simpsons-blue transition-colors">Acompañamientos</Link></li>
              <li><Link href="/menu" className="text-gray-600 hover:text-simpsons-blue transition-colors">Bebidas</Link></li>
              <li><Link href="/menu" className="text-gray-600 hover:text-simpsons-blue transition-colors">Postres</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold font-simpsons text-simpsons-blue mb-4">HORARIOS</h3>
            <p className="text-gray-600 mb-2">Lunes a Viernes: 10:00 - 22:00</p>
            <p className="text-gray-600 mb-2">Sábados y Domingos: 11:00 - 23:00</p>
            <p className="text-gray-600">Feriados: 12:00 - 21:00</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold font-simpsons text-simpsons-blue mb-4">CONTACTO</h3>
            <p className="text-gray-600 mb-2">Teléfono: 555-KRUSTY</p>
            <p className="text-gray-600 mb-4">Email: info@krustyburger.com</p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-simpsons-yellow transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-simpsons-yellow transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="#" className="bg-gray-100 p-2 rounded-full hover:bg-simpsons-yellow transition-colors"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Krusty Burger. Todos los derechos reservados.</p>
          <p className="text-xs text-gray-400 mt-2">"Los ingredientes pueden contener pedazos de payaso" - Advertencia legal</p>
        </div>
      </footer>
    </div>
  )
} 