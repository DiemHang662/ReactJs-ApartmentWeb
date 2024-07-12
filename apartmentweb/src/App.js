import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import BillList from './components/Bill/BillList';
import BillDetail from './components/Bill/BillDetail';
import Payment from './components/Payment/Payment';
import Profile from './components/Resident/Profile';
import ChangePassword from './components/Resident/ChangePassword';
import ChangeAvatar from './components/Resident/ChangeAvatar';
import Login from './components/Resident/Login';
import './App.css';
import { MyUserContext } from './configs/Contexts';

function App() {
  const user = useContext(MyUserContext);

  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/bill" element={user ? <BillList /> : <Navigate to="/login" />} />
          <Route path="/payment" element={user ? <Payment /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/change-password" element={<Profile/>} />
          <Route path="/change-avatar" element={<Profile/>} />
          <Route path="/bill/:id" element={user ? <BillDetail /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
