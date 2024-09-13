// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // If the token exists, set isAuthenticated to true
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    console.log('Token login:', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    console.log('User Logout');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
