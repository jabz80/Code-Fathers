import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useTimer } from '../../contexts/PomodoroContext';

export default function LoginPage() {
  const { isLoggedIn, setIsLoggedIn } = useTimer();
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');

  const navigate = useNavigate();

  function handleInput(e) {
    setFormUsername(e.target.value);
  }

  function handlePassword(e) {
    setFormPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formUsername,
        password: formPassword,
      }),
    };
    const response = await fetch('http://localhost:3000/users/login', options);
    const data = await response.json();

    if (response.status == 200) {
      setIsLoggedIn(true);
      localStorage.setItem('token', data.token);
      // window.location.assign('/');
      navigate('/');
    } else {
      alert(data.error);
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    setIsLoggedIn(false);
    localStorage.clear();
  }, []);

  return (
    <div className="login">
      <h1 className="login-header">LOGIN</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-username">
          Username:
          <input
            type="text"
            placeholder="Enter Username"
            onChange={handleInput}
          />
        </label>
        <label className="login-password">
          Password:
          <input
            type="password"
            placeholder="Enter Password"
            onChange={handlePassword}
          />
        </label>
        <button type="submit">Submit</button>
        <Link to="/register" ><button className='btn-register'>Register</button></Link>
      </form>
    </div>
  );
}
