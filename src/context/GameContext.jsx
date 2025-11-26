import React, { createContext, useState, useContext, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  // Завантажуємо налаштування з localStorage
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('gameSettings');
    return saved ? JSON.parse(saved) : { size: 5, username: 'Player1' };
  });

  const [gameResults, setGameResults] = useState({
    moves: 0,
    time: '00:00',
    isWin: false,
    level: 5
  });

  useEffect(() => {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <GameContext.Provider value={{ 
      settings, 
      updateSettings, 
      gameResults, 
      setGameResults 
    }}>
      {children}
    </GameContext.Provider>
  );
};