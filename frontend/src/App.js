import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import './App.css';

import Layout from './pages/Layout.js'
import Login from './pages/Login.js'
import Leaderboard from './pages/Leaderboard.js'
import Account from './pages/Account.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Leaderboard />} />
       {/* <Route path="/login" element={<Login />} />
        <Route element={<Layout > <Outlet /> </Layout>}>
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/account" element={<Account />} />
        </Route>*/}
      </Routes>
  </Router>
  );
}

export default App;
