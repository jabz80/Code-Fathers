import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const styles = ({ isActive }) => ({ color: isActive ? '#2B061E' : '#875053' });

export default function Header() {
  return (
    <main>
      <header>
        <nav className='navbar'>
          {/* <h1>Code Fathers</h1> */}
          <ul role="unorderedList">
            <li>
              <NavLink to="/" style={styles}><button>Home</button></NavLink>
            </li>
            <li>
              <NavLink to="/calendar" style={styles}><button>Calendar</button></NavLink>
            </li>
            <li>
              <NavLink to="/notes" style={styles}><button>Notes</button></NavLink>
            </li>
            <li>
              <NavLink to="/timer" style={styles}><button>Timer</button></NavLink>
            </li>
            {/* <li>
              <NavLink to="/register" style={styles}><button>Register</button></NavLink>
            </li> */}
            <li>
              <NavLink to="/about" style={styles}><button>About</button></NavLink>
            </li>
            <li>
              <NavLink to="/login" style={styles}><button>Login</button></NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </main>
  );
}
