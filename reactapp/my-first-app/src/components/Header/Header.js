import React, { useState, useEffect, useContext } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';  // Import the CSS file for styling

import ThemeToggleButton from '../Themes/ThemeToggleButton';
import { post } from '../../network/apiService';
import { AuthContext } from '../../pages/User/context/AuthContext'; // Import your context

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));

  const{ logout } = useContext(AuthContext);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const handleLogout = async ( e ) => {
    e.preventDefault();
    try {
      if (process.env.REACT_APP_BYPASS  === 'true') {
        logout();
        return;
      }
      
      const response = await post('logoutall/', {}, false); // Default to JSON content-type
      console.log(response);
      // Check if the status code is 204 (No Content) for success
      if (response.status === 204) {
        
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      logout();
      window.location.href = '/';
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Update login state when the component mounts or when the token changes
    const checkLoginStatus = () => {
      setIsLoggedIn(Boolean(localStorage.getItem('token')));
    };
    checkLoginStatus();
  }, []);

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">MyApp</h1>
        {isMobile ? (
          <>
            <button className="menu-icon" onClick={toggleDrawer}>
              {isDrawerOpen ? <FaTimes /> : <FaBars />}
            </button>
            <nav className={`nav-drawer ${isDrawerOpen ? 'open' : ''}`}>
              <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
                {!isLoggedIn ? (
                  // <li><a href="/login"  className="login-btn">Login</a></li>
                  <li><button onClick={() => window.location.href='/login'} className="logins-btn">Login</button></li>
                ) : (
                  <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
                )}
                
              </ul>
            </nav>
          </>
        ) : (
          <nav className="nav-horizontal">
            <ul className="nav-links">
              <li><a href="/">Home</a></li>
              <li><a href="/movies">Movies</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
              {!isLoggedIn ? (
                  <li><button onClick={() => window.location.href='/login'} className="logins-btn">Login</button></li>
              ) : (
                <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
              )}
              {/* <li><ThemeToggleButton /></li> */}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
