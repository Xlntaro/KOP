import React from 'react';
import { Header } from '../common/Header';
import { ScoreCard } from '../result/ScoreCard';
import { Button } from '../common/Button';
import './ResultsPage.css';

export const ResultsPage = ({ 
  moves, 
  time, 
  level, 
  isWin, 
  onPlayAgain, 
  onBackToMenu 
}) => {
  return (
    <div className="results-page">
      <Header title="Результати гри" />
      <div className="results-container">
        <ScoreCard 
          moves={moves} 
          time={time} 
          level={level} 
          isWin={isWin}
        />
        <div className="results-actions">
          <Button text="Грати знову" onClick={onPlayAgain} />
          <Button text="Головне меню" onClick={onBackToMenu} variant="secondary" />
        </div>
      </div>
    </div>
  );
};
