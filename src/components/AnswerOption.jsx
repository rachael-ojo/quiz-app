import React from 'react';

const AnswerOption = ({ answerText, handleClick }) => {
  return (
    <button className="answer-button" onClick={handleClick}>
      {answerText}
    </button>
  );
};

export default AnswerOption;
