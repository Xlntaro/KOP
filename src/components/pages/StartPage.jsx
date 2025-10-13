import React from 'react';
import { Header } from '../common/Header';
import { Button } from '../common/Button';
import './StartPage.css';

export const StartPage = ({ onStartGame }) => {
  return (
    <div className="start-page">
      <Header 
        title="Світло Вимкнено" 
        subtitle="Вимкніть всі світильники на полі!"
      />
      <div className="start-content">
        <div className="game-description">
          <h2>Правила гри:</h2>
          <ul>
            <li>Натисніть на клітинку, щоб змінити її стан</li>
            <li>Сусідні клітинки також зміняться</li>
            <li>Вимкніть всі світильники за мінімальну кількість ходів</li>
          </ul>
        </div>
        <div className="difficulty-selector">
          <h3>Оберіть рівень складності:</h3>
          <div className="difficulty-buttons">
            <Button text="Легкий (3x3)" onClick={() => onStartGame(3)} />
            <Button text="Середній (5x5)" onClick={() => onStartGame(5)} variant="secondary" />
            <Button text="Важкий (7x7)" onClick={() => onStartGame(7)} />
          </div>
        </div>
      </div>
    </div>
  );
};
