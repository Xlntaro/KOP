import React, { useState, useEffect } from 'react';
import { StartPage } from './pages/StartPage';
import { GamePage } from './pages/GamePage';
import { ResultsPage } from './pages/ResultsPage';
import { Modal } from './common/Modal';
import { SettingsForm } from './settings/SettingsForm';
import { GameOverModal } from './game/GameOverModal';
import { Button } from './common/Button'; // Для кнопки налаштувань на головній
import './App.css';

function App() {
  // Завантаження налаштувань з localStorage або дефолтні значення
  const getInitialSettings = () => {
    const savedSettings = localStorage.getItem('gameSettings');
    return savedSettings 
      ? JSON.parse(savedSettings) 
      : { size: 5, username: 'Гравець' };
  };

  const [settings, setSettings] = useState(getInitialSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGameOverOpen, setIsGameOverOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState('start');
  
  // gameSize тепер береться з settings, але може бути змінений динамічно (Next Level)
  const [activeSize, setActiveSize] = useState(settings.size); 
  
  const [gameResults, setGameResults] = useState({
    moves: 0,
    time: '00:00',
    isWin: false,
    level: settings.size
  });

  // Збереження в localStorage при зміні налаштувань
  useEffect(() => {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
  }, [settings]);

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setActiveSize(newSettings.size); // Оновлюємо поточний розмір
    setIsSettingsOpen(false);
  };

  const handleStartGame = (sizeOverride) => {
    // Якщо передали розмір (наприклад, з кнопок швидкого вибору), використовуємо його
    // Інакше беремо з налаштувань
    setActiveSize(sizeOverride || settings.size);
    setCurrentPage('game');
    setIsGameOverOpen(false);
  };

  const handleEndGame = (results) => {
    setGameResults({ ...results, level: activeSize });
    // Замість переходу на сторінку результатів, відкриваємо модалку (якщо це перемога)
    // Або можна використовувати ResultsPage для статистики, а модалку для швидкої дії
    if (results.isWin) {
        setIsGameOverOpen(true);
    } else {
        // Якщо здалися - переходимо на сторінку результатів (стара логіка) або теж модалку
        setCurrentPage('results');
    }
  };

  const handleRestart = () => {
    setIsGameOverOpen(false);
    // Тут є нюанс: GamePage не перемонтується, якщо просто змінити state.
    // Найпростіший спосіб - скинути на 'start' на секунду, або передати ключ в GamePage
    // Але в нашій реалізації GamePage має onRestart, який викликає хуки.
    // Для повного перезапуску з модалки:
    setCurrentPage('start'); 
    setTimeout(() => setCurrentPage('game'), 0);
  };

  const handleNextLevel = () => {
    const nextSize = activeSize >= 10 ? 10 : activeSize + 1; // Збільшуємо складність (але не більше 10)
    setActiveSize(nextSize);
    
    // Оновлюємо глобальні налаштування теж, якщо хочемо зберегти прогрес
    setSettings(prev => ({ ...prev, size: nextSize }));
    
    setIsGameOverOpen(false);
    // Перезапуск гри
    setCurrentPage('start');
    setTimeout(() => setCurrentPage('game'), 0);
  };

  const handleBackToMenu = () => {
    setIsGameOverOpen(false);
    setCurrentPage('start');
  };

  return (
    <div className="App">
      {/* Кнопка налаштувань доступна на стартовій сторінці */}
      {currentPage === 'start' && (
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <Button text="⚙️ Налаштування" onClick={() => setIsSettingsOpen(true)} variant="secondary" />
        </div>
      )}

      {currentPage === 'start' && (
        <StartPage onStartGame={handleStartGame} />
      )}
      
      {currentPage === 'game' && (
        <GamePage 
          key={activeSize} // Ключ змушує компонент перестворитись при зміні розміру
          size={activeSize}
          onEndGame={handleEndGame}
          // onRestart прокидається в GamePage для внутрішньої кнопки
          onRestart={() => console.log('Restarting...')} 
        />
      )}
      
      {currentPage === 'results' && (
        <ResultsPage 
          moves={gameResults.moves}
          time={gameResults.time}
          level={activeSize}
          isWin={gameResults.isWin}
          onPlayAgain={() => handleStartGame(activeSize)}
          onBackToMenu={handleBackToMenu}
        />
      )}

      {/* Модальне вікно налаштувань */}
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

      {/* Модальне вікно завершення гри (Портал) */}
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