import React from 'react';
import { Link } from 'react-router-dom';
import { useTimer } from '../../contexts/PomodoroContext';

export default function HomePage() {
  const { isLoggedIn, username } = useTimer();
  return (
    <div className="banner">
      {isLoggedIn ? <h1>Hi, {username}!</h1> : ''}

      <h1>Welcome to ReviseHub</h1>
      {/* <img src="./src/assets/homepic.jpg" alt="homepage pic" /> */}
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
    </div>
  );
}
