import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import './App.css';
import { HomePage, AboutPage, NotFoundPage } from './pages';
import { ExampleProvider } from './contexts';
//Don't forget to change name of Provider

function App() {
  return (
    <ExampleProvider>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ExampleProvider>
  );
}

export default App;
