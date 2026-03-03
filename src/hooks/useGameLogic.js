import { useState, useEffect, useCallback } from 'react';

export const useGameLogic = (size) => {
  const [board, setBoard] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // ВИПРАВЛЕННЯ 1: Обгортаємо цю функцію в useCallback
  const toggleCellLogic = useCallback((currentBoard, r, c) => {
    const newBoard = currentBoard.map((row) => [...row]);
    const directions = [
      [0, 0],   // сама клітинка
      [-1, 0],  // зверху
      [1, 0],   // знизу
      [0, -1],  // зліва
      [0, 1],   // справа
       /**
        * Компонент кнопки.
        * @param {Object} props - Властивості компонента.
        * @param {string} props.label - Текст на кнопці.
        * @param {function} props.onClick - Функція, що викликається при кліку.
        * @returns {JSX.Element} React компонент.
        */
    ];

    directions.forEach(([dr, dc]) => {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
        newBoard[nr][nc] = !newBoard[nr][nc];
      }
    });

    return newBoard;
  }, [size]); // Додаємо size як залежність

  // Ініціалізація гри
  const initGame = useCallback(() => {
    let newBoard = Array(size).fill().map(() => Array(size).fill(false));
    
    const randomMoves = size * 5;
    for (let i = 0; i < randomMoves; i++) {
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);
      newBoard = toggleCellLogic(newBoard, r, c);
    }

    setBoard(newBoard);
    setMoves(0);
    setIsWon(false);
  }, [size, toggleCellLogic]); // ВИПРАВЛЕННЯ 2: Додаємо toggleCellLogic у залежності

  // ... решта коду без змін (useEffect, onCellClick, return) ...
  
  useEffect(() => {
    initGame();
  }, [initGame]);

  const onCellClick = (r, c) => {
    if (isWon) return;

    const newBoard = toggleCellLogic(board, r, c);
    setBoard(newBoard);
    setMoves((prev) => prev + 1);

    const allLightsOff = newBoard.every((row) => row.every((cell) => !cell));
    if (allLightsOff) {
      setIsWon(true);
    }
  };

  return { board, moves, isWon, onCellClick, resetGame: initGame };
};