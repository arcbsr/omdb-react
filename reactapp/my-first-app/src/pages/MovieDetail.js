import React, { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../modb/services/omdbService';

const MovieDetail = ({ match }) => {
    const [movie, setMovie] = useState(null);
    const { imdbID } = match.params;

    useEffect(() => {
        fetchMovieDetails(imdbID).then(setMovie);
    }, [imdbID]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Plot}</p>
            <p>Genre: {movie.Genre}</p>
            <p>Released: {movie.Released}</p>
        </div>
    );
};

export default MovieDetail;
