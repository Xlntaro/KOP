import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'; // Стилі додамо пізніше

// Створюємо портал. Для цього в index.html бажано додати <div id="modal-root"></div>,
// але якщо його немає, додамо динамічно або використаємо body.
const modalRoot = document.getElementById('modal-root') || document.body;

export const Modal = ({ isOpen, onClose, title, children }) => {
  const el = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(el);
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          {onClose && (
            <button className="modal-close" onClick={onClose}>
              &times;
            </button>
          )}
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    el
  );
};