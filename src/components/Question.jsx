import React from 'react';
import AnswerOption from './AnswerOption';

const Question = ({ question, handleAnswerOptionClick }) => {
  return (
    <div className="question-container">
      <h2>{question.questionText}</h2>
      <div className="answer-options">
        {question.answerOptions.map((option, index) => (
          <AnswerOption
            key={index}
            answerText={option.answerText}
            handleClick={() => handleAnswerOptionClick(option.isCorrect)}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
