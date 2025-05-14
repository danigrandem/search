import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
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
                    {show.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${show.poster_path}`}
                            alt={show.original_title}
                            className="show-image"
                        />
                    ) : (
                        <div className="no-image">
                            No Image Available
                        </div>
                    )}
                </div>
                <div className="show-info">
                    <h1>{show.original_title}</h1>
                    {show.genres && show.genres.length > 0 && (
                        <div className="genres">
                            {show.genres.map(genre => (
                                <span key={genre.id} className="genre-tag">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    )}
                    {show.vote_average && (
                        <div className="rating">
                            {show.vote_average}/10
                        </div>
                    )}
                    {show.overview && (
                        <div
                            className="summary"
                            dangerouslySetInnerHTML={{ __html: show.overview }}
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
                    {show.release_date && (
                        <div className="meta-item">
                            <strong>Release date</strong>
                            <span>
                                {show.release_date}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowDetail; 