import React, {
  useEffect,
  useState,
} from 'react';

import * as api from '../api'
import Loader from '../components/Loader.js'


function Account() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
    api.getUser().then(user => {
      setUser(user);
      setIsLoading(false);
    })

  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />        
      ) : (
        <div>
          <h2>Account</h2>
          <div>nickname: {user.nickname}</div>
          <div>games: {user.games}</div>
          <div>balance: {user.balance}</div>
        </div>
      )}
    </div>
  );
}

export default Account;