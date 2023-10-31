import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotePage = () => {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState({});

  useEffect(() => {
    setLoading(true);
    async function loadNote() {
      const currentURL = window.location.href;
      const urlSplit = currentURL.split('/');
      const id = urlSplit[urlSplit.length - 1];

      const response = await fetch(`http://localhost:3000/notes/${id}`);
      const data = await response.json();
      setNote(data);
      setLoading(false);
    }

    loadNote();
  }, []);

  function displayNote() {
    return (
      <main>
        <h1 className="close-title">{note.title}</h1>
        <p>
          <em>{note.context}</em>
        </p>

        <Link to="/notes">Back</Link>
      </main>
    );
  }

  return loading ? (
    <h2>
      <em>loading...</em>
    </h2>
  ) : (
    displayNote()
  );
};

export default NotePage;
