import React, { useContext, useEffect } from 'react';
import Question from './Question';
import Result from './Result';
import Scoreboard from './Scoreboard';
import Settings from './Settings';
import Leaderboard from './Leaderboard';
import { QuizContext } from '../QuizContext';

const Quiz = () => {
  const {
    questions,
    setQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    score,
    setScore,
    isQuizFinished,
    setIsQuizFinished,
    timeLeft,
    setTimeLeft,
    loading,
    setLoading,
    error,
    setError,
    showSettings,
    setShowSettings,
  } = useContext(QuizContext);

  const saveScoreToLeaderboard = () => {
    const username = prompt('Enter your name:');
    if (username) {
      const newEntry = { username, score };
      const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
      storedLeaderboard.push(newEntry);
      localStorage.setItem('leaderboard', JSON.stringify(storedLeaderboard));
    }
  };

  useEffect(() => {
    if (isQuizFinished) {
      saveScoreToLeaderboard();
    }
  }, [isQuizFinished]);

  const fetchQuestions = async (numQuestions, category, difficulty) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
      );
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
      setShowSettings(false);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load questions. Please try again later.');
      setLoading(false);
    }
  };

  const shuffleAnswers = (answers) => {
    return answers.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, setTimeLeft]);

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setTimeLeft(15);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  return (
    <div className="quiz-section">
      {showSettings ? (
        <Settings onStartQuiz={fetchQuestions} />
      ) : loading ? (
        <div>Loading questions...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : isQuizFinished ? (
        <>
          <Result score={score} totalQuestions={questions.length} />
          <Leaderboard />
        </>
      ) : (
        <>
          <Scoreboard score={score} totalQuestions={questions.length} />
          <div className="timer">Time Left: {timeLeft} seconds</div>
          <Question
            question={questions[currentQuestionIndex]}
            handleAnswerOptionClick={handleAnswerOptionClick}
          />
        </>
      )}
    </div>
  );
};

export default Quiz;
