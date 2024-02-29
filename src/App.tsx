import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CatCard from './CatCard';
import CatGrid from './CatList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cat/:id/:url" element={<CatCard />} />
        <Route path="/" element={<CatGrid />} />
      </Routes>
    </Router>
  );
};

export default App;
