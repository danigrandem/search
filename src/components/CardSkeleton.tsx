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

export default CardSkeleton; 