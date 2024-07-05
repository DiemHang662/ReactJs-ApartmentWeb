import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './components/Home/Home'; // Adjust the path as necessary
import BillList from './components/Bill/BillList'; // Adjust the path as necessary
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bill" element={<BillList />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
