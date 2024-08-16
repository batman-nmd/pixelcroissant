import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import PatternGenerator from './components/PatternGenerator';
import SavedPatterns from './components/SavedPatterns';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PatternGenerator />} />
          <Route path="/create" element={<PatternGenerator />} />
          <Route path="/saved-patterns" element={<SavedPatterns />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
