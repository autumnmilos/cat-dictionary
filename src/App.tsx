import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CatCard from './CatCard';
import CatGrid from './CatList';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Link to="/">
        <h1>Cat Dictionary</h1>
      </Link>
      <Routes>
        <Route path="/cat/:id/:url" element={<CatCard />} />
        <Route path="/" element={<CatGrid />} />
      </Routes>
    </Router>
  );
};

export default App;
