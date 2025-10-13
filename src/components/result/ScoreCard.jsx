import React from 'react';
import './ScoreCard.css';

export const ScoreCard = ({ moves, time, level, isWin }) => {
  return (
    <div className={`score-card ${isWin ? 'win' : 'lose'}`}>
      <h2 className="score-title">
        {isWin ? '🎉 Перемога!' : '😔 Спробуйте ще'}
      </h2>
      <div className="score-details">
        <div className="score-item">
          <span>Кількість ходів:</span>
          <strong>{moves || 0}</strong>
        </div>
        <div className="score-item">
          <span>Витрачений час:</span>
          <strong>{time || '00:00'}</strong>
        </div>
        <div className="score-item">
          <span>Рівень:</span>
          <strong>{level || 1}</strong>
        </div>
      </div>
    </div>
  );
};
