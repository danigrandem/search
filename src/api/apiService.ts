import axios from 'axios';
import { SearchResult } from '../types/apiTypes';
const API_URL = 'https://api.tvmaze.com/search/shows?q=';

export const searchShows = (query: string): Promise<SearchResult[]> => {
    return axios.get(`${API_URL}${query}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw new Error('Network or Server Error');
        });
};
