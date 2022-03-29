import React, {
  useEffect,
  useState,
} from 'react';

import * as api from '../api'

function Leaderboard() {

  const [data, setLeaderboard] = useState([]);


  const loadTable = () => {
    api.getLeaderboard().then(leaderboard => {
      setLeaderboard(leaderboard);
    })    
  }

  useEffect(() => {
    loadTable();
  }, []);

  const handleRefresh = () => {
    api.refreshLeaderboard().then(() => {
      loadTable();
    })
  }

  return (
    <div className="container mt-5">
      <button className="button" onClick={handleRefresh}>refresh</button>
      <div>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>position</th>
              <th>nickname</th>
              <th>balance</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.nickname}>
                <td>{item.position}</td>
                <td>{item.nickname}</td>
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