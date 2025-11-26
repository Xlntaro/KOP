import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../common/Header';
import { Button } from '../common/Button';
import { useGameStore } from '../../store/gameStore'; // Імпорт стору
import './ResultsPage.css'; // Не забудьте додати стилі для таблиці

export const ResultsPage = () => {
  const navigate = useNavigate();
  // Отримуємо історію результатів
  const resultsHistory = useGameStore((state) => state.resultsHistory);

  return (
    <div className="results-page">
      <Header title="Таблиця результатів" />
      
      <div className="results-container" style={{ justifyContent: 'flex-start', paddingTop: '20px' }}>
        
        {resultsHistory.length === 0 ? (
          <p style={{ color: 'white', fontSize: '18px' }}>Історія ігор порожня.</p>
        ) : (
          <div className="table-wrapper" style={{ width: '100%', maxWidth: '600px', overflowX: 'auto' }}>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Гравець</th>
                  <th>Рівень</th>
                  <th>Ходи</th>
                  <th>Час</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {resultsHistory.map((res) => (
                  <tr key={res.id}>
                    <td>{res.date}</td>
                    <td>{res.username || 'Анонім'}</td>
                    <td>{res.level}x{res.level}</td>
                    <td>{res.moves}</td>
                    <td>{res.time}</td>
                    <td style={{ color: res.isWin ? '#4CAF50' : '#fc4a1a' }}>
                      {res.isWin ? 'Перемога' : 'Поразка'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="results-actions" style={{ marginTop: 'auto', paddingBottom: '40px' }}>
          <Button text="На головну" onClick={() => navigate('/')} variant="secondary" />
          <Button text="Нова гра" onClick={() => navigate('/game')} />
        </div>
      </div>
    </div>
  );
};