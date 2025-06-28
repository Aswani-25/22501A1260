// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RedirectPage from './pages/RedirectPage';
import ShortenerPage from './pages/ShortenerPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShortenerPage />} />
      <Route path="/:shortcode" element={<RedirectPage />} />
    </Routes>
  );
}

export default App;
