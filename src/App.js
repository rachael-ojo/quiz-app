import React from 'react';
import Quiz from './components/Quiz';
import { QuizProvider } from './QuizContext';
import './App.css';

function App() {
  return (
    <QuizProvider>
      <div className="App">
        <Quiz />
      </div>
    </QuizProvider>
  );
}

export default App;
