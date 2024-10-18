import React from 'react'
import './Footer.css';
const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-item">
            <h2>Grocery Management</h2>
            <p>We are providing you the best fruits and vegetables.</p>
            <p>Where it is available for you at all the time.</p>
            <p>The products delivers on time with high quality.</p>
        </div>
        <div className="footer-item1">
            <h2>Our services:</h2>
            <ul className='footer-service'>
                <li>Delivers on time</li>
                <li>Fresh products</li>
                <li>High quality products</li>
                <li>Low cost</li>
            </ul>
        </div>
        <div className="footer-item2">
            <h2>Connect with us:</h2>
            <p>Contact: +916374386020</p>
            <p>Email  :  swethamk45@gmail.com</p>
        </div>
    </div>
  )
}

export default Footer