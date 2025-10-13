import React, { useState } from 'react';
import { StartPage } from './pages/StartPage';
import { GamePage } from './pages/GamePage';
import { ResultsPage } from './pages/ResultsPage';
import './App.css';

function App() {
  // Simple page state management (no routing as specified)
  const [currentPage, setCurrentPage] = useState('start');
  const [gameSize, setGameSize] = useState(5);
  const [gameResults, setGameResults] = useState({
    moves: 0,
    time: '00:00',
    isWin: false
  });

  const handleStartGame = (size) => {
    setGameSize(size);
    setCurrentPage('game');
  };

  const handleEndGame = () => {
    // Placeholder: Set results
    setGameResults({
      moves: 25,
      time: '02:30',
      isWin: true
    });
    setCurrentPage('results');
  };

  const handleRestart = () => {
    // Placeholder: Reset game state
    setCurrentPage('game');
  };

  const handlePlayAgain = () => {
    setCurrentPage('game');
  };

  const handleBackToMenu = () => {
    setCurrentPage('start');
  };

  return (
    <div className="App">
      {currentPage === 'start' && (
        <StartPage onStartGame={handleStartGame} />
      )}
      {currentPage === 'game' && (
        <GamePage 
          size={gameSize}
          onEndGame={handleEndGame}
          onRestart={handleRestart}
        />
      )}
      {currentPage === 'results' && (
        <ResultsPage 
          moves={gameResults.moves}
          time={gameResults.time}
          level={gameSize}
          isWin={gameResults.isWin}
          onPlayAgain={handlePlayAgain}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}

export default App;
