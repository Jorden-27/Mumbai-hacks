import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Inventory from './pages/inventory';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route to login page */}
        <Route path="/" element={<Login />} />
        
        {/* Route to inventory page */}
        <Route path="/inventory" element={<Inventory />} />
        
        {/* Optional: 404 Not Found route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
