import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import QuoteListPage from './Pages/QuoteListPage/QuoteListPage';
import QuoteCreationPage from './Pages/QuoteCreationPage/QuoteCreationPage';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/quotes" element={<QuoteListPage />} />
        <Route path="/create-quote" element={<QuoteCreationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
