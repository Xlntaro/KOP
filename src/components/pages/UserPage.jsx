import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { Header } from '../common/Header';
import { Button } from '../common/Button';

export const UserPage = () => {
  const { userId } = useParams(); // Отримуємо динамічний параметр з URL
  const { settings } = useGame();
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
      <Header title="Профіль гравця" />
      
      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px', maxWidth: '500px', margin: '20px auto' }}>
        <h2>ID: {userId}</h2>
        <p>Ім'я: {settings.username}</p>
        <p>Поточна складність: {settings.size}x{settings.size}</p>
      </div>

      <Button text="На головну" onClick={() => navigate('/')} variant="secondary" />
    </div>
  );
};