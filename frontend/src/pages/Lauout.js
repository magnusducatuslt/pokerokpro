import React from 'react';
import {
  Link,
} from "react-router-dom";

const Lauout = ({ children }) => {
  return (
    <div>
      <div>
        <Link to='account'>account</Link>
        <Link to='leaderboard'>leaderboard</Link>
        <Link to='login'>logout</Link>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

export default Lauout;