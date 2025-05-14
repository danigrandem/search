import axios from 'axios';
import { Show } from '../types/apiTypes';

const API_BASE_URL = 'https://api.tvmaze.com';

export const searchShows = async (query: string): Promise<Array<{ show: Show }>> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching shows:', error);
        throw new Error('Failed to fetch shows');
    }
};

export const getShowById = async (id: string): Promise<Show> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/shows/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching show details:', error);
        throw new Error('Failed to fetch show details');
    }
};
