import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';


function Account() {

  const [user, setUser] = useState(null);


  useEffect(() => {
    axios.get('/api/user').then(response => response.data).then(user => {
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