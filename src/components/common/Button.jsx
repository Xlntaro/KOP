import React from 'react';
import './Button.css';

export const Button = ({ text, onClick, variant = 'primary' }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {text}
    </button>
  );
};
