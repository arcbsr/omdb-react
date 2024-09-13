import React from 'react';
import '../styles/OmdbList.css';
import { FaPlay, FaDownload, FaBookmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MovieCard = ({ movie, onBookmark, onRemoveBookmark, isBookmarked }) => {
    return (
        <li key={movie.imdbID} className="track-item">
            <img src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/150'} alt={movie.Title} className="thumbnail" />
            <div className="track-info">
                <h3>{movie.Title} {isBookmarked}</h3>
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
                {/* Conditionally render the bookmark icon */}
                <FaBookmark
                    className={`icon bookmark-icon ${isBookmarked ? 'bookmarked' : ''}`}
                    onClick={() => isBookmarked ? onRemoveBookmark(movie.imdbID) : onBookmark(movie)}
                />
            </div>
        </li>
    );
};

export default MovieCard;
