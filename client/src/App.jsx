import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import './App.css';
import { HomePage, AboutPage, NotFoundPage, CalendarPage, NotesPage, AddNotePage } from './pages';
import { ExampleProvider } from './contexts';
import NotePage from './pages/NotePage';
//Don't forget to change name of Provider

function App() {
  return (
    <ExampleProvider>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/:id" element={<NotePage />} />
          <Route path='/notes/new' element={<AddNotePage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ExampleProvider>
  );
}

export default App;
