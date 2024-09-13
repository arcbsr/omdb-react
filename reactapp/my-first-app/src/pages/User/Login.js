import React, { useState, useContext, useEffect } from 'react';
import './Login.css'; // Import the CSS file
import { post } from '../../network/apiService';

import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from './context/AuthContext'; // Import your context
import { loginUser } from '../../store/userSlice'; // Import the login thunk
import LoginModal from '../../components/modals/basicmodal'; // Modal component

function Login() {

  const dispatch = useDispatch();
  const {token, status, error } = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const{ login } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  // const [error, setError] = useState('');
  useEffect(() => {
    // When the login request succeeds and a token is received, call the AuthContext login method
    if (status === 'succeeded' && token) {
      login(token); // Call login from AuthContext with token
      window.location.href = '/'; // Redirect to the home page
      closeModal();
    }
  }, [status, token, login]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      console.log(process.env.REACT_APP_ENV);
      if (process.env.REACT_APP_ENV === 'development') {
        localStorage.setItem('token', "mockToken");
        window.location.href = '/';
        return;
      }
      const response = await post('/login/', { username, password }, true); // Default to JSON content-type

      localStorage.setItem('token', response.data.result.token);
      // Navigate to home
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      // setError('Invalid username or password');
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
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
          {(status === 'idle' || status === 'failed') &&
            <button type="submit" className="btn login-btn">Login</button>
          }
        </form>
        
        {status === 'loading' && <p>Loading...</p>}
        {/* {status === 'failed' && <p>Error: {error}</p>} */}
        {/* {status === 'succeeded' && token && login(token)} */}
        {/* <button onClick={() => navigate('/register')} className="btn register-btn">
          Create New User
        </button> */}
        <a href="/register" className="register-link">
          Create New User
        </a>
      </div>
    </div>
  );
}

export default Login;
