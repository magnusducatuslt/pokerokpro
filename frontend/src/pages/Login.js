import React, {
  useRef,
} from 'react';
import { useNavigate } from "react-router-dom";

import * as api from '../api'

function Login() {
  const loginInput = useRef(null);
  const passwordInput = useRef(null);

  const navigate = useNavigate();

  const handleLogin = () => {
    const login = loginInput.current.value;
    const password = passwordInput.current.value;

    api.login(login, password).then((data) => {
      navigate('/account');      
    })
  }

  return (
    <div>
      <div className="Login">
        <div className="Login__field">
          <p>login</p>
          <input type='text' ref={loginInput} />
        </div>
        <div className="Login__field">
          <p>password</p>
          <input type='password' ref={passwordInput} />
        </div>
        <div className="Login__field">
          <button onClick={handleLogin}>login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;