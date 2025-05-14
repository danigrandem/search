import React, { useState, useEffect, useCallback } from 'react';
import { searchShows } from '../api/apiService';
import { Show, SearchResult } from '../types/apiTypes';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';

const SearchScreen: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Show[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await searchShows(searchQuery);
            const formattedResults = data.map(item => item.show);
            setResults(formattedResults);
        } catch (err) {
            setError('Error fetching shows. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Debounce search to avoid too many API calls
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSearch(query);
        }, 300); // Wait for 300ms after user stops typing

        return () => clearTimeout(timeoutId);
    }, [query, handleSearch]);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>TV Show Search</h1>
                <p style={styles.subtitle}>Start typing to search for TV shows</p>
            </div>

            <div style={styles.searchSection}>
                <div style={styles.searchContainer}>
                    <SearchBar
                        value={query}
                        onChange={setQuery}
                        loading={loading}
                    />
                </div>
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <div style={styles.resultsGrid}>
                {results.map(show => (
                    <Card key={show.id} show={show} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 16px'
    },
    header: {
        textAlign: 'center' as const,
        marginBottom: '32px'
    },
    title: {
        fontSize: '36px',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '8px'
    },
    subtitle: {
        fontSize: '18px',
        color: '#64748b'
    },
    searchSection: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '32px',
        padding: '0 16px'
    },
    searchContainer: {
        width: '100%',
        maxWidth: '600px'
    },
    error: {
        color: '#ef4444',
        textAlign: 'center' as const,
        marginBottom: '16px'
    },
    resultsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        padding: '16px 0'
    }
};

export default SearchScreen;
