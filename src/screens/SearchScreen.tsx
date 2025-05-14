import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchShows } from '../api/apiService';
import { Show } from '../types/apiTypes';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import CardSkeleton from '../components/CardSkeleton';

const ITEMS_PER_PAGE = 6;

const SearchScreen: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [allResults, setAllResults] = useState<Show[]>([]);
    const [visibleResults, setVisibleResults] = useState<Show[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const loadingRef = useRef<HTMLDivElement>(null);

    const handleQueryChange = (query: string) => {
        setLoading(true);
        setQuery(query);
        setCurrentPage(1);
        setVisibleResults([]);
        setAllResults([]);
        setHasMore(true);
    }

    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState<string>(initialQuery);

    const handleSearch = useCallback(async (searchQuery: string) => {
        setSearchParams(searchQuery ? { q: searchQuery } : {});

        if (!searchQuery.trim()) {
            setLoading(false);
            setAllResults([]);
            setVisibleResults([]);
            setHasMore(false);
            return;
        }

        setError(null);

        try {
            const data = await searchShows(searchQuery);
            const formattedResults = data.map(item => item.show);
            setAllResults(formattedResults);
            setVisibleResults(formattedResults.slice(0, ITEMS_PER_PAGE));
            setHasMore(formattedResults.length > ITEMS_PER_PAGE);
        } catch (err) {
            setError('Error fetching shows. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [setSearchParams]);

    const loadMore = useCallback(() => {
        if (loading || !hasMore) return;

        const nextPage = currentPage + 1;
        const start = (nextPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const newResults = allResults.slice(0, end);

        setVisibleResults(newResults);
        setCurrentPage(nextPage);
        setHasMore(end < allResults.length);
    }, [loading, hasMore, currentPage, allResults]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    loadMore();
                }
            },
            { threshold: 0.5 }
        );

        if (loadingRef.current) {
            observer.observe(loadingRef.current);
        }

        return () => observer.disconnect();
    }, [loadMore, hasMore]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSearch(query);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, handleSearch]);

    useEffect(() => {
        if (initialQuery) {
            handleSearch(initialQuery);
        }
    }, [initialQuery, handleSearch]);

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
                        loading={loading}
                    />
                </div>
            </div>

            {loading && currentPage === 1 && (
                <div style={styles.resultsGrid}>
                    {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
                        <CardSkeleton key={index} />
                    ))}
                </div>
            )}

            {error && <div style={styles.error}>{error}</div>}

            {visibleResults.length > 0 && (
                <div style={styles.resultsGrid}>
                    {visibleResults.map(show => (
                        <Card key={show.id} show={show} />
                    ))}
                </div>
            )}

            {!loading && !error && query.trim() && visibleResults.length === 0 && (
                <div style={styles.noResults}>No shows found</div>
            )}

            {hasMore && (
                <div ref={loadingRef} style={styles.loadingMore}>
                    {loading && currentPage > 1 && (
                        <div style={styles.loadingText}>Loading more shows...</div>
                    )}
                </div>
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
    },
    loadingMore: {
        padding: '32px 0',
        textAlign: 'center' as const
    },
    loadingText: {
        color: '#64748b',
        fontSize: '16px'
    }
};

export default SearchScreen;
