import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <button>Your Cart</button>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <button>Your Products</button>
            </div>
        </Link>
   </div>
  )
}

export default Sidebar