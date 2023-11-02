import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import index from '../../pages/CalendarPage';
import { useTimer } from '../../contexts/PomodoroContext';
// export default function CalendarApp({date, setDate, title, setTitle, description, setDescription, message, setMessage }){
export default function CalendarApp() {
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [data, setData] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [addToggle, setAddToggle] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [eventOccurred, setEventOccurred] = useState(false);

  const { userID } = useTimer();

  useEffect(() => {
    function displayEvents() {
      const formattedDate = date ? date.toLocaleDateString() : '';

      return (
        <>
          <Calendar onChange={handleChange} value={date} className="calender" />
          <p>{formattedDate}</p>
          {formattedDate ? (
            <button onClick={() => handleAddButtonClick()}>Add Event</button>
          ) : null}
          {addToggle == true && (
            <form onSubmit={handleSubmit} className="container">
              <br></br>
              <label htmlFor="title">Add event title here:</label>
              <input
                type="text"
                onChange={handleTitleInput}
                id="title"
                value={title}
                required
              />
              <br></br>
              <label htmlFor="event">Add event description here:</label>
              <input
                type="text"
                onChange={handleDescriptionInput}
                value={description}
                id="event"
              />
              <br></br>
              <input type="submit" value="Add Event" />
              <p className="message">{message}</p>
            </form>
          )}

          <div>
            {Array.isArray(data) &&
              data.map((item, index) => (
                <div key={index}>
                  <h1>{item.task_title}</h1>
                  <p>{item.task_description}</p>
                  <button onClick={() => handleDelete(item.task_id)}>
                    Delete Event
                  </button>
                  <button onClick={() => handleEditButtonClick(item.task_id)}>
                    Edit Event
                  </button>
                  {editingEvent === item.task_id && editToggle == true && (
                    <EditForm
                      taskId={item.task_id}
                      userId={item.user_id}
                      title={item.task_title}
                      description={item.task_description}
                      date={item.task_date}
                    />
                  )}
                </div>
              ))}
          </div>
        </>
      );
    }

    async function fetchData(date) {
      const options = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };

      console.log(date);
      let formattedDate = date ? date.toLocaleDateString() : '';
      formattedDate = formattedDate.replaceAll('/', '');
      const response = await fetch(
        `http://localhost:3000/tasks/date/${formattedDate}`,
        options
      );
      const tasks = await response.json();
      setData(tasks);
    }
    if (eventOccurred) {
      fetchData(date);
      setEventOccurred(false);
    }
    displayEvents();
  }, [eventOccurred, date]);

  async function fetchData(date) {
    const options = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };
    console.log(date);
    const response = await fetch(
      `http://localhost:3000/tasks/date/${date}`,
      options
    );
    const tasks = await response.json();
    setData(tasks);
  }

  async function handleChange(e) {
    setData(null);
    setDate(e);
    const dateToUse = e;
    const formattedDate = dateToUse.toLocaleDateString().replaceAll('/', '');
    fetchData(formattedDate);
  }

  function handleAddButtonClick() {
    setAddToggle(!addToggle);
  }

  function handleEditButtonClick(eventId) {
    setEditingEvent(eventId);
    setEditToggle(!editToggle);
  }

  function handleUserIdInput(e) {
    const newInput = e.target.value;
    setUserId(newInput);
  }

  function handleTitleInput(e) {
    const newInput = e.target.value;
    setTitle(newInput);
  }

  function handleDescriptionInput(e) {
    const newInput = e.target.value;
    setDescription(newInput);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(title, description);
    // Add event function using input value here
    if (title.length > 0 && description.length > 0) {
      fetch('http://localhost:3000/tasks/', {
        method: 'POST',
        body: JSON.stringify({
          user_id: userID,
          task_title: title,
          task_description: description,
          task_date: date,
        }),
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMessage('Event added successfully.');
          setTimeout(() => {
            setMessage('');
          }, 5000);
        })
        .catch((err) => {
          console.log(err.message);
          setMessage('There was a problem in creating your event.');
          setTimeout(() => {
            setMessage('');
          }, 5000);
        });
      setTitle('');
      setDescription('');
      setUserId('');
      setAddToggle(!addToggle);
      setEventOccurred(true);
    } else {
      setMessage('Please enter an event.');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  }

  async function handleDelete(id) {
    console.log(id);
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`http://localhost:3000/tasks/${id}`, options);
    if (response.status === 204) {
      console.log('Success');
      setEventOccurred(true);
    } else {
      console.error('Delete failed');
    }
  }

  function displayEvents() {
    const formattedDate = date ? date.toLocaleDateString() : '';

    return (
      <>
        <Calendar onChange={handleChange} value={date} className="calender" />
        <p>{formattedDate}</p>
        {formattedDate ? (
          <button onClick={() => handleAddButtonClick()}>Add Event</button>
        ) : null}
        {addToggle == true && (
          <form onSubmit={handleSubmit} className="container">
            <br></br>
            <label htmlFor="title">Add event title here:</label>
            <input
              type="text"
              onChange={handleTitleInput}
              id="title"
              value={title}
              required
            />
            <br></br>
            <label htmlFor="event">Add event description here:</label>
            <input
              type="text"
              onChange={handleDescriptionInput}
              value={description}
              id="event"
            />
            <br></br>
            <input type="submit" value="Add Event" />
            <p className="message">{message}</p>
          </form>
        )}

        <div>
          {Array.isArray(data) &&
            data.map((item, index) => (
              <div key={index}>
                <h1>{item.task_title}</h1>
                <p>{item.task_description}</p>
                <button onClick={() => handleDelete(item.task_id)}>
                  Delete Event
                </button>
                <button onClick={() => handleEditButtonClick(item.task_id)}>
                  Edit Event
                </button>
                {editingEvent === item.task_id && editToggle == true && (
                  <EditForm
                    taskId={item.task_id}
                    userId={item.user_id}
                    title={item.task_title}
                    description={item.task_description}
                    date={item.task_date}
                  />
                )}
              </div>
            ))}
        </div>
      </>
    );
  }

  function EditForm({ taskId, userId, title, description, date }) {
    const formatDate = (date) => {
      if (!date) return '';
      const year = String(date.slice(0, 4));
      const month = String(date.slice(5, 7));
      const day = String(date.slice(8, 10));
      return `${year}-${month}-${day}`;
    };

    //const [editUserId, setEditUserId] = useState(userId);
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    const [editDate, setEditDate] = useState(formatDate(date));

    const handleUserIdInput = (e) => {
      const newInput = e.target.value;
      console.log(newInput);
      setEditUserId(newInput);
    };

    const handleTitleInput = (e) => {
      const newInput = e.target.value;
      console.log(newInput);
      setEditTitle(newInput);
    };

    const handleDescriptionInput = (e) => {
      const newInput = e.target.value;
      console.log(newInput);
      setEditDescription(newInput);
    };

    const handleDateInput = (e) => {
      const newInput = e.target.value;
      console.log(newInput);
      setEditDate(newInput);
    };

    const handleEditSubmit = (e) => {
      e.preventDefault();
      if (
        editTitle.length > 0 &&
        editDescription.length > 0 &&
        editDate.length == 10
      ) {
        fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'PATCH',
          body: JSON.stringify({
            user_id: userID,
            task_title: editTitle,
            task_description: editDescription,
            task_date: editDate,
          }),
          headers: {
            Authorization: localStorage.getItem('token'),
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setMessage('Event added successfully.');
            setTimeout(() => {
              setMessage('');
            }, 5000);
            console.log(editUserId, editTitle, editDescription, editDate);
            setEventOccurred(true);
          })
          .catch((err) => {
            console.log(err.message);
            setMessage('There was a problem in creating your event.');
            setTimeout(() => {
              setMessage('');
            }, 5000);
          });
        setTitle('');
        setDescription('');
        setUserId('');
        setEditingEvent(null);
        setEditToggle(!editToggle);
      } else {
        setMessage('Please enter an event.');
        setTimeout(() => {
          setMessage('');
        }, 5000);
      }
    };

    return (
      <form onSubmit={handleEditSubmit}>
        <label htmlFor="titleEdit">Edit event title here:</label>
        <input
          type="text"
          onChange={handleTitleInput}
          id="titleEdit"
          placeholder={editTitle}
          required
        />
        <br></br>
        <label htmlFor="eventEdit">Edit event description here:</label>
        <input
          type="text"
          onChange={handleDescriptionInput}
          placeholder={editDescription}
          id="eventEdit"
          required
        />
        <label htmlFor="dateEdit">Edit event date here (yyyy-mm-dd):</label>
        <input
          type="text"
          onChange={handleDateInput}
          placeholder={editDate}
          id="dateEdit"
          required
        />
        <br></br>
        <button type="submit">Submit Edit</button>
      </form>
    );
  }

  return displayEvents();
}
