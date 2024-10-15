import React, { useState, useEffect } from 'react';

function QuizComponent() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.response_code !== 0) {
          throw new Error('Failed to retrieve valid questions from the API.');
        }
        const formattedQuestions = data.results.map((item) => ({
          questionText: item.question,
          answerOptions: shuffleAnswers([
            ...item.incorrect_answers.map((answer) => ({
              answerText: answer,
              isCorrect: false,
            })),
            { answerText: item.correct_answer, isCorrect: true },
          ]),
        }));
        setQuestions(formattedQuestions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load questions. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const shuffleAnswers = (answers) => {
    // Implement the shuffle logic for the answer options
    return answers.sort(() => Math.random() - 0.5);
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>{question.questionText}</h3>
          <ul>
            {question.answerOptions.map((option, optionIndex) => (
              <li key={optionIndex}>{option.answerText}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default QuizComponent;
