import React from 'react';
import { Link } from 'react-router-dom';
import { Show, Genre } from '../types/apiTypes';

interface CardProps {
    show: Show;
    genres: Genre[];
}

const Card: React.FC<CardProps> = ({ show, genres }) => {
    return (
        <Link to={`/show/${show.id}`} style={styles.link}>
            <div style={styles.card}>
                {show.backdrop_path && (
                    <div style={styles.imageContainer}>
                        <img
                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${show.backdrop_path}`}
                            alt={show.original_title}
                            style={styles.image}
                        />
                    </div>
                )}
                <div style={styles.content}>
                    <h2 style={styles.title}>{show.original_title}</h2>
                    {show.genre_ids.length > 0 && (
                        <div style={styles.genres}>
                            {show.genre_ids.slice(0, 3).map((genre, index) => (
                                <span key={index} style={styles.genre}>
                                    {genres.find((g) => g.id === genre)?.name}
                                </span>
                            ))}
                        </div>
                    )}
                    <div style={styles.rating}>
                        {show.vote_average
                            ? `${show.vote_average}/10`
                            : 'No rating'
                        }
                    </div>
                </div>
            </div>
        </Link>
    );
};

const styles = {
    link: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'block'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        ':hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
        }
    },
    imageContainer: {
        width: '100%',
        height: '295px',
        backgroundColor: '#f1f5f9'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover' as const
    },
    content: {
        padding: '16px'
    },
    title: {
        margin: '0 0 12px 0',
        fontSize: '18px',
        fontWeight: '600',
        color: '#1e293b'
    },
    genres: {
        display: 'flex',
        gap: '8px',
        marginBottom: '12px',
        flexWrap: 'wrap' as const
    },
    genre: {
        padding: '4px 12px',
        backgroundColor: '#f1f5f9',
        borderRadius: '16px',
        fontSize: '14px',
        color: '#475569'
    },
    rating: {
        fontSize: '14px',
        color: '#64748b'
    }
};

export default Card;
