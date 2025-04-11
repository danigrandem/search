import React, { useState } from 'react';
import { searchShows } from '../api/apiService';
import { Show, SearchResult } from '../types/apiTypes';
import  SearchBar  from '../components/SearchBar';

const SearchScreen: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Show[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = () => {
        if (!query.trim()) return; // Prevent empty queries
        setLoading(true);
        setError(null);

        searchShows(query)
            .then((data: SearchResult[]) => {
                const formattedResults = data.map(item => item.show);
                setResults(formattedResults);
            })
            .catch(() => {
                setError('Error fetching shows. Please try again later.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Search Shows</h1>
            <SearchBar value={query} onChange={setQuery} />
            <button onClick={handleSearch} style={{ padding: '5px' }}>Search</button>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <ul>
                {results.map(show => (
                    <li key={show.id}>{show.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchScreen;
