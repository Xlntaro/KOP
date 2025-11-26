import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { ScoreCard } from '../result/ScoreCard'; // Перевикористаємо існуючу картку

export const GameOverModal = ({ isOpen, results, onRestart, onNextLevel }) => {
  return (
    <Modal isOpen={isOpen} title={results.isWin ? "Вітаємо!" : "Гру завершено"}>
      <div style={{ textAlign: 'center' }}>
        <ScoreCard 
          moves={results.moves} 
          time={results.time} 
          level={results.level} 
          isWin={results.isWin} 
        />
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
          <Button text="Спробувати ще" onClick={onRestart} variant="secondary" />
          {results.isWin && (
            <Button text="Наступний рівень" onClick={onNextLevel} />
          )}
        </div>
      </div>
    </Modal>
  );
};