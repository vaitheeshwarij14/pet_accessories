import React, { useState, useEffect, useContext } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { Shopcontext } from '../../Context/Shopcontext'; 

const Hero = () => {
  const { addToCart, updateCartItemQuantity, removeFromCart, cart } = useContext(Shopcontext); 
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState({}); 
  const [cartQuantities, setCartQuantities] = useState({}); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/allproducts');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const quantitiesFromCart = {};
    cart.forEach((cartItem) => {
      quantitiesFromCart[cartItem.id] = cartItem.quantity;
    });
    setCartQuantities(quantitiesFromCart);
  }, [cart]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleWeightChange = (productId, event) => {
    setSelectedWeight((prev) => ({ ...prev, [productId]: parseFloat(event.target.value) }));
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('auth-token');
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated()) {
      alert('You need to be logged in to add products to the cart.');
      navigate('/login'); 
    } else {
      const weight = selectedWeight[product._id] || 1;
      const productToAdd = {
        id: product._id,
        name: product.name,
        image: product.image,
        pricePerKg: product.pricePerKg,
        weight: weight,
        quantity: 1,
      };
      addToCart(productToAdd);

      setCartQuantities((prev) => ({ ...prev, [product._id]: 1 }));
    }
  };

  const handleIncreaseQuantity = (productId) => {
    const newQuantity = (cartQuantities[productId] || 0) + 1;
    setCartQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));
    updateCartItemQuantity(productId, newQuantity);
  };

  const handleDecreaseQuantity = (productId) => {
    const newQuantity = (cartQuantities[productId] || 1) - 1;
    if (newQuantity < 1) {
      setCartQuantities((prev) => {
        const { [productId]: _, ...rest } = prev;
        return rest;
      });
      removeFromCartContext(productId);
    } else {
      setCartQuantities((prev) => ({
        ...prev,
        [productId]: newQuantity,
      }));
      updateCartItemQuantity(productId, newQuantity);
    }
  };

  const removeFromCartContext = (productId) => {
    removeFromCart(productId);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="hero">
        <h2>SHOP FOR YOUR FAVOURITES</h2>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="hero-item">
            {filteredProducts.map((item) => (
              <div key={item._id} className="product-item">
                <img src={item.image} alt={item.name} className="product-image" />
                <span className="product-name">{item.name}</span>
                
                <span className="product-price">
                  Price: ₹{(item.pricePerKg * (selectedWeight[item._id] || 1)).toFixed(2)}
                </span>
                {cartQuantities[item._id] ? (
                  <div className="quantity-controls">
                    <button onClick={() => handleDecreaseQuantity(item._id)}>-</button>
                    <span>{cartQuantities[item._id]}</span>
                    <button onClick={() => handleIncreaseQuantity(item._id)}>+</button>
                  </div>
                ) : (
                  <button 
                    className="add-to-cart" 
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
