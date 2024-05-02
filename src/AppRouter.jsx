import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PincodeDetails from './PincodeDetails';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pincode-details" element={<PincodeDetails />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;