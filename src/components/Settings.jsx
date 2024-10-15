import React, { useState } from 'react';

const Settings = ({ onStartQuiz }) => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [category, setCategory] = useState('18'); // Default to Science: Computers
  const [difficulty, setDifficulty] = useState('medium');

  const handleStartQuiz = () => {
    onStartQuiz(numQuestions, category, difficulty);
  };

  return (
    <div className="settings-container">
      <h2>Quiz Settings</h2>

      <div className="settings-item">
        <label htmlFor="numQuestions">Number of Questions:</label>
        <input
          type="number"
          id="numQuestions"
          value={numQuestions}
          min="1"
          max="50"
          onChange={(e) => setNumQuestions(e.target.value)}
        />
      </div>

      <div className="settings-item">
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="18">Science: Computers</option>
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
          <option value="27">Animals</option>
        </select>
      </div>

      <div className="settings-item">
        <label htmlFor="difficulty">Difficulty:</label>
        <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button className="start-quiz-button" onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default Settings;