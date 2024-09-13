import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './MoviesSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        movies: moviesReducer, // Add the movies slice to the store
        user: userReducer,
    },
});

export default store;
