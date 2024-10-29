import React from 'react';
import './footer.css'; // import if I decide to use a separate CSS file for the footer
import Clinique from 'images/Main Page/Clinique Logo.png'; 
import Dior from 'images/Main Page/Dior Logo.png'; 
import MAC from 'images/Main Page/MAC Logo.png'; 
import NARS from 'images/Main Page/NARS Logo.png'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div className="footer-socials">
        <a href="https://www.clinique.com" target="_self" rel="noopener noreferrer">
             <img src="images/Main Page/Clinique Logo.pngimages/Main Page/Clinique Logo.png" alt="Clinique" />
        </a>
        <a href="https://www.dior.com/en_us/beauty" target="_self" rel="noopener noreferrer">
             <img src="images/Main Page/Dior Logo.png" alt="Dior" />
        </a>
        <a href="https://www.maccosmetics.com" target="_self" rel="noopener noreferrer">
            <img src="images/Main Page/MAC Logo.png" alt="MAC Cosmetics" />
        </a>
        <a href="https://www.narscosmetics.com" target="_self" rel="noopener noreferrer">
            <img src="images/Main Page/NARS Logo.png" alt="NARS Cosmetics" />
</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 The Beauty Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;