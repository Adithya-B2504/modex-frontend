# Modex Cinema - Frontend 🎬

The client-side application for the Modex Cinema Booking System. Built with React and TypeScript, it provides an interactive interface for users to browse movies, select specific seats, and manage their bookings.

## 🚀 Key Features

*   **Home Page**: Displays a list of available shows with real-time seat availability.
*   **Seat Selection**:
    *   Visual representation of the cinema hall.
    *   Interactive seat map allowing users to select up to **5 seats**.
    *   Real-time validation (prevents selecting booked seats).
*   **Booking Process**:
    *   User-friendly form for customer details.
    *   Immediate validation for email and selection requirements.
    *   Seamless transition to a success confirmation page.
*   **Responsive Design**: Optimized for different screen sizes.

## 🛠️ Tech Stack

*   **React 18**: UI Library
*   **TypeScript**: Type safety and better developer experience
*   **React Router DOM**: Client-side routing
*   **Axios**: HTTP client for API communication
*   **CSS**: Custom styling with grid/flexbox layouts

## 🏁 Getting Started

### Prerequisites

*   Node.js (v14 or higher)
*   npm or yarn

### Installation

1.  Navigate to the directory:
    ```bash
    cd modex-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **Configuration**:
    Create a `.env` file in the `modex-frontend` root directory:
    ```env
    REACT_APP_API_URL=http://localhost:3000
    ```

4.  Start the development server:
    ```bash
    npm start
    ```

    The app will open at [http://localhost:3000](http://localhost:3000) (or port 3001 if backend is occupying 3000).

## 📂 Project Structure

*   `src/pages/`: Main view components (HomePage, BookingPage, BookingSuccessPage).
*   `src/services/`: API integration logic (`api.ts`).
*   `src/types/`: TypeScript interfaces/types.
*   `src/App.tsx`: Main application router and layout.

## 🔗 API Integration

The frontend communicates with the backend via the `api.ts` service, handling:
*   Fetching shows (`GET /shows`)
*   Fetching specific show details (`GET /shows/:id`)
*   Fetching booked seats (`GET /shows/:id/booked-seats`)
*   Creating bookings (`POST /shows/:id/book`)
