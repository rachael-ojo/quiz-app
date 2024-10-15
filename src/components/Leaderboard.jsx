import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  // Load the leaderboard from local storage when the component mounts
  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setLeaderboard(storedLeaderboard);
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      {leaderboard.length > 0 ? (
        <ul className="leaderboard-list">
          {leaderboard
            .sort((a, b) => b.score - a.score)
            .map((entry, index) => (
              <li key={index} className="leaderboard-item">
                <span>{entry.username}:</span> <strong>{entry.score} points</strong>
              </li>
            ))}
        </ul>
      ) : (
        <p>No scores yet. Be the first to take the quiz!</p>
      )}
    </div>
  );
};

export default Leaderboard;
