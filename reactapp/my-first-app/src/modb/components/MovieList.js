import React from 'react';
import MovieCard from './MovieCard';
import '../styles/OmdbList.css';

const MovieList = ({ movies, onBookmark, onRemoveBookmark, isBookmarked }) => {
    return (
            
                <div className="music-list">
                    {movies.map(movie => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            onBookmark={onBookmark}
                            onRemoveBookmark={onRemoveBookmark}
                            isBookmarked={isBookmarked(movie.imdbID)}
                        />
                    ))}
                </div>
    );
};

export default MovieList;
