import React from 'react';
import styles from './Button.module.css'; // Імпорт як модуль

export const Button = ({ text, onClick, variant = 'primary', type = 'button', disabled = false }) => {
  // Використовуємо styles.btn та styles['btn-primary'] динамічно
  const variantClass = styles[`btn-${variant}`];
  
  return (
    <button 
      type={type}
      className={`${styles.btn} ${variantClass}`} 
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};