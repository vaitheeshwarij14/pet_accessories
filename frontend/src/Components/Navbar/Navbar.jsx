import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.avif';  
import './Navbar.css';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");

  // Function to handle sparkle effect on button click
  const handleButtonClick = (e) => {
    const button = e.target;
    button.classList.add('active');
    setTimeout(() => {
      button.classList.remove('active');
    }, 600); // Matches the duration of the sparkle animation (0.6s)
  };

  return (
    <div className="navbar">
      <div className="nav">
        <img src={logo} alt="Logo" /> 
        <p>Petique</p>
      </div>

      <div className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to="/">Shop</Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("Dogs")}>
          <Link to="/Dogs">Dogs</Link>
          {menu === "Dogs" && <hr />}
        </li>
        <li onClick={() => setMenu("Cats")}>
          <Link to="/Cats">Cats</Link>
          {menu === "Cats" && <hr />}
        </li>
        <li onClick={() => setMenu("Birds")}>
          <Link to="/Birds">Birds</Link>
          {menu === "Birds" && <hr />}
        </li>
        <li onClick={() => setMenu("Others")}>
          <Link to="/Others">Others</Link>
          {menu === "Others" && <hr />}
        </li>
      </div>

      <div className="nav-login">
        {localStorage.getItem('auth-token') ? (
          <button 
            onClick={(e) => { 
              localStorage.removeItem('auth-token'); 
              window.location.replace('/'); 
              handleButtonClick(e);
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button onClick={handleButtonClick}>Login</button>
          </Link>
        )}
        <Link to="/cart">
          <button onClick={handleButtonClick}>Cart</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
