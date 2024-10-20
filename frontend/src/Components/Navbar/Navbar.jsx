import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.avif';  
import './Navbar.css';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");

  return (
    <div className="navbar">
      <div className="nav">
        <img src={logo} alt="Logo" /> 
        <p>Freshmart</p>
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
      </div>
      <div className="nav-login">
        
        {localStorage.getItem('auth-token') ? (
          <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>
            Logout
          </button>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}
          <Link to="/cart"><button>Cart</button></Link>
      </div>
    </div>
  );
}

export default Navbar;
