import React from 'react';
import { Cell } from './Cell';
import './Board.css';

export const Board = ({ size = 5, grid, onCellClick }) => {
  return (
    <div className="board">
      <div className="board-grid">
        {/* Placeholder: Grid rendering logic */}
        {Array.from({ length: size }).map((_, row) => (
          <div key={row} className="board-row">
            {Array.from({ length: size }).map((_, col) => (
              <Cell
                key={`${row}-${col}`}
                row={row}
                col={col}
                isOn={false}
                onClick={onCellClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
