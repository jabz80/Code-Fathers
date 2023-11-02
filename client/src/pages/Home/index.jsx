import React from 'react';
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className='banner'>
      <h1><b>Welcome to ReviseHub</b></h1>
        {/* <img src="./src/assets/homepic.jpg" alt="homepage pic" /> */}
      <div className='banner-content'>
        <h3><em>Our all-in-one studying calendar, notes, and timer app</em></h3>
        <Link to="/register"><button>Sign Up</button></Link>
      </div>
    </div>
  )
}


