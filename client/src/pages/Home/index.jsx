import React from 'react';
import { Link } from 'react-router-dom';
import { useTimer } from '../../contexts/PomodoroContext';
import { Footer } from '../../components';

export default function HomePage() {
  const { isLoggedIn, username } = useTimer();
  return (
    <div className="banner">
     {isLoggedIn ? <h1>Hi, {username}!</h1> : ''}
      <h1>Welcome to ReviseHub</h1>
      <div className="banner-content">
        <h3>
          <em>Our all-in-one studying calendar, notes, and timer app</em>
        </h3>
        {!isLoggedIn ? (
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        ) : (
          ''
        )}
      </div>
      <Footer />
    </div>

  );
}
