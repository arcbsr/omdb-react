import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlay, FaDownload, FaBookmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Home.css';
import Login from '../User/Login'; // Another page

function Home() {
  const [movies, setMovies] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoggedIn] = useState(Boolean(localStorage.getItem('token')));
  const API_KEY = '666da4ed';
  const API_URL = `https://www.omdbapi.com/?s=music&type=movie&apikey=${API_KEY}&page=${currentPage}`;

  useEffect(() => {
    // if (!isLoggedIn) {
    //   return;
    // }
    axios.get(API_URL)
      .then((response) => {
        setMovies(response.data.Search || []);
        setTotalPages(Math.ceil(response.data.totalResults / 10)); // Assuming 10 results per page
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [currentPage]);
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     window.location.href = '/login';
  //   }
  // }, [isLoggedIn]);
  const handleBookmark = (id) => {
    if (bookmarked.includes(id)) {
      setBookmarked(bookmarked.filter(movieId => movieId !== id));
    } else {
      setBookmarked([...bookmarked, id]);
    }
  };

  const handleNavigation = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    // !isLoggedIn ? (
    //   <Login />
    // ) : (
    // )
    <div className="home">
      <main className="content">
        <div className="music-list">
          <ul>
            {movies.map((movie) => (
              <li key={movie.imdbID} className="track-item">
                <img src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150'} alt={movie.Title} className="thumbnail" />
                <div className="track-info">
                  <h3>{movie.Title}</h3>
                  <p>Year: {movie.Year}</p>
                </div>
                <div className="track-buttons">
                  <FaPlay
                    className="icon play-icon"
                    onClick={() => alert(`Playing ${movie.Title}`)}
                  />
                  <a
                    href={`https://www.imdb.com/title/${movie.imdbID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon download-icon"
                  >
                    <FaDownload />
                  </a>
                  <FaBookmark
                    className={`icon bookmark-icon ${bookmarked.includes(movie.imdbID) ? 'bookmarked' : ''}`}
                    onClick={() => handleBookmark(movie.imdbID)}
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <FaChevronLeft
              className={`nav-icon ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handleNavigation('prev')}
            />
            <span>Page {currentPage} of {totalPages}</span>
            <FaChevronRight
              className={`nav-icon ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handleNavigation('next')}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
export default Home;
