"use client"

import React from 'react';

export default function IngredientSelector({ ingredients, selectedIngredients, onToggleIngredient }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Ingredientes Adicionales</h3>
      <div className="space-y-2">
        {ingredients.map((ingredient) => (
          <label key={ingredient.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ingredient.id)}
              onChange={() => onToggleIngredient(ingredient.id)}
              className="form-checkbox h-5 w-5 text-yellow-500"
            />
            <span>{ingredient.name}</span>
            <span className="text-gray-500">(+${ingredient.price})</span>
          </label>
        ))}
      </div>
    </div>
  );
} 