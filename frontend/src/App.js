import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shopcategory from './Pages/Shopcategory';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Hero from './Components/Home/Home';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path='/'element={<Hero />}/>
          <Route path='/vegetables'element={<Shopcategory category="vegetables" />}/>
          <Route path='/fruits'element={<Shopcategory category="fruits" />}/>
          <Route path='/dryfruits'element={<Shopcategory category="dryfruits" />}/>
          <Route path="/shopcategory/:category" element={<Shopcategory />} />
          <Route path='/cart' element={<Cart />}/>
          <Route path='/login' element={<Login />}/>
      </Routes>
      <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
