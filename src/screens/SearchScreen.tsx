import React, { useState } from 'react';
import { searchShows } from '../api/apiService';
import { Show, SearchResult } from '../types/apiTypes';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';

const SearchScreen: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Show[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = () => {
        if (!query.trim()) return;
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
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>TV Show Search</h1>
                <p style={styles.subtitle}>Find your favorite TV shows</p>
            </div>

            <div style={styles.searchSection}>
                <SearchBar value={query} onChange={setQuery} />
                <button
                    onClick={handleSearch}
                    style={{
                        ...styles.button,
                        ...(loading ? styles.buttonDisabled : {})
                    }}
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
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
        flexDirection: 'column' as const,
        gap: '16px',
        marginBottom: '32px',
        alignItems: 'center'
    },
    button: {
        padding: '12px 24px',
        fontSize: '16px',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        minWidth: '120px'
    },
    buttonDisabled: {
        backgroundColor: '#93c5fd',
        cursor: 'not-allowed'
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
