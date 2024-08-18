import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import PatternGenerator from './components/PatternGenerator';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/create" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/create" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/create"
            element={isAuthenticated ? <PatternGenerator /> : <Navigate to="/login" />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/reset-password/:uidb64/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
