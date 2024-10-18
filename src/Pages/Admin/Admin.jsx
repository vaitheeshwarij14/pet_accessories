import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Addproduct from '../../Components/Addproduct/Addproduct';
import Listproduct from '../../Components/Listproduct/Listproduct';

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <div className='admin-content'>
        <Routes>
          <Route path='/addproduct' element={<Addproduct />} />
          <Route path='/listproduct' element={<Listproduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
