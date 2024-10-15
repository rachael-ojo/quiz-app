import React from 'react';

const Scoreboard = ({ score, totalQuestions }) => {
  return (
    <div className="scoreboard">
      <h3>Score: {score} / {totalQuestions}</h3>
    </div>
  );
};

export default Scoreboard;
