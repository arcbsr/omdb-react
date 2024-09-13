import React, { createContext, useState, useContext } from 'react';

const BookmarkContext = createContext([]);

export const BookmarkProvider = ({ children }) => {
    const [bookmarks, setBookmarks] = useState([]);

    const addBookmark = (movie) => {
        setBookmarks((prev) => {
            if (!prev.some((m) => m.imdbID === movie.imdbID)) {
                return [...prev, movie];
            }
            return prev;
        });
    };

    const removeBookmark = (id) => {
        setBookmarks((prev) => prev.filter((movie) => movie.imdbID !== id));
    };

    const isBookmarked = (id) => {
        return bookmarks.some((movie) => movie.imdbID === id); // Check if the movie is bookmarked
    };

    return (
        <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
            {children}
        </BookmarkContext.Provider>
    );
};

export const useBookmarks = () => useContext(BookmarkContext);
