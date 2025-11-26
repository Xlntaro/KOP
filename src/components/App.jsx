import React, { useState } from 'react';
import { StartPage } from './pages/StartPage';
import { GamePage } from './pages/GamePage';
import { ResultsPage } from './pages/ResultsPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('start');
  const [gameSize, setGameSize] = useState(3); // Default 3x3
  
  // Стан для збереження результатів останньої гри
  const [gameResults, setGameResults] = useState({
    moves: 0,
    time: '00:00',
    isWin: false
  });

  const handleStartGame = (size) => {
    setGameSize(size);
    setCurrentPage('game');
  };

  // Отримуємо результати з GamePage
  const handleEndGame = (results) => {
    setGameResults(results);
    setCurrentPage('results');
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
          // onRestart обробляється всередині GamePage, 
          // але можна передати пусту функцію або логування, якщо треба
          onRestart={() => console.log('Restart triggered form GamePage')}
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