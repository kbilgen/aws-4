import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ signOut }) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      <h1>ProtekFin | 2024</h1>
      <div>
        <Link to="/Grafik">Grafik</Link> | {/* Yeni sayfa için Link ekle */}
        <Link to="/Raporlar">Raporlar</Link> {/* Raporlar sayfası için Link */}
      </div>
      <button onClick={signOut}>Sign Out</button>
    </nav>
  );
};

export default Navbar;
