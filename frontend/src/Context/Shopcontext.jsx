import React, { createContext, useState, useEffect } from 'react';

export const Shopcontext = createContext();

const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [all_product, setAllProduct] = useState([]);
  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user?.id; 
    } catch (error) {
      console.error('Error parsing auth token:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCartOnLogin = () => {
      const token = localStorage.getItem('auth-token'); 
      const userId = getUserIdFromToken(token); 
      console.log('Retrieved User ID from token:');

      if (userId) {
        const cartKey = `cart_${userId}`; 
        const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
        console.log(`Trying to load cart from localStorage with key:`, savedCart);
        setCart(savedCart);
      } else {
        console.error('No user ID found. Cart will not be loaded.');
      }
    };

    fetchCartOnLogin();

    window.addEventListener('storage', fetchCartOnLogin); 
    return () => {
      window.removeEventListener('storage', fetchCartOnLogin);
    };
  }, []);

  const addToCart = (item) => {
    const token = localStorage.getItem('auth-token');
    const userId = getUserIdFromToken(token);
    console.log('Retrieved User ID for adding to cart:');

    if (!userId) {
      console.error('User not logged in, cannot add to cart.');
      return;
    }

    setCart((prevCart) => {
      const itemInCart = prevCart.find((cartItem) => cartItem.id === item.id);
      let updatedCart;

      if (itemInCart) {
        updatedCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCart = [...prevCart, { ...item, quantity: 1 }];
      }

      const cartKey = `cart_${userId}`; 
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      console.log(`Updated cart in localStorage with key ${cartKey}:`, updatedCart);
      return updatedCart;
    });
  };

  const updateCartItemWeight = (itemId, newWeight) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, weight: newWeight } : item
      )
    );
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    const token = localStorage.getItem('auth-token'); 
    const userId = getUserIdFromToken(token);
    console.log('Retrieved User ID for removing from cart:');

    if (!userId) {
      console.error('User not logged in, cannot remove from cart.');
      return;
    }

    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== itemId);

      const cartKey = `cart_${userId}`; 
      localStorage.setItem(cartKey, JSON.stringify(updatedCart));
      console.log(`Updated cart in localStorage with key ${cartKey}:`, updatedCart);
      return updatedCart;
    });
  };

  const fetchProducts = async (category) => {
    try {
      const url = category ? `http://localhost:5000/allproducts?category=${category}` : 'http://localhost:5000/allproducts';
      const response = await fetch(url);
      const data = await response.json();
      setAllProduct(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, []);

  return (
    <Shopcontext.Provider
      value={{
        cart,
        addToCart,
        updateCartItemWeight,
        updateCartItemQuantity,
        removeFromCart,
        all_product,
        fetchProducts,
      }}
    >
      {children}
    </Shopcontext.Provider>
  );
};

export default ShopProvider;
