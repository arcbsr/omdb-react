import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import the CSS file
import { post } from '../../network/apiService';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(process.env.REACT_APP_ENV === 'development') {
      localStorage.setItem('token', "mockToken");
      window.location.href = '/';
      return;
    }
    // Create a FormData object
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  
    try {
      // Send the FormData object
      // const response = await axios.post('/api/register/', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data' // Specify the content type
      //   }
      // });
      const response = await post('register/', {username,password}, true); // Default to JSON content-type
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      // Navigate to home
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn register-btn">Register</button>
        </form>
        <a href="/login" className="login-link">
          Back to Login
        </a>
        {/* <button onClick={() => navigate('/login')} className="btn back-btn">
          Back to Login
        </button> */}
      </div>
    </div>
  );
}

export default Register;
