import React from 'react';
import './Cell.css';

export const Cell = ({ isOn, row, col, onClick }) => {
  return (
    <div 
      className={`cell ${isOn ? 'cell-on' : 'cell-off'}`}
      onClick={() => onClick(row, col)}
    >
      {/* Placeholder for cell content */}
    </div>
  );
};
