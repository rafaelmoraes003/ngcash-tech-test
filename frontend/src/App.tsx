import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Transactions from './pages/Transactions';
import Form from './pages/Form';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Form endpoint="/login" />} />
      <Route path="/register" element={<Form endpoint="/register" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

export default App;
