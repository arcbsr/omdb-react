
import About from '../../pages/About';  // Your other pages
import Contact from '../../pages/Contact'; // Another page
import Home from '../../pages/Home/Home'; // Another page
import Login from '../../pages/User/Login'; // Another page
import Signup from '../../pages/User/Signup'; // Another page
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MovieContainer from '../../modb/containers/MovieContainer';
import MovieDetail from '../../pages/MovieDetail';
import { BookmarkProvider } from '../../modb/context/BookmarkContext';
import PrivateRoute from './PrivateRoute';

const MainRoutes = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={
          <Home />
          } />
        
        <Route path="/movies" element={
          <PrivateRoute>
            <BookmarkProvider>
              <MovieContainer />
            </BookmarkProvider>
          </PrivateRoute>
        } />
        <Route path="/details/:imdbID" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </main>
  )
}

export default MainRoutes