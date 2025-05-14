import React from 'react';
import './CardSkeleton.css';

const CardSkeleton: React.FC = () => {
    return (
        <div className="card">
            <div className="imageContainer">
                <div className="image" />
            </div>
            <div className="content">
                <div className="title" />
                <div className="description">
                    <div className="line" />
                    <div className="line" />
                    <div className="shortLine" />
                </div>
            </div>
        </div>
    );
};

const styles = {
    '@keyframes pulse': {
        '0%': { opacity: 0.6 },
        '50%': { opacity: 1 },
        '100%': { opacity: 0.6 }
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)'
    },
    imageContainer: {
        width: '100%',
        height: '200px',
        backgroundColor: '#f1f5f9'
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: '#e2e8f0',
        animationName: 'pulse',
        animationDuration: '1.5s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite'
    },
    content: {
        padding: '16px'
    },
    title: {
        width: '70%',
        height: '24px',
        backgroundColor: '#e2e8f0',
        borderRadius: '4px',
        marginBottom: '16px',
        animationName: 'pulse',
        animationDuration: '1.5s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite'
    },
    description: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '8px'
    },
    line: {
        width: '100%',
        height: '12px',
        backgroundColor: '#e2e8f0',
        borderRadius: '4px',
        animationName: 'pulse',
        animationDuration: '1.5s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite'
    },
    shortLine: {
        width: '60%',
        height: '12px',
        backgroundColor: '#e2e8f0',
        borderRadius: '4px',
        animationName: 'pulse',
        animationDuration: '1.5s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite'
    }
};

export default CardSkeleton; 