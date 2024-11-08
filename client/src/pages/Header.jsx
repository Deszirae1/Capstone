import React from 'react';

const Header = () => {
  return (
    <header style={{ backgroundColor: 'black', color: 'rgb(217, 255, 0)', padding: 'auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', textShadow: '2px 2px 4px #ff00cc', }}>The Beauty Shop</h1> 
      <h3 style={{ color: 'white', fontSize: '1.25rem', padding: '4px' }}>Glow with Confidence, Beauty in Every Review!</h3>
    </header>
  );
};

export default Header;
