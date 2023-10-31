import React, {useState} from 'react'
import { NoteForm } from '../../components';

export default function UpdateNotePage() {
  const [inputText, setInputText] = useState('');
  const [context, setContext] = useState('');
const [message, setMessage] = useState('');
  return (
    <main>
        <h2>Update Note:</h2>
        <NoteForm inputText={inputText} setInputText={setInputText} context={context} setContext={setContext} message={message} setMessage={setMessage} type="update" />
    </main>
  )
}
