import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { StartPage } from './pages/StartPage';
import { GamePage } from './pages/GamePage';
import { ResultsPage } from './pages/ResultsPage';
import { UserPage } from './pages/UserPage';
import { Modal } from './common/Modal';
import { SettingsForm } from './settings/SettingsForm';
import { GameOverModal } from './game/GameOverModal';
import { Button } from './common/Button';
import { useGameStore } from '../store/gameStore'; // Zustand store
import './App.css';
import CookieConsent from "react-cookie-consent";

function App() {
  const navigate = useNavigate();
  
  // Отримуємо дані зі стору
  const { settings, updateSettings, addResult } = useGameStore();
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGameOverOpen, setIsGameOverOpen] = useState(false);
  
  // Локальний стейт для поточної гри (розмір), щоб можна було робити рестарт
  const [activeSize, setActiveSize] = useState(settings.size);
  const [lastGameResult, setLastGameResult] = useState(null);

  const handleStartGame = (sizeOverride) => {
    const size = sizeOverride || settings.size;
    setActiveSize(size);
    navigate('/game');
    setIsGameOverOpen(false);
  };

  const handleEndGame = (results) => {
    const fullResult = { 
      ...results, 
      level: activeSize,
      username: settings.username 
    };
    
    setLastGameResult(fullResult);
    addResult(fullResult); // Зберігаємо в глобальну історію Zustand

    if (results.isWin) {
      setIsGameOverOpen(true);
    } else {
      navigate('/results');
    }
  };

  const handleRestart = () => {
    setIsGameOverOpen(false);
    navigate('/');
    setTimeout(() => navigate('/game'), 0);
  };

  const handleNextLevel = () => {
    const nextSize = activeSize >= 10 ? 10 : activeSize + 1;
    setActiveSize(nextSize);
    updateSettings({ size: nextSize }); // Оновлюємо глобальний розмір
    setIsGameOverOpen(false);
    navigate('/');
    setTimeout(() => navigate('/game'), 0);
  };

  return (
    <div className="App">
      <nav style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '10px', zIndex: 100 }}>
        <Button 
          text="👤 Профіль" 
          onClick={() => navigate(`/user/${settings.username}`)}
          variant="secondary" 
        />
        <Button 
          text="📊 Таблиця" 
          onClick={() => navigate('/results')}
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
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/user/:userId" element={<UserPage />} />
      </Routes>

      <Modal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        title="Налаштування гри"
      >
        {/* Форма тепер сама зв'язується зі стором */}
        <SettingsForm onClose={() => setIsSettingsOpen(false)} />
      </Modal>

      <GameOverModal 
        isOpen={isGameOverOpen}
        results={lastGameResult || {}}
        onRestart={handleRestart}
        onNextLevel={handleNextLevel}
      />
      <CookieConsent
        location="bottom"
        buttonText="Зрозумів і приймаю"
        cookieName="kop-game-gdpr-consent"
        style={{ background: "#2B373B", zIndex: 9999 }}
        buttonStyle={{ color: "#4e503b", fontSize: "14px", fontWeight: "bold", borderRadius: "5px", padding: "8px 15px" }}
        expires={150}
      >
        Ця гра використовує локальне сховище (Local Storage) для збереження вашого прогресу, налаштувань та результатів згідно з вимогами GDPR.{" "}
        <span style={{ fontSize: "11px", display: "block", marginTop: "5px" }}>
          Продовжуючи грати, ви погоджуєтесь з нашою політикою конфіденційності.
        </span>
      </CookieConsent>
    </div>
  );
}

export default App;