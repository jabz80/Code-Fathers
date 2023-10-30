import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
const styles = ({ isActive }) => ({ color: isActive ? '#2B061E' : '#875053' });

export default function Header() {
  return (
    <main>
      <header>
        <h1>NAVIGATION</h1>
        <nav>
          <p>Codefathers</p>
          <NavLink to="/" style={styles}><button>Home</button></NavLink>
          <NavLink to="/about" style={styles}><button>About</button></NavLink>
          <NavLink to="/calendar" style={styles}><button>Calendar</button></NavLink>
          <NavLink to="/notes" style={styles}><button>Notes</button></NavLink>
        </nav>
      </header>
      <Outlet />
    </main>
  );
}
