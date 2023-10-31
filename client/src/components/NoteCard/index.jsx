import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const linkStyle = {
    color: '#875053'
};

const NoteCard = ({ id, user_id, title, context, created_at, updated_at }) => {
    const navigate = useNavigate(); // Get the navigate function

    async function handleDelete(e) {
        const response = await fetch(`http://localhost:3000/notes/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
    }

    function handleUpdate(e) {
        // Use the navigate function to navigate to the "Update" page
        navigate(`/notes/update/${id}`);
    }

    return (
        <div className='note-card'>
            <h3>
                <Link to={`/notes/${id}`} style={linkStyle}>
                    {title}
                </Link>
            </h3>
            <p className="notes-details-holder">
            </p>
            <button className='update-note-btn' onClick={handleUpdate}>Update</button>
            <button className='delete-note-btn' onClick={handleDelete}>Delete</button>
            <br />
        </div>
    );
};

export default NoteCard;
