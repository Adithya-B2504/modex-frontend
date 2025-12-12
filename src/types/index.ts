export interface Movie {
  id: number;
  title: string;
  description: string;
  duration_minutes: number;
}

export interface Show {
  id: number;
  movie_id: number;
  screen_name: string;
  start_time: string;
  total_seats: number;
  movie_title?: string;
  description?: string;
  duration_minutes?: number;
  booked_seats?: string;
  available_seats?: string;
}

export interface Booking {
  id: number;
  show_id: number;
  user_email: string;
  seats_booked: number;
  seat_numbers: number[];
  status: 'PENDING' | 'CONFIRMED' | 'FAILED' | 'CANCELLED';
  created_at?: string;
}

export interface ExtendedBooking extends Booking {
  movie_title: string;
  screen_name: string;
  start_time: string;
}
