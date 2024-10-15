import React from 'react';

const Result = ({ score, totalQuestions }) => {
  return (
    <div className="result-container">
      <h2>Quiz Finished!</h2>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>
    </div>
  );
};

export default Result;
