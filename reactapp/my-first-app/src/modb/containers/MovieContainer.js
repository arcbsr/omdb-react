import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { useBookmarks } from '../context/BookmarkContext';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/OmdbList.css';
import Login from '../../pages/User/Login'; // Another page
import { getMovies } from '../../store/MoviesSlice';

const MovieContainer = () => {
    const dispatch = useDispatch();
    // const [movies, setMovies] = useState([]);
    const { movies, status, error } = useSelector((state) => state.movies);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('matrix');
    const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
    useEffect(() => {
        // fetchMovies(query, page).then(setMovies);
        dispatch(getMovies({ query, page }));
    }, [query, page]);

    return (
        <div className="home">
            <main className="content">
                <SearchBar onSearch={setQuery} />
                <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
                <div className="mhome">
                    <main className="mcontent">
                        {/* {status === 'loading' && <div className="spinner"></div>} */}
                        {/* {status === 'loading' && <p>Loading...</p>} */}
                        {/* {status === 'failed' && <p>Error: {error}</p>} */}
                        {status === 'succeeded' && movies &&
                            <MovieList movies={movies}
                                onBookmark={addBookmark} // Pass bookmark function
                                onRemoveBookmark={removeBookmark} // Pass remove bookmark function
                                isBookmarked={isBookmarked}
                            />
                        }
                    </main>
                </div>
            </main>
        </div>
    );
};

export default MovieContainer;
