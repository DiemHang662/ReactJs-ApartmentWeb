import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home'; // Adjust the path as necessary
import BillList from './components/Bill/BillList'; // Adjust the path as necessary
import BillDetail from './components/Bill/BillDetail'; // Adjust the path as necessary
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bill" element={<BillList />} />
          <Route path="/bill/:id" element={<BillDetail />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
