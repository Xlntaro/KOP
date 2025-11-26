import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGameStore = create(
  persist(
    (set) => ({
      // --- Стан ---
      settings: {
        size: 5,
        username: 'Player1',
      },
      resultsHistory: [], // Масив для таблиці результатів

      // --- Дії (Actions) ---
      
      // Оновлення налаштувань
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),

      // Додавання нового результату в історію
      addResult: (result) => set((state) => ({
        resultsHistory: [
          { ...result, id: Date.now(), date: new Date().toLocaleString() }, 
          ...state.resultsHistory
        ]
      })),

      // Очищення історії (опціонально)
      clearHistory: () => set({ resultsHistory: [] }),
    }),
    {
      name: 'lights-out-storage', // Ім'я ключа в localStorage
      partialize: (state) => ({ // Зберігаємо лише налаштування та історію
        settings: state.settings,
        resultsHistory: state.resultsHistory,
      }),
    }
  )
);