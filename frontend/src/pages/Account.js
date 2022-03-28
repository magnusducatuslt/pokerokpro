import React, {
  useEffect,
  useState,
} from 'react';

// import axios from 'axios';
import * as api from '../api'


function Account() {

  const [user, setUser] = useState(null);


  useEffect(() => {
    api.getUser().then(user => {
      setUser(user);
    })

  }, []);

  return (
    <div>
      <h2>Account</h2>
      {user && (
        <div>
          <div>nickname: {user.nickname}</div>
          <div>games: {user.games}</div>
          <div>balance: {user.balance}</div>
        </div>
      )}
    </div>
  );
}

export default Account;