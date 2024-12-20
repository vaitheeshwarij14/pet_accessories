import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shopcategory from './Pages/Shopcategory';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Hero from './Components/Home/Home';
import VideoBackground from './Components/Background/VideoBackground'; 
import './App.css';
// Import the video background component

// Admin Components
import AdminLogin from './Components/AdminLogin';  
import AdminDashboard from './Components/AdminDashboard';  

function App() {
  return (
    <div>
      <BrowserRouter>
        <VideoBackground /> {/* Add the video background here */}
        {/* Navbar and Footer will not appear on admin login */}
        <Routes>
          {/* User-facing routes */}
          <Route 
            path="/*" 
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path='/' element={<Hero />} />
                  <Route path='/Dogs' element={<Shopcategory category="Dogs" />} />
                  <Route path='/Cats' element={<Shopcategory category="Cats" />} />
                  <Route path='/Birds' element={<Shopcategory category="Birds" />} />
                  <Route path='/Others' element={<Shopcategory category="Others" />} />
                  <Route path='/shopcategory/:category' element={<Shopcategory />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/login' element={<Login />} />
                </Routes>
                <Footer />
              </>
            } 
          />

          {/* Admin-only routes */}
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
