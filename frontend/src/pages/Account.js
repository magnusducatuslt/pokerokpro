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
        <div className="account">
          <h2 className="title is-bold has-text-centered">{user.nickname}</h2>
          <div className="columns is-multiline">
            <div className="column has-text-centered">
              <p className="stat-val">{user.position}</p>
              <p className="stat-key">position</p>
            </div>
            <div className="column has-text-centered">
              <p className="stat-val">{user.balance}</p>
              <p className="stat-key">balance</p>
            </div>
            <div className="column has-text-centered">
              <p className="stat-val">{user.games}</p>
              <p className="stat-key">games</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;