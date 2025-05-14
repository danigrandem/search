import React, { useState } from 'react';
import { searchShows } from '../api/apiService';
import { Show, SearchResult } from '../types/apiTypes';
import SearchBar from '../components/SearchBar';

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
                    <div key={show.id} style={styles.card}>
                        {show.image?.medium && (
                            <img
                                src={show.image.medium}
                                alt={show.name}
                                style={styles.cardImage}
                            />
                        )}
                        <div style={styles.cardContent}>
                            <h2 style={styles.cardTitle}>{show.name}</h2>
                            {show.summary && (
                                <div
                                    style={styles.cardDescription}
                                    dangerouslySetInnerHTML={{
                                        __html: show.summary.length > 150
                                            ? show.summary.substring(0, 150) + '...'
                                            : show.summary
                                    }}
                                />
                            )}
                        </div>
                    </div>
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
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease',
        cursor: 'pointer'
    },
    cardImage: {
        width: '100%',
        height: '200px',
        objectFit: 'cover' as const
    },
    cardContent: {
        padding: '16px'
    },
    cardTitle: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: '8px'
    },
    cardDescription: {
        fontSize: '14px',
        color: '#64748b',
        lineHeight: '1.5'
    }
};

export default SearchScreen;
