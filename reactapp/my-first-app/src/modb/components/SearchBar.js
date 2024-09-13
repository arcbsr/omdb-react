import React, { useState } from 'react';
import '../styles/searchbox.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search movies or music..."
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">Search</button>
        </div>
    );
};

export default SearchBar;
