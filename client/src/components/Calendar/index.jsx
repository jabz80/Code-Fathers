import React, {useState} from 'react';
import Calendar from 'react-calendar';

export default function CalendarApp(){
    const [date, useDate] = useState(new Date())
    const [input, setInput] = useState('')

    function handleChange(e){
        useDate(e)
    }

    function handleInput(e){
        const newInput = e.target.value
        setInput(newInput)
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        // Add event function using input value here
        if (input.length > 0) {
            fetch('http://localhost:3000/calendar', {
                method: 'POST',
                body: JSON.stringify({
                    date: date,
                    event: input
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
            setInputText('')
            setDescription('')
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
        <form onSubmit={handleSubmit}>
            <input type='text' onChange={handleInput} value={input} required />
            <input type='submit' value="Add Event" />
        </form>
        </>
    )

}