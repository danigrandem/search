import React from 'react';
import { Show } from '../types/apiTypes';

interface CardProps {
    show: Show;
}

const Card: React.FC<CardProps> = ({ show }) => {
    return (
        <div style={styles.card}>
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
    );
};

const styles = {
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

export default Card;
