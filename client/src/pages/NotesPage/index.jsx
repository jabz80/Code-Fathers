import React, { useState, useEffect } from 'react';
import { NoteCard, NoteFilters, Footer } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useTimer } from '../../contexts/PomodoroContext';

export default function NotesPage() {
  const { isLoggedIn, setIsLoggedIn, userID, setUserID } = useTimer();
  const [notes, setNotes] = useState([]);
  const [textFilter, setTextFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    //change fetch so it grabs all notes for 1 id
    async function loadNotes() {
      try {

        const option = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
          body: JSON.stringify({
            user_id: userID,
          }),
        };
        const resp = await fetch(
          'http://localhost:3000/notes/show/user_id',
          option
        );
        const respData = await resp.json();



        setNotes(respData);
      } catch (error) {
        console.log(error);
        //should not navigate since new accounts will have no files
        //navigate('/login');
      }
    }

    loadNotes();
  }, [notes]);

  function displayNotes() {
    try {
      notes.reverse();
      return notes
        .filter(
          (s) =>
            textFilter.length == 0 ||
            s.title.toLowerCase().includes(textFilter.toLowerCase())
        )
        .map((s) => (
          <NoteCard
            key={s.id}
            id={s.id}
            user_id={s.user_id}
            title={s.title}
            context={s.context}
            created_at={s.created_at}
            updated_at={s.updated_at}
          />
        ));
    } catch (error) {
      return <h1>NO NOTES AVAILABLE</h1>;
      //navigate('/login');
    }
  }

  return (
    <main className="notes-main">
      <h1>Notes</h1>

      <Link className="add-note-btn" to="/notes/new">
        Add a Note
      </Link>
      <NoteFilters textFilter={textFilter} setTextFilter={setTextFilter} />
      <div className="note-holder" role='note-holder'>{displayNotes()}</div>
      <Footer />
    </main>
  );
}
