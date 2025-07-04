"use client"

import React from 'react';
import { useCart } from '../context/cart-context';
import QuantitySelector from './quantity-selector';
import IngredientSelector from './ingredient-selector';

// Función para obtener los ingredientes según el tipo de hamburguesa
const getBurgerIngredients = (burgerName) => {
  switch (burgerName) {
    case "KRUSTY BURGER DELUXE 🍔":
      return [
        { id: "1", name: "Medallón de carne triple", price: 0, default: true, isAnimal: true },
        { id: "2", name: "Queso cheddar", price: 0, default: true, isAnimal: true },
        { id: "3", name: "Panceta crocante", price: 0, default: true, isAnimal: true },
        { id: "4", name: "Cebolla caramelizada", price: 0, default: true, isAnimal: false },
        { id: "5", name: "Salsa secreta Krusty", price: 0, default: true, isAnimal: false },
        { id: "6", name: "Lechuga", price: 0, default: false, isAnimal: false },
        { id: "7", name: "Tomate", price: 0, default: false, isAnimal: false },
        { id: "8", name: "Pepinillos", price: 0, default: false, isAnimal: false },
        { id: "9", name: "Jalapeños", price: 500, default: false, isAnimal: false },
        { id: "10", name: "Queso extra", price: 800, default: false, isAnimal: true },
        { id: "11", name: "Huevo frito", price: 700, default: false, isAnimal: true },
      ]
    case "LA LISA VEGGIE 🌱":
      return [
        { id: "1", name: "Medallón de garbanzos", price: 0, default: true, isAnimal: false },
        { id: "2", name: "Medallón de espinaca", price: 0, default: true, isAnimal: false },
        { id: "3", name: "Tomate", price: 0, default: true, isAnimal: false },
        { id: "4", name: "Palta", price: 0, default: true, isAnimal: false },
        { id: "5", name: "Alioli vegano", price: 0, default: true, isAnimal: false },
        { id: "6", name: "Lechuga", price: 0, default: false, isAnimal: false },
        { id: "7", name: "Cebolla morada", price: 0, default: false, isAnimal: false },
        { id: "8", name: "Rúcula", price: 300, default: false, isAnimal: false },
        { id: "9", name: "Pepinillos", price: 0, default: false, isAnimal: false },
        { id: "10", name: "Salsa de yogurt", price: 500, default: false, isAnimal: true },
      ]
    case "MOE MACABRA 🔥":
      return [
        { id: "1", name: "Medallón de carne picante", price: 0, default: true, isAnimal: true },
        { id: "2", name: "Queso azul", price: 0, default: true, isAnimal: true },
        { id: "3", name: "Pepinos encurtidos", price: 0, default: true, isAnimal: false },
        { id: "4", name: "Jalapeños", price: 0, default: true, isAnimal: false },
        { id: "5", name: "Salsa picante", price: 0, default: true, isAnimal: false },
        { id: "6", name: "Cebolla", price: 0, default: false, isAnimal: false },
        { id: "7", name: "Lechuga", price: 0, default: false, isAnimal: false },
        { id: "8", name: "Medallón veggie picante", price: 1000, default: false, isAnimal: false },
        { id: "9", name: "Extra jalapeños", price: 500, default: false, isAnimal: false },
        { id: "10", name: "Salsa habanero", price: 600, default: false, isAnimal: false },
      ]
    case "LA BARTMAN 🦇":
      return [
        { id: "1", name: "Medallón empanizado", price: 0, default: true, isAnimal: true },
        { id: "2", name: "Queso cheddar", price: 0, default: true, isAnimal: true },
        { id: "3", name: "Nachos triturados", price: 0, default: true, isAnimal: false },
        { id: "4", name: "Barbacoa dulce", price: 0, default: true, isAnimal: false },
        { id: "5", name: "Cebolla crujiente", price: 0, default: true, isAnimal: false },
        { id: "6", name: "Jalapeños", price: 500, default: false, isAnimal: false },
        { id: "7", name: "Guacamole", price: 800, default: false, isAnimal: false },
        { id: "8", name: "Queso extra", price: 800, default: false, isAnimal: true },
        { id: "9", name: "Bacon", price: 1000, default: false, isAnimal: true },
      ]
    case "LA EXCELENTE 💰":
      return [
        { id: "1", name: "Carne de wagyu", price: 0, default: true, isAnimal: true },
        { id: "2", name: "Queso brie", price: 0, default: true, isAnimal: true },
        { id: "3", name: "Rúcula", price: 0, default: true, isAnimal: false },
        { id: "4", name: "Cebolla morada", price: 0, default: true, isAnimal: false },
        { id: "5", name: "Salsa de mostaza y miel", price: 0, default: true, isAnimal: false },
        { id: "6", name: "Tomate", price: 0, default: false, isAnimal: false },
        { id: "7", name: "Medallón veggie premium", price: 1200, default: false, isAnimal: false },
        { id: "8", name: "Trufa rallada", price: 2000, default: false, isAnimal: false },
        { id: "9", name: "Foie gras", price: 2500, default: false, isAnimal: true },
      ]
    case "LA RADIACTIVA REAL 👑":
      return [
        { id: "1", name: "Medallón de carne", price: 0, default: true, isAnimal: true },
        { id: "2", name: "Queso cheddar", price: 0, default: true, isAnimal: true },
        { id: "3", name: "Jalapeños", price: 0, default: true, isAnimal: false },
        { id: "4", name: "Cebolla crocante", price: 0, default: true, isAnimal: false },
        { id: "5", name: "Salsa picante", price: 0, default: true, isAnimal: false },
        { id: "6", name: "Pepinillos", price: 0, default: false, isAnimal: false },
        { id: "7", name: "Bacon", price: 1000, default: false, isAnimal: true },
        { id: "8", name: "Queso extra", price: 800, default: false, isAnimal: true },
        { id: "9", name: "Salsa habanero", price: 600, default: false, isAnimal: false },
      ]
    default:
      return [
        { id: "1", name: "Medallón de carne", price: 0, default: true, isAnimal: true },
        { id: "2", name: "Lechuga", price: 0, default: true, isAnimal: false },
        { id: "3", name: "Tomate", price: 0, default: true, isAnimal: false },
        { id: "4", name: "Cebolla", price: 0, default: true, isAnimal: false },
        { id: "5", name: "Queso cheddar", price: 0, default: true, isAnimal: true },
        { id: "6", name: "Salsa Krusty", price: 0, default: true, isAnimal: false },
      ]
  }
}

export default function BurgerCard({ burger }) {
  const { addToCart } = useCart();
  const [selectedType, setSelectedType] = React.useState(null)
  const [showQuantitySelector, setShowQuantitySelector] = React.useState(false)
  const [showIngredientSelector, setShowIngredientSelector] = React.useState(false)
  const [selectedQuantity, setSelectedQuantity] = React.useState(1)

  const handlePriceClick = (type) => {
    setSelectedType(type)
    setShowQuantitySelector(true)
  }

  const handleQuantityConfirm = (quantity) => {
    setSelectedQuantity(quantity)
    setShowQuantitySelector(false)
    setShowIngredientSelector(true)
  }

  const handleQuantityCancel = () => {
    setShowQuantitySelector(false)
    setSelectedType(null)
  }

  const handleIngredientConfirm = (selectedIngredients, extraPrice, options) => {
    if (selectedType) {
      addToCart({
        ...burger,
        isVegetarian: options.isVegetarian,
        isSpicy: options.isSpicy,
        isGlutenFree: options.isGlutenFree,
        selectedIngredients,
        extraPrice,
      })
      setShowIngredientSelector(false)
      setSelectedType(null)
    }
  }

  const handleIngredientCancel = () => {
    setShowIngredientSelector(false)
    setSelectedType(null)
  }

  // Determinar si es veggie basado en el tipo seleccionado
  const isVeggieSelected = selectedType === "veggie"

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full min-h-[450px]">
      <div className="relative h-56">
        <img 
          src={burger.image} 
          alt={burger.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-6">
          <h3 className="text-xl font-bold font-simpsons text-simpsons-red mb-3">{burger.name}</h3>
          <p className="text-gray-700 mb-3 line-clamp-3">{burger.description}</p>
          {burger.quote && <p className="italic text-gray-600">"{burger.quote}"</p>}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mt-auto">
          {burger.prices.simple && (
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-700">SIMPLE</span>
              <button
                onClick={() => handlePriceClick("simple")}
                className="font-bold text-simpsons-blue hover:text-simpsons-red transition-colors bg-simpsons-yellow px-4 py-2 rounded-full shadow-brutal"
              >
                {burger.prices.simple} <span className="ml-2">Agregar</span>
              </button>
            </div>
          )}
          {burger.prices.doble && (
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-700">DOBLE</span>
              <button
                onClick={() => handlePriceClick("doble")}
                className="font-bold text-simpsons-blue hover:text-simpsons-red transition-colors bg-simpsons-yellow px-4 py-2 rounded-full shadow-brutal"
              >
                {burger.prices.doble} <span className="ml-2">Agregar</span>
              </button>
            </div>
          )}
          {burger.prices.veggie && (
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-gray-700">VEGGIE</span>
              <button
                onClick={() => handlePriceClick("veggie")}
                className="font-bold text-simpsons-blue hover:text-simpsons-red transition-colors bg-simpsons-yellow px-4 py-2 rounded-full shadow-brutal"
              >
                {burger.prices.veggie} <span className="ml-2">Agregar</span>
              </button>
            </div>
          )}
        </div>

        {showQuantitySelector && (
          <div className="mt-4">
            <QuantitySelector onConfirm={handleQuantityConfirm} onCancel={handleQuantityCancel} />
          </div>
        )}

        {showIngredientSelector && (
          <div className="mt-4">
            <IngredientSelector
              ingredients={getBurgerIngredients(burger.name)}
              onConfirm={handleIngredientConfirm}
              onCancel={handleIngredientCancel}
              productName={burger.name}
              initialOptions={{
                isVegetarian: isVeggieSelected,
                isSpicy: burger.isSpicy,
                isGlutenFree: burger.isGlutenFree,
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
} 