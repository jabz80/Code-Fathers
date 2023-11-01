import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Protected, Footer } from './components';
//import { Footer } from './components';
import './App.css';

import {
  HomePage,
  AboutPage,
  NotFoundPage,
  CalendarPage,
  NotesPage,
  AddNotePage,
  PomodoroPage,
  UpdateNotePage,
  LoginPage,
  RegisterPage,
} from './pages';
import { TimerProvider } from './contexts/PomodoroContext';

import NotePage from './pages/NotePage';

function App() {
  return (
    <TimerProvider>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />

          <Route
            path="/about"
            element={
                <AboutPage />
            }
          />
          <Route
            path="/calendar"
            element={
              <Protected>
                <CalendarPage />
              </Protected>
            }
          />
          <Route
            path="/notes"
            element={
              <Protected>
                <NotesPage />
              </Protected>
            }
          />
          <Route
            path="/notes/:id"
            element={
              <Protected>
                <NotePage />
              </Protected>
            }
          />

          <Route
            path="/notes/new"
            element={
              <Protected>
                <AddNotePage />
              </Protected>
            }
          />
          <Route
            path="/notes/update/:id"
            element={
              <Protected>
                <UpdateNotePage />
              </Protected>
            }
          />

          <Route
            path="/timer"
            element={
              <Protected>
                <PomodoroPage />
              </Protected>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Footer />
    </TimerProvider>
  );
}

export default App;
