import React, {useState} from 'react';
import Calendar from 'react-calendar';

// export default function CalendarApp({date, setDate, title, setTitle, description, setDescription, message, setMessage }){
export default function CalendarApp(){
    const [date, setDate] = useState(new Date())
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')
    const [userId, setUserId] = useState('')


    function handleChange(e){
        setDate(e)
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

    return(
        <>
        <Calendar onChange={handleChange} value={date} />
        <p>Selected date is {date.toLocaleDateString()}</p>
        <form onSubmit={handleSubmit} className='container'>
            <label htmlFor='userId'>User ID</label>
            <input type='text' onChange={handleUserIdInput} id='userId'required />
            <br></br>
            <label htmlFor='title'>Add event title here:</label>
            <input type='text' onChange={handleTitleInput} id='title'required />
            <br></br>
            <label htmlFor='event'>Add event description here:</label>
            <input type='text' onChange={handleDescriptionInput} id='event'/>
            <br></br>
            <input type='submit' value="Add Event" />
            <p className='message'>{message}</p>
        </form>
        </>
    )

}