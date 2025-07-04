"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Inicialización del carrito desde localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log('Carrito cargado desde localStorage:', parsedCart);
        setCart(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Persistencia del carrito en localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Carrito guardado en localStorage:', cart);
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cart, isLoaded]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => 
        cartItem.id === item.id && 
        cartItem.type === item.type
      );
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id && cartItem.type === item.type
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    
    // Notificación de producto agregado
    setNotification(`${item.name} agregado al carrito`);
    setTimeout(() => setNotification(null), 3000);
    
    console.log('Producto agregado al carrito:', item.name);
  };

  const removeFromCart = (itemId, type) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === itemId && item.type === type)));
  };

  const updateQuantity = (itemId, type, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemId, type);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId && item.type === type
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error);
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.type === 'burger' && item.isDouble ? item.doublePrice : item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const debugCart = () => {
    console.log('=== DEBUG CARRITO ===');
    console.log('Estado del carrito:', cart);
    console.log('Carrito en localStorage:', localStorage.getItem('cart'));
    console.log('Estado de carga:', isLoaded);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal,
      notification,
      isLoaded,
      debugCart
    }}>
      {children}
      {notification && (
        <div className="cart-notification">
          {notification}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 