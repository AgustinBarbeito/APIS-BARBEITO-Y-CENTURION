"use client"

import React from 'react';

export default function QuantitySelector({ quantity, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrement}
        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
      >
        -
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button
        onClick={onIncrement}
        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
      >
        +
      </button>
    </div>
  );
} 