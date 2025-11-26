import React from 'react';
import { Cell } from './Cell';
import './Board.css';

export const Board = ({ grid, onCellClick }) => {
  // grid - це тепер 2D масив boolean значень з useGameLogic
  return (
    <div className="board">
      <div className="board-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((isOn, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                isOn={isOn} // Передаємо реальний стан
                onClick={onCellClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};