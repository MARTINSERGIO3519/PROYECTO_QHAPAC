import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Puntuaciones from './pages/Puntuaciones';
import Tutorial from './pages/Tutorial';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/puntuaciones" element={<Puntuaciones />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
