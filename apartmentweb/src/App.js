import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import BillList from './components/Bill/BillList';
import BillDetail from './components/Bill/BillDetail';
import Payment from './components/Payment/Payment';
import ProductList from './components/Product/ProductList';
import CartSummary from './components/CartSummary/CartSummary';
import Feedback from './components/Feedback/Feedback';
import FeedbackList from './components/Feedback/FeedbackList';
import FeedbackDetail from './components/Feedback/FeedbackDetail';
import Statistics from './components/Statistics/StatisticsChart';
import Login from './components/Resident/Login';
import Register from './components/Resident/Register';
import ChangePassword from './components/Resident/ChangePassword';
import ChangeAvatar from './components/Resident/ChangeAvatar';
import Profile from './components/Resident/Profile';
import Chat from './components/Chat/Chat';
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
          <Route path="/bill/:id" element={user ? <BillDetail /> : <Navigate to="/login" />} />

          <Route path="/payment" element={user ? <Payment /> : <Navigate to="/login" />} />
          <Route path="/product" element={user ? <ProductList /> : <Navigate to="/login" />} />
          <Route path="/cart-summary" element={user ? <CartSummary /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/product" />} />

          <Route path="/feedback" element={user ? <FeedbackList /> : <Navigate to="/login" />} />
          <Route path="/feedback/new" element={<Feedback />} />
          <Route path="/feedback/:id" element={<FeedbackDetail />} />

          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/change-password" element={<Profile/>} />
          <Route path="/change-avatar" element={<Profile/>} />

          <Route path="/register" element={user ? <Register /> : <Navigate to="/login" />} />
          <Route path="/statistics" element={<Statistics/>}  />
          
          <Route path="/chat" element={<Chat/>} />

        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
