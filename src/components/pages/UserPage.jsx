import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameStore } from '../../store/gameStore'; // 1. Змінюємо імпорт на Zustand
import { Header } from '../common/Header';
import { Button } from '../common/Button';

export const UserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  // 2. Отримуємо налаштування зі стору Zustand замість useGame()
  const settings = useGameStore((state) => state.settings);

  return (
    <div className="page-container" style={{ padding: '20px', textAlign: 'center', color: 'white' }}>
      <Header title="Профіль гравця" />
      
      <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px', maxWidth: '500px', margin: '20px auto' }}>
        <h2>ID: {userId}</h2>
        {/* Тепер settings доступні коректно */}
        <p>Ім'я: {settings.username}</p>
        <p>Поточна складність: {settings.size}x{settings.size}</p>
      </div>

      <Button text="На головну" onClick={() => navigate('/')} variant="secondary" />
    </div>
  );
};