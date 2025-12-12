import React, { useEffect, useState, useCallback } from 'react';
import { getShows } from '../services/api';
import { Show } from '../types';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadShows = useCallback(async () => {
        try {
            const response = await getShows();
            setShows(response.data);
        } catch (error) {
            console.error('Error loading shows:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadShows();
    }, [loadShows]);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) return <div className="loading">Loading shows...</div>;

    return (
        <div className="container">
            <h2>Available Shows</h2>

            {shows.length === 0 ? (
                <p className="no-shows">No shows available at the moment</p>
            ) : (
                <div className="shows-grid">
                    {shows.map((show) => (
                        <div key={show.id} className="show-card">
                            <h3>{show.movie_title}</h3>
                            <p className="description">{show.description}</p>
                            <div className="show-details">
                                <p><strong>Screen:</strong> {show.screen_name}</p>
                                <p><strong>Time:</strong> {formatDateTime(show.start_time)}</p>
                                <p><strong>Duration:</strong> {show.duration_minutes} mins</p>
                                <p className="seats-info">
                                    <span className="available">{show.available_seats} available</span>
                                    {' / '}
                                    <span>{show.total_seats} total</span>
                                </p>
                            </div>
                            <button
                                className="btn-primary"
                                onClick={() => navigate(`/booking/${show.id}`)}
                                disabled={Number(show.available_seats) === 0}
                            >
                                {Number(show.available_seats) === 0 ? 'Sold Out' : 'Book Now'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
