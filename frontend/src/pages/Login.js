import React, {
  useRef,
} from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
  const loginInput = useRef(null);
  const passwordInput = useRef(null);

  const navigate = useNavigate();

  const handleLogin = () => {
    const login = loginInput.current.value;
    const password = passwordInput.current.value;
    console.log('>> ', login, password);

    navigate('/account');
  }

  return (
    <div>
      <div>
        <div>
          login
          <input type='text' ref={loginInput} />
        </div>
        <div>
          password
          <input type='password' ref={passwordInput} />
        </div>
        <button onClick={handleLogin}>login</button>
      </div>
    </div>
  );
}

export default Login;