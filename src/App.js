import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Portfolio from './components/Portfolio/Portfolio';
import Footer from './components/Footer/Footer';
import Particlee from './components/Particlee/Particlee';


import './App.css';

const App = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/particlee" element={<Particlee />} />
         
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default () => (
  <Router>
    <App />
  </Router>
);