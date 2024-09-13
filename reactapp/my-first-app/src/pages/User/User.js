// import React, { useState } from 'react';
// import Signup from './Signup';
// import Login from './Login';
// import './User.css';

// function User() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleSignup = () => {
//     alert('Signup successful! You can now log in.');
//   };

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     localStorage.removeItem('user');
//   };

//   return (
//     <div className="App">
//       {isLoggedIn ? (
//         <div>
//           <h1>Welcome back!</h1>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <div>
//           <Signup onSignup={handleSignup} />
//           <Login onLogin={handleLogin} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default User;
