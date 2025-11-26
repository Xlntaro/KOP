import React, { useEffect } from 'react';
import { Header } from '../common/Header';
import { Board } from '../game/Board';
import { GameStats } from '../game/GameStats';
import { Button } from '../common/Button';
import { useGameLogic } from '../../hooks/useGameLogic';
import { useTimer } from '../../hooks/useTimer';
import './GamePage.css';

export const GamePage = ({ size, onEndGame, onRestart: propOnRestart }) => {
  // Підключаємо кастомні хуки
  const { board, moves, isWon, onCellClick, resetGame } = useGameLogic(size);
  const { formatTime, start, stop, reset } = useTimer();

  // Запускаємо таймер при старті
  useEffect(() => {
    start();
    return () => stop();
  }, [start, stop]);

  // Слідкуємо за перемогою
  useEffect(() => {
    if (isWon) {
      stop();
      // Робимо невелику затримку перед показом результатів
      setTimeout(() => {
        onEndGame({ moves, time: formatTime(), isWin: true });
      }, 500);
    }
  }, [isWon, stop, onEndGame, moves, formatTime]);

  // Обробник рестарту (об'єднує логіку гри та таймера)
  const handleRestart = () => {
    resetGame(); // Скидає дошку
    reset();     // Скидає таймер на 0
    start();     // Запускає таймер знову
  };

  return (
    <div className="game-page">
      <Header title="Світло Вимкнено" />
      <div className="game-container">
        <GameStats moves={moves} time={formatTime()} level={size} />
        
        {/* Передаємо board як grid */}
        <Board grid={board} onCellClick={onCellClick} />
        
        <div className="game-controls">
          <Button text="Почати заново" onClick={handleRestart} variant="secondary" />
          <Button 
            text="Здатися" 
            onClick={() => onEndGame({ moves, time: formatTime(), isWin: false })} 
          />
        </div>
      </div>
    </div>
  );
};