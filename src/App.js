import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Calendar from './Calendar';
import './index.css';

function App() {
return (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  </Router>
);
}

export default App;