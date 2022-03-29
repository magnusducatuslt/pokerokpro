import React, {
  useEffect,
  useState,
} from 'react';

import * as api from '../api'

function Leaderboard() {

  const [data, setLeaderboard] = useState([]);


  useEffect(() => {
    api.getLeaderboard().then(leaderboard => {
      setLeaderboard(leaderboard);
    })

  }, []);

  const handleRefresh = () => {
    api.refreshLeaderboard().then(leaderboard => {
      setLeaderboard(leaderboard);
    })
  }

  return (
    <div className="container mt-5">
      <button className="button" onClick={handleRefresh}>refresh</button>
      <div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>game count</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.nickname}>
                <td>{item.nickname}</td>
                <td>{item.games}</td>
                <td>{item.balance}</td>
              </tr>
             ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;