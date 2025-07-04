import Image from "next/image"
import Link from "next/link"

export function KrustyPromotions() {
  return (
    <section id="promociones" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-simpsons text-simpsons-red drop-shadow-[1px_1px_0_#000] inline-block bg-white py-2 px-6 rounded-lg border-4 border-black transform rotate-[1deg] shadow-brutal">
            PROMOCIONES
          </h2>
          <div className="mt-4 max-w-3xl mx-auto">
            <p className="text-xl font-simpsons">
              "¿Por qué pagar más cuando puedes pagar menos?" - Krusty el Payaso
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Promoción 1 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 transform hover:scale-105 transition-transform">
            <div className="relative h-48">
              <Image src="/promo-1.png" alt="Promoción 1" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold font-simpsons text-simpsons-red mb-3">COMBO FAMILIAR</h3>
              <p className="text-gray-700 mb-4">
                4 hamburguesas, 4 papas fritas, 4 bebidas y un postre para compartir. ¡Ideal para toda la familia!
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-simpsons-blue">$12.999</span>
                <Link href="/menu">
                  <div className="bg-simpsons-yellow text-simpsons-blue font-bold py-2 px-4 rounded-full font-simpsons hover:bg-simpsons-yellow/80 transition-colors">
                    VER MÁS
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Promoción 2 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 transform hover:scale-105 transition-transform">
            <div className="relative h-48">
              <Image src="/promo-2.png" alt="Promoción 2" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold font-simpsons text-simpsons-red mb-3">COMBO DUO</h3>
              <p className="text-gray-700 mb-4">
                2 hamburguesas, 2 papas fritas y 2 bebidas. ¡Perfecto para compartir con un amigo!
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-simpsons-blue">$6.999</span>
                <Link href="/menu">
                  <div className="bg-simpsons-yellow text-simpsons-blue font-bold py-2 px-4 rounded-full font-simpsons hover:bg-simpsons-yellow/80 transition-colors">
                    VER MÁS
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Promoción 3 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200 transform hover:scale-105 transition-transform">
            <div className="relative h-48">
              <Image src="/promo-3.png" alt="Promoción 3" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold font-simpsons text-simpsons-red mb-3">COMBO INDIVIDUAL</h3>
              <p className="text-gray-700 mb-4">
                Una hamburguesa, papas fritas y una bebida. ¡Para cuando tienes hambre pero no tanto!
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-simpsons-blue">$3.999</span>
                <Link href="/menu">
                  <div className="bg-simpsons-yellow text-simpsons-blue font-bold py-2 px-4 rounded-full font-simpsons hover:bg-simpsons-yellow/80 transition-colors">
                    VER MÁS
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de ofertas especiales */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold font-simpsons text-simpsons-blue mb-8 text-center">
            OFERTAS ESPECIALES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Oferta 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200">
              <div className="p-6">
                <h4 className="text-2xl font-bold font-simpsons text-simpsons-red mb-4">
                  ¡HAPPY HOUR TODOS LOS DÍAS!
                </h4>
                <p className="text-gray-700 mb-4">
                  De 2pm a 5pm, todas nuestras bebidas tienen 50% de descuento. ¡Aprovecha y refresca tu día!
                </p>
                <div className="bg-simpsons-yellow inline-block px-4 py-2 rounded-lg">
                  <p className="text-sm font-bold">Válido todos los días</p>
                </div>
              </div>
            </div>

            {/* Oferta 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200">
              <div className="p-6">
                <h4 className="text-2xl font-bold font-simpsons text-simpsons-red mb-4">
                  ¡COMBO ESTUDIANTE!
                </h4>
                <p className="text-gray-700 mb-4">
                  Presenta tu carné de estudiante y obtén un 20% de descuento en cualquier combo. ¡Porque estudiar da
                  hambre!
                </p>
                <div className="bg-simpsons-yellow inline-block px-4 py-2 rounded-lg">
                  <p className="text-sm font-bold">Válido con carné de estudiante</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cita final */}
        <div className="text-center mt-16">
          <div className="inline-block bg-simpsons-blue text-white font-bold py-4 px-8 rounded-lg transform rotate-[-2deg] border-4 border-black font-simpsons text-2xl shadow-brutal max-w-2xl">
            "Nuestras promociones son tan buenas que hasta el Sr. Burns se sorprendería" - Krusty el Payaso
          </div>
        </div>
      </div>
    </section>
  )
} 