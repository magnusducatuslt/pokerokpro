import React, {
  useRef,
  useState,
} from 'react';
import { useNavigate } from "react-router-dom";

import * as api from '../api'

function Login() {
  const loginInput = useRef(null);
  const passwordInput = useRef(null);
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const login = loginInput.current.value;
    const password = passwordInput.current.value;

    api.login(login, password).then((data) => {      
      navigate('/account');      
    }).catch(() => {
      setMsg('Incorrect login or password');
    })
  }

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-4-desktop">
                        <form onSubmit={handleLogin} className="box">
                            <p className="has-text-centered">{msg}</p>
                            <div className="field mt-5">
                                <label className="label">Email or Username</label>
                                <div className="controls">
                                    <input type="text" className="input" placeholder="Username" ref={loginInput} />
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label className="label">Password</label>
                                <div className="controls">
                                    <input type="password" className="input" placeholder="******" ref={passwordInput} />
                                </div>
                            </div>
                            <div className="field mt-5">
                                <button className="button is-success is-fullwidth">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Login;