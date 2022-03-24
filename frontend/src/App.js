import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import './App.css';

import Lauout from './pages/Lauout.js'
import Login from './pages/Login.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Lauout > <Outlet /> </Lauout>}>
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
  </Router>
  );
}





function Leaderboard() {
  return <h2>Leaderboard</h2>;
}

function Account() {
  return <h2>Account</h2>;
}


export default App;
