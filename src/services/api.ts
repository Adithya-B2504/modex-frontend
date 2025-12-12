import axios from 'axios';
import { Movie, Show, Booking, ExtendedBooking } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Shows
export const getShows = () => api.get<Show[]>('/shows');
export const getShowById = (id: number) => api.get<Show>(`/shows/${id}`);

// Bookings
export const createBooking = (data: {
    show_id: number;
    customer_name: string;
    customer_email: string;
    seat_numbers: number[];
}) => api.post<Booking>(`/shows/${data.show_id}/book`, {
    user_email: data.customer_email,
    seat_numbers: data.seat_numbers,
});

export const getBookedSeats = (showId: number) =>
    api.get<{ booked_seats: number[] }>(`/shows/${showId}/booked-seats`);

export const getBookingById = (bookingId: number) =>
    api.get<ExtendedBooking>(`/bookings/${bookingId}`);

export const getBookingsByShow = (showId: number) =>
    api.get<Booking[]>(`/bookings/show/${showId}`);

// Admin
export const createMovie = (data: {
    title: string;
    description: string;
    duration_minutes: number;
}) => api.post<Movie>('/admin/movies', data);

export const createShow = (data: {
    movie_id: number;
    screen_name: string;
    start_time: string;
    total_seats: number;
}) => api.post<Show>('/admin/shows', data);

export const getMovies = () => api.get<Movie[]>('/admin/movies');
