import React, { useState, useEffect } from 'react';
import { createMovie, createShow, getMovies, getShows } from '../services/api';
import { Movie, Show } from '../types';

const AdminDashboard: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [shows, setShows] = useState<Show[]>([]);
    const [activeTab, setActiveTab] = useState<'movie' | 'show'>('movie');

    // Movie form
    const [movieTitle, setMovieTitle] = useState('');
    const [movieDesc, setMovieDesc] = useState('');
    const [movieDuration, setMovieDuration] = useState('');

    // Show form
    const [selectedMovieId, setSelectedMovieId] = useState('');
    const [screenName, setScreenName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [totalSeats, setTotalSeats] = useState('');

    const [message, setMessage] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [moviesRes, showsRes] = await Promise.all([getMovies(), getShows()]);
            setMovies(moviesRes.data);
            setShows(showsRes.data);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const handleCreateMovie = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createMovie({
                title: movieTitle,
                description: movieDesc,
                duration_minutes: Number(movieDuration),
            });
            setMessage('Movie created successfully ✅');
            setMovieTitle('');
            setMovieDesc('');
            setMovieDuration('');
            loadData();
        } catch (error) {
            setMessage('Failed to create movie ❌');
        }
    };

    const handleCreateShow = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createShow({
                movie_id: Number(selectedMovieId),
                screen_name: screenName,
                start_time: startTime,
                total_seats: Number(totalSeats),
            });
            setMessage('Show created successfully ✅');
            setSelectedMovieId('');
            setScreenName('');
            setStartTime('');
            setTotalSeats('');
            loadData();
        } catch (error) {
            setMessage('Failed to create show ❌');
        }
    };

    return (
        <div className="container admin-container">
            <h2>Admin Dashboard</h2>

            <div className="tabs">
                <button
                    className={activeTab === 'movie' ? 'active' : ''}
                    onClick={() => setActiveTab('movie')}
                >
                    Create Movie
                </button>
                <button
                    className={activeTab === 'show' ? 'active' : ''}
                    onClick={() => setActiveTab('show')}
                >
                    Create Show
                </button>
            </div>

            {message && <p className="message success">{message}</p>}

            {activeTab === 'movie' ? (
                <form className="admin-form" onSubmit={handleCreateMovie}>
                    <h3>Add New Movie</h3>
                    <input
                        type="text"
                        placeholder="Movie Title"
                        value={movieTitle}
                        onChange={(e) => setMovieTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={movieDesc}
                        onChange={(e) => setMovieDesc(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Duration (minutes)"
                        value={movieDuration}
                        onChange={(e) => setMovieDuration(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn-primary">Create Movie</button>
                </form>
            ) : (
                <form className="admin-form" onSubmit={handleCreateShow}>
                    <h3>Add New Show</h3>
                    <select
                        value={selectedMovieId}
                        onChange={(e) => setSelectedMovieId(e.target.value)}
                        required
                    >
                        <option value="">Select Movie</option>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Screen Name (e.g., Screen 1)"
                        value={screenName}
                        onChange={(e) => setScreenName(e.target.value)}
                        required
                    />
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Total Seats"
                        value={totalSeats}
                        onChange={(e) => setTotalSeats(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn-primary">Create Show</button>
                </form>
            )}

            <div className="admin-lists">
                <div>
                    <h3>Movies ({movies.length})</h3>
                    {movies.map((movie) => (
                        <div key={movie.id} className="list-item">
                            {movie.title} - {movie.duration_minutes}m
                        </div>
                    ))}
                </div>
                <div>
                    <h3>Shows ({shows.length})</h3>
                    {shows.map((show) => (
                        <div key={show.id} className="list-item">
                            {show.movie_title} - {show.screen_name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
