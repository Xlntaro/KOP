import React from 'react';
import './GameStats.css';

export const GameStats = ({ moves, time, level }) => {
  return (
    <div className="game-stats">
      <div className="stat-item">
        <span className="stat-label">Ходів:</span>
        <span className="stat-value">{moves || 0}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Час:</span>
        <span className="stat-value">{time || '00:00'}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Рівень:</span>
        <span className="stat-value">{level || 1}</span>
      </div>
    </div>
  );
};
