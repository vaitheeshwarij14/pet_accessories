import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-item">
            <h2>Pet Accessories & Guidance</h2>
            <p>We provide a wide range of pet accessories tailored to your pet's needs.</p>
            <p>Get expert guidance on caring for your pets and ensuring their well-being.</p>
            <p>Our products are of the highest quality and delivered right to your door.</p>
        </div>
        <div className="footer-item1">
            <h2>Our services:</h2>
            <ul className='footer-service'>
                <li>On-time delivery</li>
                <li>Premium quality accessories</li>
                <li>Expert pet care guidance</li>
                <li>Affordable prices</li>
            </ul>
        </div>
        <div className="footer-item2">
            <h2>Connect with us:</h2>
            <p>Contact: +91876877653</p>
            <p>Email  :  petcare@gmail.com</p>
        </div>
    </div>
  );
};

export default Footer;
