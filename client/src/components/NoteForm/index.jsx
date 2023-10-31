export default function NoteForm({ inputText, setInputText, context, setContext, message, setMessage, type }) {
    function handleInput(e) {
        setInputText(e.target.value)
    }

    function handleContext(e) {
        setContext(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(inputText);
        console.log(context);
        console.log(type);
        if (inputText.length > 0 && context.length > 0) {
            if (type == "add") {
                await fetch(`http://localhost:3000/notes/`, {
                    method: 'POST',
                    body: JSON.stringify({ user_id: 1, title: inputText, context: context, updated_at: null }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setMessage('Note added successfully.');
                        setTimeout(() => {
                            setMessage('')
                        }, 5000)
                    })
                    .catch((err) => {
                        console.log(err.message);
                        setMessage('There was a problem in creating your note.');
                        setTimeout(() => {
                            setMessage('')
                        }, 5000)
                    });
                setInputText('')
                setContext('')
            }

            else if (type == "update") {

                const currentURL = window.location.href
                const urlSplit = currentURL.split("/")
                const id = urlSplit[urlSplit.length - 1]


                await fetch(`http://localhost:3000/notes/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ note_id: id, user_id: 1, title: inputText, context: context, updated_at: null }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setMessage('Note updated successfully.');
                        setTimeout(() => {
                            setMessage('')
                        }, 5000)
                    })
                    .catch((err) => {
                        console.log(err.message);
                        setMessage('There was a problem updating your note.');
                        setTimeout(() => {
                            setMessage('')
                        }, 5000)
                    });
                setInputText('')
                setContext('')


            }
        } else {
            setMessage('Please enter a title.');
            setTimeout(() => {
                setMessage('')
            }, 5000)
        }

    }

    return (
        <form>
            <div>
                <input placeholder="Note Title" id="note-text" value={inputText} type="text" className="note-text" onChange={handleInput} />
            </div>
            <div>
                <input placeholder="Note context" id="note-context" value={context} type="text" className="note-context" onChange={handleContext} />
            </div>

            <button type="submit" className="note-button" onClick={handleSubmit}>Add a Note</button>
            <p className='message'>{message}</p>
        </form>
    )




}
