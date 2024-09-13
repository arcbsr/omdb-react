// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../pages/User/context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     // Open the login page in a new tab
  //     window.open('/login', '_blank');
  //   }
  // }, [isAuthenticated]);
  // If not authenticated, redirect to login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
