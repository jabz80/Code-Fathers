import React, { useState } from 'react';

export default function LoginPage() {
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
      localStorage.setItem('token', data.token);
      //window.location.assign('board.html');
    } else {
      alert(data.error);
    }
  }

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
