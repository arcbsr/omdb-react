import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies } from '../modb/services/omdbService';

// Create async thunk for fetching movies
export const getMovies = createAsyncThunk(
    'movies/getMovies',
    async ({ query, page }) => {
        const response = await fetchMovies(query, page);
        return response; // Assume this returns the movies array
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        status: 'idle', // idle, loading, succeeded, failed
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload; // Set movies when fetch succeeds
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default moviesSlice.reducer;
