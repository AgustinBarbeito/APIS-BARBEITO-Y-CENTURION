import React from 'react';
import { useCart } from '../context/cart-context';
import KrustyHeader from '../components/krusty-header';
import KrustyFooter from '../components/krusty-footer';
import QuantitySelector from '../components/quantity-selector';

export default function Pedido() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();

  return (
    <div className="pedido-container">
      <KrustyHeader />
      <div className="pedido-content">
        <h1 className="pedido-title">Mi Pedido</h1>
        {cart.length === 0 ? (
          <p className="pedido-empty">Tu carrito está vacío</p>
        ) : (
          <>
            <div className="pedido-items">
              {cart.map((item) => (
                <div key={`${item.id}-${item.type}`} className="pedido-item">
                  <div className="pedido-item-info">
                    <h3 className="pedido-item-name">{item.name}</h3>
                    <p className="pedido-item-price">${item.price}</p>
                  </div>
                  <div className="pedido-item-actions">
                    <QuantitySelector
                      quantity={item.quantity}
                      onIncrement={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                      onDecrement={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                    />
                    <button
                      onClick={() => removeFromCart(item.id, item.type)}
                      className="pedido-remove-btn"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="pedido-summary">
              <button
                onClick={clearCart}
                className="pedido-clear-btn"
              >
                Vaciar Carrito
              </button>
              <div className="pedido-total-section">
                <p className="pedido-total">Total: ${getTotal()}</p>
                <button className="pedido-checkout-btn">
                  Realizar Pedido
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <KrustyFooter />
    </div>
  );
} 