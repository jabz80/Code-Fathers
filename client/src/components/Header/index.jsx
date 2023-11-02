import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

// const styles = ({ isActive }) => ({ color: isActive ? '#3c7760' : '#875053' });

export default function Header() {
  return (
    <main>
      <header>
        <nav className='navbar'>
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
              <NavLink id="loginButton" to="/login">Login</NavLink>
        </nav>
      </header>
      <Outlet />
    </main>
  );
}

// style={styles}

