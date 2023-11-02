import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTimer } from '../../contexts/PomodoroContext';

// const styles = ({ isActive }) => ({ color: isActive ? '#3c7760' : '#875053' });

export default function Header() {
  const { isLoggedIn } = useTimer();
  return (
    <main>
      <header>
        <nav className="navbar">
          {/* <h1>Code Fathers</h1> */}
          <ul role="unorderedList">
            <li>

              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/calendar" >Calendar</NavLink>
            </li>
            <li>
              <NavLink to="/notes" >Notes</NavLink>
            </li>
            <li>
              <NavLink to="/timer">Timer</NavLink>
           </li>
            {/* <li>
              <NavLink to="/register" style={styles}><button>Register</button></NavLink>
            </li> */}
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
              <NavLink id="loginButton" to="/login">{isLoggedIn ? 'Logout' : 'Login'}</NavLink>
        </nav>
      </header>
      <Outlet />
    </main>
  );
}


