// src/CartContext.js
import { createContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  //generate or retrive session id
  useEffect(() => {
    let sid = localStorage.getItem('sessionId');
    if(!sid) {
      sid = 'sess_' + Math.random().toString(36).slice(2);
      localStorage.setItem('sessionId', sid);
    }
    setSessionId(sid);

    //fetch cart on load
    if(sid){
      fetchCart(sid);
    }
  }, []);

  const fetchCart = async(sid) => {
    try{
      const response = await fetch(`http://localhost:5000/api/cart/${sid}`);
      if(response.ok){
        const data = await response.json();
        setCart(
          data.items.map((item) => ({
            id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image: `http://localhost:5000${item.product.image}`,
            color: item.product.color,
            category: item.product.category,
            sizes: item.product.sizes,
            quantity: item.product.quantity,
          }))
        );
      }
    }
    catch(error){
      console.log('Error fetching cart:', error);
    }
  }

  const addToCart = async (product) => {
    try{
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          sessionId,
          productId : product.id,
          quantity: 1,
        }),
      });
      if(response.ok){
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.id === product.id);
          if (existingItem) {
            return prevCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...prevCart, { ...product, quantity: 1 }];
        });
      }
    }
    catch(error){
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try{
      const response = await fetch(`http://localhost:5000/api/cart/remove`, {
        method: 'POST',
        headers: { 'Context-Type': 'application/json'},
        body: JSON.stringify({ sessionId, productId })
      });
      if(response.ok){
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      }
    } catch (error){
      console.error('Error removing from cart:', error);
    }
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) => item.id === id && item.quantity > 1? {
        ...item, quantity: item.quantity - 1
      } : item
      ).filter((item) => item.quantity > 0)
    )
  }

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) => 
        item.id === id ? {...item, quantity: item.quantity + 1}: item
      )
    )
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, sessionId, increaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;