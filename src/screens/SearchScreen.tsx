import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { searchShows, getGenres } from '../api/apiService';
import { Show, Genre } from '../types/apiTypes';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import CardSkeleton from '../components/CardSkeleton';

const SearchScreen: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState<Show[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastMovieElementRef = useCallback((node: HTMLDivElement) => {
        if (loading) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) {
            observerRef.current.observe(node);
        }
    }, [loading, hasMore]);

    const handleQueryChange = (query: string) => {
        setLoading(true);
        setQuery(query);
        setMovies([]);
        setPage(1);
        setHasMore(true);
    }

    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState<string>(initialQuery);

    const handleSearch = useCallback(async (searchQuery: string, currentPage: number) => {
        if (!searchQuery.trim()) {
            setLoading(false);
            setMovies([]);
            setHasMore(false);
            return;
        }

        setSearchParams(searchQuery ? { q: searchQuery } : {});
        setError(null);

        try {
            const response = await searchShows(searchQuery, currentPage);
            const newMovies = response.results;

            setMovies(prev =>
                currentPage === 1 ? newMovies : [...prev, ...newMovies]
            );

            setHasMore(currentPage < response.total_pages);
        } catch (err) {
            setError('Error fetching shows. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [setSearchParams]);

    // Handle search when query changes (with debounce)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (query !== initialQuery || page === 1) {
                handleSearch(query, 1);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, handleSearch, initialQuery, page]);

    // Handle pagination
    useEffect(() => {
        if (page > 1) {
            handleSearch(query, page);
        }
    }, [page, query, handleSearch]);

    // Initial search if query param exists
    useEffect(() => {
        if (initialQuery) {
            handleSearch(initialQuery, 1);
        }
    }, [initialQuery, handleSearch]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genres = await getGenres();
                setGenres(genres);
            } catch (err) {
                setError('Error fetching genres. Please try again later.');
            }
        };

        fetchGenres();
    }, []);

    // Cleanup observer on unmount
    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

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
                        onChange={handleQueryChange}
                        loading={loading && page === 1}
                    />
                </div>
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <div style={styles.resultsGrid}>
                {movies.map((movie, index) => (
                    <div
                        key={movie.id}
                        ref={index === movies.length - 1 ? lastMovieElementRef : null}
                    >
                        <Card show={movie} genres={genres} />
                    </div>
                ))}
            </div>

            {loading && (
                <div style={styles.resultsGrid}>
                    {[...Array(6)].map((_, index) => (
                        <CardSkeleton key={`skeleton-${index}`} />
                    ))}
                </div>
            )}

            {!loading && !error && query.trim() && movies.length === 0 && (
                <div style={styles.noResults}>No shows found</div>
            )}
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
    noResults: {
        textAlign: 'center' as const,
        color: '#64748b',
        marginTop: '32px',
        fontSize: '18px'
    },
    resultsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
        padding: '16px 0'
    }
};

export default SearchScreen;
