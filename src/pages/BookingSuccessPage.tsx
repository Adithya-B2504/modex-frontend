import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookingById } from '../services/api';
import { ExtendedBooking } from '../types';

const BookingSuccessPage: React.FC = () => {
    const { bookingId } = useParams<{ bookingId: string }>();
    const navigate = useNavigate();
    const [booking, setBooking] = useState<ExtendedBooking | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBooking = async () => {
            if (!bookingId) return;

            try {
                // Minimum loading time of 800ms for better UX
                const startTime = Date.now();
                const response = await getBookingById(Number(bookingId));
                const elapsedTime = Date.now() - startTime;

                const remainingTime = Math.max(0, 800 - elapsedTime);

                setTimeout(() => {
                    setBooking(response.data);
                    setLoading(false);
                }, remainingTime);

            } catch (err) {
                console.error('Error loading booking:', err);
                setError('Failed to load booking details.');
                setLoading(false);
            }
        };

        fetchBooking();
    }, [bookingId]);

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
                <div className="loading-spinner"></div>
                <h2>Processing Booking...</h2>
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
                <h2 style={{ color: '#e74c3c' }}>Error</h2>
                <p>{error || 'Booking not found'}</p>
                <button className="btn-primary" onClick={() => navigate('/')}>
                    Return Home
                </button>
            </div>
        );
    }

    // Sort seat numbers
    const seatList = booking.seat_numbers ? booking.seat_numbers.sort((a, b) => a - b).join(', ') : 'N/A';

    return (
        <div className="container booking-success-container">
            <div className="success-card">
                <div className="success-icon">✅</div>
                <h1>Booking Confirmed!</h1>
                <p className="subtitle">Thank you for your booking, {booking.user_email}</p>

                <div className="booking-details-box">
                    <div className="detail-row">
                        <span className="label">Movie</span>
                        <span className="value movie-title">{booking.movie_title}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Screen</span>
                        <span className="value">{booking.screen_name}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Show Time</span>
                        <span className="value">{formatTime(booking.start_time)}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Seats</span>
                        <span className="value seats-value">{seatList}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Booking ID</span>
                        <span className="value">#{booking.id}</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">Status</span>
                        <span className="value status-badge">{booking.status}</span>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="btn-primary" onClick={() => navigate('/')}>
                        Return to Home Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingSuccessPage;
