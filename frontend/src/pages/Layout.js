import React, {
  useEffect
} from 'react';
import {
  Link,
  NavLink,
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
      <nav className="navbar is-light" role="navigation" aria-label="main navigation">
        <div className="container">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo" />
                </a>

                <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <NavLink to='account' className={({ isActive })=> `navbar-item ${isActive ? 'is-active': ''}`}>account</NavLink>
                    <NavLink to='leaderboard' className={({ isActive })=> `navbar-item ${isActive ? 'is-active': ''}`}>leaderboard</NavLink>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <button onClick={handleLogout} className="button is-light">
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
      <div className="container">
        {children}
      </div>
    </div>
  );
}

export default Layout;