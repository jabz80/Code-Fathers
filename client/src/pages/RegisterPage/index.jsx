import React, { useState } from 'react';

export default function RegisterPage() {
  const [formUsername, setFormUsername] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formName, setFormName] = useState('');

  function handleInput(e) {
    setFormUsername(e.target.value);
  }

  function handlePassword(e) {
    setFormPassword(e.target.value);
  }

  function handleName(e) {
    setFormName(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formUsername);
    console.log(formPassword);
    console.log(formName);
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formUsername,
        password: formPassword,
        name: formName,
      }),
    };
    const response = await fetch(
      'http://localhost:3000/users/register',
      options
    );
    const data = await response.json();

    if (response.status == 201) {
      window.location.assign('/login');
    } else {
      alert(data.error);
    }
  }

  return (
    <div>
      <h1>REGISTER</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            placeholder="Enter Full Name"
            onChange={handleName}
          />
        </label>
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
