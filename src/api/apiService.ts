import axios from 'axios';
import { Show, Genre, SearchResult } from '../types/apiTypes';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = process.env.REACT_APP_TMDB_TOKEN;

axios.interceptors.request.use(
    (config) => {
        config.headers.accept = 'application/json';
        config.headers.Authorization = `Bearer ${TMDB_TOKEN}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getGenres = async (): Promise<Array<Genre>> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/genre/movie/list?language=en`);
        return response.data.genres;
    } catch (error) {
        throw new Error('Failed to fetch genres');
    }
};

export const searchShows = async (query: string, page: number = 1): Promise<SearchResult> => {
    try {
        // Fetch both shows and genres in parallel
        const [showsResponse, genres] = await Promise.all([
            axios.get(`${API_BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`),
            getGenres()
        ]);

        // Create a map of genre IDs to genre objects for quick lookup
        const genreMap = new Map(genres.map(genre => [genre.id, genre]));

        // Add full genre objects to each show
        const showsWithGenres = showsResponse.data.results.map((show: Show) => ({
            ...show,
            genres: show.genre_ids.map(id => genreMap.get(id)).filter(Boolean)
        }));

        return {
            ...showsResponse.data,
            results: showsWithGenres
        };
    } catch (error) {
        throw new Error('Failed to fetch shows');
    }
};

export const getShowById = async (id: string): Promise<Show> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/movie/${id}?language=en-US`);
        return response.data;
    } catch (error) {
        console.error('Error fetching show details:', error);
        throw new Error('Failed to fetch show details');
    }
};
