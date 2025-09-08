// src/CartContext.js
import { createContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  //generate or retrive session id
  useEffect(() => {
    let sid = localStorage.getItem('sessionId');
    if (!sid) {
      sid = 'sess_' + Math.random().toString(36).slice(2);
      localStorage.setItem('sessionId', sid);
    }
    setSessionId(sid);
  }, []);

  // Fetch cart when sessionId is set
  useEffect(() => {
    if (sessionId) {
      fetchCart(sessionId);
    }
  }, [sessionId]);

  const fetchCart = async (sid) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/${sid}`);
      if (response.ok) {
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
            quantity: item.quantity,
          }))
        );
      }
    }
    catch (error) {
      console.log('Error fetching cart:', error);
    }
  }

  const addToCart = async (product) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          productId: product.id,
          quantity: 1,
        }),
      });
      if (product.sold) {
        return res.status(400).json({ message: "This product is already sold." });
      }
      if (response.ok) {
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
    catch (error) {
      return res.status(500).json({ message: 'Error adding to cart' });
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/remove`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, productId })
      });
      if (response.ok) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error removing from cart' });

    }
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) => item.id === id && item.quantity > 1 ? {
        ...item, quantity: item.quantity - 1
      } : item
      ).filter((item) => item.quantity > 0)
    )
  }

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, sessionId, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;