import React, {useState} from 'react';
import Calendar from 'react-calendar';
import index from '../../pages/CalendarPage';

// export default function CalendarApp({date, setDate, title, setTitle, description, setDescription, message, setMessage }){
export default function CalendarApp(){
    const [date, setDate] = useState(new Date())
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')
    const [userId, setUserId] = useState('')
    const [data, setData] = useState(null)

    async function handleChange(e){
        setData(null)
        setDate(e)
        let date = e.toLocaleDateString()
        date = date.replaceAll("/", "")
        date = parseInt(date)
        console.log(date)
        const response = await fetch(`http://localhost:3000/tasks/date/${date}`)
        const tasks = await response.json()
        setData(tasks)
        setUserId("")
        setTitle("")
        setDescription("")

    }


    function handleUserIdInput(e){
        const newInput = e.target.value
        setUserId(newInput)
    }

    function handleTitleInput(e){
        const newInput = e.target.value
        setTitle(newInput)
    }

    function handleDescriptionInput(e){
        const newInput = e.target.value
        setDescription(newInput)
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(title, description)
        // Add event function using input value here
        if (title.length > 0 && description.length > 0) {
            fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: userId,
                    task_title: title,
                    task_description: description,
                    task_date: date
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setMessage('Event added successfully.');
                setTimeout(() => {
                    setMessage('')
                }, 5000)
            })
            .catch((err) => {
                console.log(err.message);
                setMessage('There was a problem in creating your event.');
                setTimeout(() => {
                    setMessage('')
                }, 5000)
            });
            setTitle('')
            setDescription('')
            setUserId('')
        } else {
            setMessage('Please enter an event.');
            setTimeout(() => {
                setMessage('')
            }, 5000)
        }
    }

    async function handleDelete(id){
        console.log(id);
        const options = {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch(`http://localhost:3000/tasks/${id}`, options);
        if (response.status === 204) {
            console.log("Success");
        } else {
            console.error('Delete failed');
        }
    }

    function EditForm({ taskId, userId, title, description, date, onSubmit }) {
        const [editInput, setEditInput] = useState('');
        const [editUserId, setEditUserId] = useState(userId)
        const [editTitle, setEditTitle] = useState(title)
        const [editDescription, setEditDescription] = useState(description)
        const [editDate, setEditDate] = useState(date)
    
        const handleUserIdInput = (e) => {
            const newInput = e.target.value;
            setEditUserId(newInput)
        };

        const handleTitleInput = (e) => {
            const newInput = e.target.value;
            setEditTitle(newInput)
        };

        const handleDescriptionInput = (e) => {
            const newInput = e.target.value;
            setEditDescription(newInput)
        };

        const handleDateInput = (e) => {
            const newInput = e.target.value;
            setEditDate(newInput)
        };
    
        const handleEditSubmit = (e) => {
            e.preventDefault();
            if (title.length > 0 && description.length > 0) {
                fetch(`http://localhost:3000/tasks/${taskId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        user_id: editUserId,
                        task_title: editTitle,
                        task_description: editDescription,
                        task_date: editDate
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((res) => res.json())
                .then((data) => {
                    setMessage('Event added successfully.');
                    setTimeout(() => {
                        setMessage('')
                    }, 5000)
                })
                .catch((err) => {
                    console.log(err.message);
                    setMessage('There was a problem in creating your event.');
                    setTimeout(() => {
                        setMessage('')
                    }, 5000)
                });
                setTitle('')
                setDescription('')
                setUserId('')
            } else {
                setMessage('Please enter an event.');
                setTimeout(() => {
                    setMessage('')
                }, 5000)
            }
        }
    
        return (
            <form onSubmit={handleEditSubmit}>
                <label htmlFor='userIdEdit'>User ID</label>
                <input type='text' onChange={handleUserIdInput} id='userIdEdit' value={editUserId} required />
                <br></br>
                <label htmlFor='titleEdit'>Add event title here:</label>
                <input type='text' onChange={handleTitleInput} id='titleEdit' value={editTitle} required />
                <br></br>
                <label htmlFor='eventEdit'>Add event description here:</label>
                <input type='text' onChange={handleDescriptionInput} value={editDescription} id='eventEdit'/>
                <label htmlFor='dateEdit'>Add event description here:</label>
                <input type='text' onChange={handleDateInput} value={editDate} id='dateEdit'/>
                <br></br>
                <button type="submit">Submit Edit</button>
            </form>
        );
    }


    return(
        <>
        <Calendar onChange={handleChange} value={date} className='calender'/>
        <p>Selected date is {date.toLocaleDateString()}</p>
        <form onSubmit={handleSubmit} className='container'>
            <label htmlFor='userId'>User ID</label>
            <input type='text' onChange={handleUserIdInput} id='userId' value={userId} required />
            <br></br>
            <label htmlFor='title'>Add event title here:</label>
            <input type='text' onChange={handleTitleInput} id='title' value={title} required />
            <br></br>
            <label htmlFor='event'>Add event description here:</label>
            <input type='text' onChange={handleDescriptionInput} value={description} id='event'/>
            <br></br>
            <input type='submit' value="Add Event" />
            <p className='message'>{message}</p>
        </form>

        <div>
            {Array.isArray(data) && data.map((item, index) => (
            <div key={index}>
            <h1>{item.task_title}</h1>
            <p>{item.task_description}</p>
            <button onClick={() => handleDelete(item.task_id)}>Delete Event</button>
            <EditForm taskId={item.task_id} userId={item.user_id} title={item.task_title} description={item.task_description} date={item.task_date}/>
            </div>
            ))}
        </div>
    </>
    )
}
