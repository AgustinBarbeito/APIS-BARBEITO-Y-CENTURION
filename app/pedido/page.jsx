"use client"

import { KrustyHeader } from "@/components/krusty-header.jsx"
import { KrustyFooter } from "@/components/krusty-footer.jsx"
import Link from "next/link"
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "@/context/cart-context.jsx"
import Image from "next/image"

export default function PedidoPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems } = useCart()

  // Calcular el total del pedido
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      // Convertir el precio de string a número (quitar el símbolo $ y convertir a número)
      const price = Number(item.price.replace("$", "").replace(",", ""))
      // Sumar el precio extra por ingredientes adicionales
      const extraPrice = item.extraPrice || 0
      return total + (price + extraPrice) * item.quantity
    }, 0)
  }

  // Función para mostrar las opciones dietéticas seleccionadas
  const renderDietaryOptions = (item) => {
    return (
      <div className="flex gap-2 mt-1">
        {item.isVegetarian && (
          <div className="relative w-5 h-5" title="Vegetariano">
            <Image src="/icon-vegetarian.png" alt="Vegetariano" fill className="object-contain" />
          </div>
        )}
        {item.isSpicy && (
          <div className="relative w-5 h-5" title="Picante">
            <Image src="/icon-spicy.png" alt="Picante" fill className="object-contain" />
          </div>
        )}
        {item.isGlutenFree && (
          <div className="relative w-5 h-5" title="Sin TACC">
            <Image src="/icon-gluten-free.png" alt="Sin TACC" fill className="object-contain" />
          </div>
        )}
      </div>
    )
  }

  // Función para mostrar los ingredientes seleccionados
  const renderIngredients = (item) => {
    if (!item.selectedIngredients || item.selectedIngredients.length === 0) return null

    return (
      <div className="mt-1 text-xs text-gray-500">
        <span className="font-medium">Ingredientes: </span>
        {item.selectedIngredients.map((ing) => ing.name).join(", ")}
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <KrustyHeader />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Link href="/menu" className="flex items-center text-simpsons-blue hover:underline">
                <ArrowLeft size={18} className="mr-2" />
                Volver al menú
              </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h1 className="text-3xl font-bold font-simpsons text-simpsons-red mb-2">Tu Pedido</h1>
                <p className="text-gray-600">Revisa y confirma tu pedido</p>
              </div>

              <div className="p-6">
                {items.length === 0 ? (
                  // Contenido del carrito vacío
                  <div className="text-center py-12">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <ShoppingBag size={64} className="text-gray-300 absolute inset-0" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-700 mb-2">Tu carrito está vacío</h2>
                    <p className="text-gray-500 mb-6">Agrega productos desde nuestro menú para comenzar tu pedido</p>
                    <Link href="/menu">
                      <div className="bg-simpsons-yellow text-simpsons-blue font-bold py-2 px-6 rounded-full font-simpsons shadow-sm hover:shadow-md transition-all duration-300 inline-block">
                        VER MENÚ
                      </div>
                    </Link>
                  </div>
                ) : (
                  // Contenido del carrito con productos
                  <div>
                    <div className="mb-4 flex justify-between">
                      <h2 className="text-xl font-bold text-gray-800">Productos ({totalItems})</h2>
                      <button
                        onClick={clearCart}
                        className="text-simpsons-red hover:text-red-700 text-sm flex items-center gap-1"
                      >
                        <Trash2 size={16} />
                        Vaciar carrito
                      </button>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {items.map((item) => (
                        <div key={item.id} className="py-4 flex items-center">
                          <div className="relative w-16 h-16 mr-4">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          </div>

                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800">{item.name}</h3>
                            {typeof item.type === "string" && item.type && (
                              <p className="text-sm text-gray-600">
                                Tipo: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              </p>
                            )}
                            <p className="text-simpsons-blue font-bold">
                              {item.price}
                              {item.extraPrice > 0 && (
                                <span className="text-simpsons-red text-sm ml-2">+${item.extraPrice}</span>
                              )}
                            </p>
                            {renderDietaryOptions(item)}
                            {renderIngredients(item)}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <Minus size={14} />
                            </button>

                            <span className="font-bold text-gray-800 w-6 text-center">{item.quantity}</span>

                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                            >
                              <Plus size={14} />
                            </button>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="ml-2 text-gray-400 hover:text-simpsons-red transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-bold">${calculateTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Envío:</span>
                        <span className="font-bold">$1500</span>
                      </div>
                      <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
                        <span className="font-bold text-gray-800">Total:</span>
                        <span className="font-bold text-simpsons-red text-xl">
                          ${(calculateTotal() + 1500).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {items.length > 0 && (
              <div className="mt-8 bg-gray-50 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Información del pedido</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-simpsons-blue focus:border-transparent"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-simpsons-blue focus:border-transparent"
                      placeholder="Tu teléfono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección de entrega</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-simpsons-blue focus:border-transparent"
                      placeholder="Tu dirección"
                    />
                  </div>

                  <div className="pt-4">
                    <button className="w-full bg-simpsons-yellow text-simpsons-blue font-bold py-3 px-6 rounded-full font-simpsons shadow-md hover:shadow-lg transition-all duration-300">
                      CONFIRMAR PEDIDO
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-2">
                      Esta es una página de demostración. La funcionalidad de pedido no está completamente implementada.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <KrustyFooter />
    </div>
  )
} 