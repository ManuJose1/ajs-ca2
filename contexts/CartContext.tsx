import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PartTypeID } from '@/types';

interface CartContextType {
  cart: PartTypeID[];
  addToCart: (part: PartTypeID) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<PartTypeID[]>([]);

  // Add part to cart
  const addToCart = (part: PartTypeID) => {
    setCart(prevCart => [...prevCart, part]);
  };

  //Rempve a single part from the cart
  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(part => part._id !== id));
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};