import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShowById } from '../api/apiService';
import { Show } from '../types/apiTypes';
import './ShowDetail.css';

const ShowDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [show, setShow] = useState<Show | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchShow = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await getShowById(id);
                setShow(data);
            } catch (err) {
                setError('Error fetching show details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchShow();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading show details</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!show) {
        return <div className="not-found">Show not found</div>;
    }

    return (
        <div className="show-detail">
            <Link to="/" className="back-button">
                ← Back to Search
            </Link>

            <div className="show-header">
                <div className="image-container">
                    {show.image ? (
                        <img
                            src={show.image.original}
                            alt={show.name}
                            className="show-image"
                        />
                    ) : (
                        <div className="no-image">
                            No Image Available
                        </div>
                    )}
                </div>
                <div className="show-info">
                    <h1>{show.name}</h1>
                    {show.genres && show.genres.length > 0 && (
                        <div className="genres">
                            {show.genres.map(genre => (
                                <span key={genre} className="genre-tag">
                                    {genre}
                                </span>
                            ))}
                        </div>
                    )}
                    {show.rating?.average && (
                        <div className="rating">
                            {show.rating.average}/10
                        </div>
                    )}
                    {show.summary && (
                        <div
                            className="summary"
                            dangerouslySetInnerHTML={{ __html: show.summary }}
                        />
                    )}
                </div>
            </div>

            <div className="show-body">
                <div className="show-meta">
                    {show.status && (
                        <div className="meta-item">
                            <strong>Status</strong>
                            <span>{show.status}</span>
                        </div>
                    )}
                    {show.premiered && (
                        <div className="meta-item">
                            <strong>Premiered</strong>
                            <span>{show.premiered}</span>
                        </div>
                    )}
                    {show.network && (
                        <div className="meta-item">
                            <strong>Network</strong>
                            <span>{show.network.name}</span>
                        </div>
                    )}
                    {show.schedule && show.schedule.days.length > 0 && (
                        <div className="meta-item">
                            <strong>Schedule</strong>
                            <span>
                                {show.schedule.days.join(', ')}
                                {show.schedule.time && ` at ${show.schedule.time}`}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowDetail; 