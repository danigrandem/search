import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getShowById } from '../api/apiService';
import { Show } from '../types/apiTypes';

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
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!show) {
        return <div className="not-found">Show not found</div>;
    }

    return (
        <div className="show-detail">
            <Link to="/" className="back-button">← Back to Search</Link>

            <div className="show-header">
                {show.image && (
                    <img
                        src={show.image.original}
                        alt={show.name}
                        className="show-image"
                    />
                )}
                <div className="show-info">
                    <h1>{show.name}</h1>
                    {show.genres && (
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
                            Rating: ⭐ {show.rating.average}/10
                        </div>
                    )}
                </div>
            </div>

            <div className="show-body">
                {show.summary && (
                    <div
                        className="summary"
                        dangerouslySetInnerHTML={{ __html: show.summary }}
                    />
                )}

                <div className="show-meta">
                    {show.status && (
                        <div className="meta-item">
                            <strong>Status:</strong> {show.status}
                        </div>
                    )}
                    {show.premiered && (
                        <div className="meta-item">
                            <strong>Premiered:</strong> {show.premiered}
                        </div>
                    )}
                    {show.network && (
                        <div className="meta-item">
                            <strong>Network:</strong> {show.network.name}
                        </div>
                    )}
                    {show.schedule && (
                        <div className="meta-item">
                            <strong>Schedule:</strong> {show.schedule.days.join(', ')} at {show.schedule.time}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowDetail; 