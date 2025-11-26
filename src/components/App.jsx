import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Імпорти для роутингу
import { StartPage } from './pages/StartPage';
import { GamePage } from './pages/GamePage';
import { ResultsPage } from './pages/ResultsPage';
import { UserPage } from './pages/UserPage'; // Нова сторінка
import { Modal } from './common/Modal';
import { SettingsForm } from './settings/SettingsForm';
import { GameOverModal } from './game/GameOverModal';
import { Button } from './common/Button';
import { useGame } from '../context/GameContext'; // Використовуємо контекст
import './App.css';

function App() {
  const { settings, updateSettings, setGameResults, gameResults } = useGame();
  const navigate = useNavigate(); // Хук для навігації

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGameOverOpen, setIsGameOverOpen] = useState(false);
  const [activeSize, setActiveSize] = useState(settings.size);

  const handleSaveSettings = (newSettings) => {
    updateSettings(newSettings);
    setActiveSize(newSettings.size);
    setIsSettingsOpen(false);
  };

  const handleStartGame = (sizeOverride) => {
    const size = sizeOverride || settings.size;
    setActiveSize(size);
    navigate('/game'); // Навігація на гру
    setIsGameOverOpen(false);
  };

  const handleEndGame = (results) => {
    setGameResults({ ...results, level: activeSize });
    if (results.isWin) {
      setIsGameOverOpen(true);
    } else {
      navigate('/results'); // Навігація на результати
    }
  };

  const handleRestart = () => {
    setIsGameOverOpen(false);
    // Хак для перезавантаження компонента гри
    navigate('/');
    setTimeout(() => navigate('/game'), 0);
  };

  const handleNextLevel = () => {
    const nextSize = activeSize >= 10 ? 10 : activeSize + 1;
    setActiveSize(nextSize);
    updateSettings({ ...settings, size: nextSize });
    setIsGameOverOpen(false);
    navigate('/');
    setTimeout(() => navigate('/game'), 0);
  };

  return (
    <div className="App">
      {/* Навігаційна панель (можна винести в окремий компонент) */}
      <nav style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px', zIndex: 100 }}>
        <Button 
          text="👤 Профіль" 
          onClick={() => navigate(`/user/${settings.username}`)} // Динамічний роутинг з ID
          variant="secondary" 
        />
        <Button 
          text="⚙️ Налаштування" 
          onClick={() => setIsSettingsOpen(true)} 
          variant="secondary" 
        />
      </nav>

      <Routes>
        <Route 
          path="/" 
          element={<StartPage onStartGame={handleStartGame} />} 
        />
        <Route 
          path="/game" 
          element={
            <GamePage 
              key={activeSize} 
              size={activeSize}
              onEndGame={handleEndGame}
              onRestart={() => console.log('Restarting...')} 
            />
          } 
        />
        <Route 
          path="/results" 
          element={
            <ResultsPage 
              moves={gameResults.moves}
              time={gameResults.time}
              level={activeSize}
              isWin={gameResults.isWin}
              onPlayAgain={() => handleStartGame(activeSize)}
              onBackToMenu={() => navigate('/')}
            />
          } 
        />
        {/* Динамічний роут для користувача */}
        <Route path="/user/:userId" element={<UserPage />} />
      </Routes>

      <Modal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        title="Налаштування гри"
      >
        <SettingsForm 
          initialSettings={settings} 
          onSave={handleSaveSettings} 
        />
      </Modal>

      <GameOverModal 
        isOpen={isGameOverOpen}
        results={gameResults}
        onRestart={handleRestart}
        onNextLevel={handleNextLevel}
      />
    </div>
  );
}

export default App;