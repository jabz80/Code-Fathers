import React, { useState, useEffect } from 'react';
import { useTimer } from '../../contexts/PomodoroContext';

export default function LoginPage() {
  const { isLoggedIn, setIsLoggedIn } = useTimer();

  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');

  function handleInput(e) {
    setFormUsername(e.target.value);
  }

  function handlePassword(e) {
    setFormPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formUsername);
    console.log(formPassword);

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
      await setIsLoggedIn(true);
      localStorage.setItem('token', data.token);

      window.location.assign('/');
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
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            placeholder="Enter Username"
            onChange={handleInput}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="Enter Password"
            onChange={handlePassword}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
