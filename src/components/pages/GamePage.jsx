import React, { useState, useEffect } from 'react';
import { Header } from '../common/Header';
import { Board } from '../game/Board';
import { GameStats } from '../game/GameStats';
import { Button } from '../common/Button';
import './GamePage.css';

export const GamePage = ({ size, onEndGame, onRestart }) => {
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0); // Зберігаємо час у секундах

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer); // Очищення при розмонтуванні компонента
  }, []);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleCellClick = (row, col) => {
    // Placeholder: Тут буде бізнес-логіка
    console.log(`Cell clicked: ${row}, ${col}`);
    setMoves(moves + 1);
  };

  return (
    <div className="game-page">
      <Header title="Світло Вимкнено" />
      <div className="game-container">
        <GameStats moves={moves} time={formatTime(time)} level={size} />
        <Board size={size} onCellClick={handleCellClick} />
        <div className="game-controls">
          <Button text="Почати заново" onClick={onRestart} variant="secondary" />
          <Button text="Вийти" onClick={onEndGame} />
        </div>
      </div>
    </div>
  );
};