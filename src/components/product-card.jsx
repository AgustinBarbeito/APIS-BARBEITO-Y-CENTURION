"use client"

import React from 'react';
import { useCart } from '../context/cart-context';
import QuantitySelector from './quantity-selector';
import IngredientSelector from './ingredient-selector';

// Función para obtener los ingredientes según el tipo de producto
const getProductIngredients = (productName) => {
  if (productName.includes("PAPAS")) {
    return [
      { id: "1", name: "Papas fritas", price: 0, default: true, isAnimal: false },
      { id: "2", name: "Sal", price: 0, default: true, isAnimal: false },
      { id: "3", name: "Pimienta", price: 0, default: true, isAnimal: false },
      { id: "4", name: "Sazonador Krusty", price: 0, default: true, isAnimal: false },
      { id: "5", name: "Cheddar derretido", price: 800, default: false, isAnimal: true },
      { id: "6", name: "Bacon bits", price: 1000, default: false, isAnimal: true },
      { id: "7", name: "Salsa de ajo", price: 500, default: false, isAnimal: false },
    ]
  } else if (productName.includes("AROS DE CEBOLLA")) {
    return [
      { id: "1", name: "Aros de cebolla", price: 0, default: true, isAnimal: false },
      { id: "2", name: "Rebozado especial Krusty", price: 0, default: true, isAnimal: false },
      { id: "3", name: "Salsa BBQ", price: 0, default: true, isAnimal: false },
      { id: "4", name: "Salsa ranch", price: 500, default: false, isAnimal: true },
      { id: "5", name: "Salsa de queso", price: 800, default: false, isAnimal: true },
      { id: "6", name: "Salsa picante", price: 500, default: false, isAnimal: false },
    ]
  } else if (productName.includes("NUGGETS")) {
    return [
      { id: "1", name: "Nuggets de pollo", price: 0, default: true, isAnimal: true },
      { id: "2", name: "Salsa Krusty", price: 0, default: true, isAnimal: false },
      { id: "3", name: "Salsa BBQ", price: 0, default: false, isAnimal: false },
      { id: "4", name: "Salsa de mostaza y miel", price: 0, default: false, isAnimal: false },
      { id: "5", name: "Salsa picante", price: 500, default: false, isAnimal: false },
      { id: "6", name: "Salsa de queso", price: 800, default: false, isAnimal: true },
    ]
  } else if (productName.includes("ENSALADA")) {
    return [
      { id: "1", name: "Lechuga", price: 0, default: true, isAnimal: false },
      { id: "2", name: "Tomate", price: 0, default: true, isAnimal: false },
      { id: "3", name: "Cebolla", price: 0, default: true, isAnimal: false },
      { id: "4", name: "Zanahoria", price: 0, default: true, isAnimal: false },
      { id: "5", name: "Aderezo", price: 0, default: true, isAnimal: false },
      { id: "6", name: "Queso", price: 800, default: false, isAnimal: true },
      { id: "7", name: "Croutones", price: 500, default: false, isAnimal: false },
      { id: "8", name: "Huevo", price: 700, default: false, isAnimal: true },
    ]
  } else if (
    productName.includes("PASTA") ||
    productName.includes("SPAGHETTI") ||
    productName.includes("RAVIOLES") ||
    productName.includes("FIDEOS")
  ) {
    return [
      { id: "1", name: "Pasta", price: 0, default: true, isAnimal: false },
      { id: "2", name: "Salsa", price: 0, default: true, isAnimal: false },
      { id: "3", name: "Queso rallado", price: 0, default: true, isAnimal: true },
      { id: "4", name: "Albóndigas", price: 0, default: false, isAnimal: true },
      { id: "5", name: "Champiñones", price: 800, default: false, isAnimal: false },
      { id: "6", name: "Aceitunas", price: 500, default: false, isAnimal: false },
      { id: "7", name: "Pesto", price: 800, default: false, isAnimal: false },
    ]
  } else if (
    productName.includes("BEBIDA") ||
    productName.includes("COLA") ||
    productName.includes("CERVEZA") ||
    productName.includes("DUFF") ||
    productName.includes("MOE")
  ) {
    return [
      { id: "1", name: "Bebida", price: 0, default: true, isAnimal: false },
      { id: "2", name: "Hielo", price: 0, default: true, isAnimal: false },
      { id: "3", name: "Limón", price: 0, default: false, isAnimal: false },
      { id: "4", name: "Rodaja de naranja", price: 300, default: false, isAnimal: false },
      { id: "5", name: "Pajita", price: 0, default: true, isAnimal: false },
    ]
  } else if (
    productName.includes("POSTRE") ||
    productName.includes("DONA") ||
    productName.includes("TARTA") ||
    productName.includes("HELADO")
  ) {
    return [
      { id: "1", name: "Postre base", price: 0, default: true, isAnimal: false },
      { id: "2", name: "Cobertura", price: 0, default: true, isAnimal: false },
      { id: "3", name: "Chispas de chocolate", price: 500, default: false, isAnimal: false },
      { id: "4", name: "Crema batida", price: 700, default: false, isAnimal: true },
      { id: "5", name: "Salsa de caramelo", price: 500, default: false, isAnimal: false },
    ]
  } else {
    return [
      { id: "1", name: "Ingrediente principal", price: 0, default: true, isAnimal: false },
      { id: "2", name: "Salsa", price: 0, default: true, isAnimal: false },
      { id: "3", name: "Acompañamiento", price: 0, default: true, isAnimal: false },
    ]
  }
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">${product.price}</p>
          <button
            onClick={() => addToCart({ ...product, type: 'product' })}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
} 