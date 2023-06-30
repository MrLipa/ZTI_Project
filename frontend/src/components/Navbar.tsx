import React from 'react';

/**
 * @typedef {Object} Navbar
 * @description This React component represents the navigation bar.
 * It displays a logo and a set of navigation links.
 */
const Navbar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end', height: '100px' }}>
      <div style={{ listStyleType: 'none', display: 'flex', alignItems: 'center', marginLeft: '30px', marginTop: "auto", marginBottom: "auto", fontWeight: 'bold', fontSize: '32px' }}>
        <span role="img" aria-label="Plane" style={{ marginRight: '10px' }}>✈️</span>
        AIR-BOOK
      </div>
      <ul style={{ listStyleType: 'none', display: 'flex', alignItems: 'center', margin: 'auto', fontSize: '20px' }}>
        <li className="navbar-link" style={{ margin: '0 60px' }}><a href="/" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'white' }}>Home</a></li>
        <li className="navbar-link" style={{ margin: '0 60px' }}><a href="/help" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'white' }}>Help</a></li>
        <li className="navbar-link" style={{ margin: '0 60px' }}><a href="/login" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'white' }}>Login</a></li>
        <li className="navbar-link" style={{ margin: '0 60px' }}><a href="/register" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'white' }}>Register</a></li>
      </ul>
    </nav>
  );
}

export { Navbar };
