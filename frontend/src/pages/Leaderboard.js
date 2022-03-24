import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

function Leaderboard() {

  const [data, setLeaderboard] = useState([]);


  useEffect(() => {
    axios.get('/api/leaderboard').then(response => response.data).then(leaderboard => {
      setLeaderboard(leaderboard);
    })

  }, []);

  const handleRefresh = () => {
    axios.get('/api/leaderboard/refresh').then(response => response.data).then(leaderboard => {
      setLeaderboard(leaderboard);
    })
  }

  return (
    <div>
      <button onClick={handleRefresh}>refresh</button>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>game count</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr>
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