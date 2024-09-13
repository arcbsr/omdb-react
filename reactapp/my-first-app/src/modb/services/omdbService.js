import axios from 'axios';
import { movieApi } from '../../network/apiService';

const API_KEY = '666da4ed'; // Replace with your OMDb API Key
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (query, page = 1) => {
    const response = await movieApi(BASE_URL, {
        apikey: API_KEY,
        s: query || 'movie',
        page
    });
    // const response = await axios.get(BASE_URL, {
    //     params: {
    //         apikey: API_KEY,
    //         s: query || 'movie',
    //         page
    //     }
    // });

    return response.Search || [];
};

export const fetchMovieDetails = async (imdbID) => {
    const response = await axios.get(BASE_URL, {
        params: {
            apikey: API_KEY,
            i: imdbID
        }
    });

    return response.data;
};
