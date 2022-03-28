import React, {
  useEffect
} from 'react';
import {
  Link,
} from "react-router-dom";

import { useNavigate } from "react-router-dom";

import * as api from '../api'



const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {    
    api.logout().then(() => {
      navigate('/login'); 
    })
  }

  useEffect(() => {
    api.onLogout(handleLogout);
  }, []);


  return (
    <div>
      <div className="navigation">
        <Link to='account'>account</Link>
        <Link to='leaderboard'>leaderboard</Link>
        <button className="navigation__logout" onClick={handleLogout}>logout</button>
      </div>
      <div className="navigation__content">
        {children}
      </div>
    </div>
  );
}

export default Layout;