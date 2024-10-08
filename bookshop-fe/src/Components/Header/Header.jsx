import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import AuthContext from '../../Pages/Auth/AuthContext';

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleSearch = () => {
    if (searchKeyword.trim()) {
      navigate(`/findProduct?keyword=${encodeURIComponent(searchKeyword)}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src="/logoweb.jpg" className="logo-image" alt="BookShop Logo" />
          </Link>
          <Link to="/" className="logo-text">BookShop</Link>
        </div>
        <nav className="navigation">
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/shop">Shop</Link></li>
          </ul>
        </nav>
        <div className="search-bar-header">
          <input 
            type="text" 
            placeholder="Tìm sách..." 
            value={searchKeyword}
            onChange={handleInputChange}
          />
          <button className="search-btn" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>

        {isLoggedIn ? (
          <div className="cart-icon">
            <Link to="/cart">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </div>
        ) : (
          <div></div>
        )}
        
        <div className="user-actions">
          {isLoggedIn ? (
            <div className="user-icon">
              <div className="dropdown">
                <button className="dropbtn">
                  <i className="fas fa-user"></i>
                </button>
                <div className="dropdown-content">
                  <Link to="/profile">Thông tin cá nhân</Link>
                  <Link to="/orders">Đơn hàng</Link>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/register">Đăng kí</Link>
              <Link to="/login">Đăng nhập</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

