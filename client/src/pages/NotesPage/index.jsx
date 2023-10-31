import React, { useState, useEffect } from 'react'
import { Notes, NoteCard, NoteFilters } from '../../components'
import { Link } from 'react-router-dom';
export default function NotesPage() {
   
  const [notes, setNotes] = useState([]);
  const [textFilter, setTextFilter] = useState("")


  useEffect(() => {
    async function loadNotes() {
      const response = await fetch("http://localhost:3000/notes");
      const data = await response.json();
      setNotes(data);
    };

    loadNotes();
  }, [notes])

  function displayNotes() {
notes.reverse()
    return notes
      .filter(s => textFilter.length == 0 || s.title.toLowerCase().includes(textFilter.toLowerCase()))
      .map(s => <NoteCard key={s.id} id={s.id} user_id={s.user_id} title={s.title} context={s.context} created_at={s.created_at} updated_at={s.updated_at} />)
  }

  return (
    <main className="notes-main">
      <h1>Notes</h1>

      <Link className="add-note-btn" to="/notes/new">Add a Note</Link>
      <NoteFilters textFilter={textFilter} setTextFilter={setTextFilter} />
      <div className="note-holder">
        {displayNotes()}
      </div>
    </main>
  )
}
