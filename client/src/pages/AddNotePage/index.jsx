import React, {useState} from 'react'
import { NoteForm } from '../../components';

export default function AddNotePage() {
  const [inputText, setInputText] = useState('');
  const [context, setContext] = useState('');
const [message, setMessage] = useState('');
  return (
    <main>
        <h2>Add a Note:</h2>
        <NoteForm inputText={inputText} setInputText={setInputText} context={context} setContext={setContext} message={message} setMessage={setMessage} />
    </main>
  )
}
