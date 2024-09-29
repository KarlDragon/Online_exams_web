import React from 'react';
import "./Homepage.scss"
import { Link } from 'react-router-dom';
import BGLogo from '../../assets/BG_logo.png';

const HomePage: React.FC = () => {
  return (
    <main>
      <header>
        <div className="logo">
          <img src={BGLogo} alt="logo" />
        </div>
        <div className="LoginRegistorSpot">
          <Link to="/login" className="button-link">
            <button className="button">Đăng nhập</button>
          </Link>
          <Link to="/register" className="button-link">
            <button className="button">Đăng ký</button>
          </Link>
        </div>
      </header>
    </main>
  );
};

export default HomePage;