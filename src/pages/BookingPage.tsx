import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShowById, createBooking, getBookedSeats } from '../services/api';
import { Show } from '../types';

const BookingPage: React.FC = () => {
    const { showId } = useParams<{ showId: string }>();
    const navigate = useNavigate();
    const [show, setShow] = useState<Show | null>(null);
    const [bookedSeats, setBookedSeats] = useState<number[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const loadShowDetails = useCallback(async () => {
        try {
            // Fetch show details
            const showRes = await getShowById(Number(showId));
            setShow(showRes.data);

            // Fetch booked seats
            const bookedSeatsRes = await getBookedSeats(Number(showId));
            setBookedSeats(bookedSeatsRes.data.booked_seats);
        } catch (error) {
            console.error('Error loading show:', error);
            setMessage('Failed to load show details. Please try again.');
        }
    }, [showId]);

    useEffect(() => {
        if (showId) {
            loadShowDetails();
        }
    }, [showId, loadShowDetails]);

    const handleSeatClick = (seat: number) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
        } else {
            if (selectedSeats.length >= 5) {
                setMessage('You can only select up to 5 seats');
                return;
            }
            setSelectedSeats([...selectedSeats, seat]);
            setMessage(''); // Clear any previous error messages
        }
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedSeats.length === 0 || !customerName || !customerEmail) {
            setMessage('Please fill all fields and select at least one seat');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
            setMessage('Please enter a valid email address (e.g., user@example.com)');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await createBooking({
                show_id: Number(showId),
                customer_name: customerName,
                customer_email: customerEmail,
                seat_numbers: selectedSeats,
            });
            // Proceed to success page
            const bookingId = (response.data as any).booking.id;
            navigate(`/booking-success/${bookingId}`);
        } catch (error: any) {
            console.error('Booking error:', error);
            console.error('Error response:', error.response?.data);
            setMessage(error.response?.data?.error || error.response?.data?.message || 'Booking failed');
        } finally {
            setLoading(false);
        }
    };

    if (!show) return <div className="loading">Loading...</div>;

    const seats = Array.from({ length: show.total_seats }, (_, i) => i + 1);

    return (
        <div className="container">
            <button className="btn-back" onClick={() => navigate('/')}>← Back</button>

            <h2>{show.movie_title}</h2>
            <p className="show-info">
                {show.screen_name} • {new Date(show.start_time).toLocaleString('en-IN')}
            </p>

            <div className="booking-container">
                <div className="seat-selection">
                    <h3>Select Your Seats (Max 5)</h3>
                    <div className="screen">SCREEN</div>
                    <div className="seats-grid">
                        {seats.map((seat) => {
                            const isBooked = bookedSeats.includes(seat);
                            const isSelected = selectedSeats.includes(seat);
                            return (
                                <button
                                    key={seat}
                                    className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                                    onClick={() => !isBooked && handleSeatClick(seat)}
                                    disabled={isBooked}
                                >
                                    {seat}
                                </button>
                            );
                        })}
                    </div>
                    <div className="legend">
                        <span><div className="seat available"></div> Available</span>
                        <span><div className="seat selected"></div> Selected</span>
                        <span><div className="seat booked"></div> Booked</span>
                    </div>
                </div>

                <div className="booking-form">
                    <h3>Customer Details</h3>
                    <form onSubmit={handleBooking}>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            required
                        />
                        <div className="selected-seat-info">
                            {selectedSeats.length > 0
                                ? `${selectedSeats.length} seat(s) selected: ${selectedSeats.sort((a, b) => a - b).join(', ')}`
                                : 'No seats selected'}
                        </div>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading || selectedSeats.length === 0}
                        >
                            {loading ? 'Booking...' : 'Confirm Booking'}
                        </button>
                        {message && <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
