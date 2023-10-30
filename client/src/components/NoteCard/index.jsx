import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
    color: '#875053'
};

const NoteCard = ({ id, user_id, title, context, created_at, updated_at }) => {

    async function handleDelete(e) {
        const response = await fetch(`http://localhost:3000/notes/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }





    return <div className='note-card'>
        <h3><Link to={`/notes/${id}`} style={linkStyle}>{title}</Link></h3>
        <p className="notes-details-holder">

        </p>
        <button onClick={handleDelete}>Delete</button>
        <br></br>
    </div>
};

export default NoteCard;