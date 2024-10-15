import React, { createContext, useState } from 'react';

// Create the context
export const QuizContext = createContext();

// Provider component to manage and share state
export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSettings, setShowSettings] = useState(true);

  return (
    <QuizContext.Provider
      value={{
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
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
