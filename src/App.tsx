import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

// 404 Not Found Component
function NotFound() {
  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn-primary" style={{ textDecoration: 'none', padding: '0.75rem 1.5rem', display: 'inline-block' }}>
        Go Back Home
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>ModEx Cinema</h1>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/admin">Admin</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking/:showId" element={<BookingPage />} />
          <Route path="/booking-success/:bookingId" element={<BookingSuccessPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* 404 Not Found Route */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
