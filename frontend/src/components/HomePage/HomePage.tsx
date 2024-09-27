import React from 'react';
import "./Homepage.scss"
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <main>
      <header>
        <div className="logo">Trang chủ</div>
        <div className="LoginRegistorSpot">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </header>
      <div className="text">
        <h1>Welcome to our website</h1>
      </div>
    </main>
  );
};

export default HomePage;