import { ScoreCard } from './ScoreCard'; // Перевір, чи правильний імпорт для твого файлу

export default {
  title: 'Result/ScoreCard',
  component: ScoreCard,
  tags: ['autodocs'],
};

// Варіація 1: Високий результат
export const HighScore = {
  args: {
    username: 'xintaro',
    score: 9999,
    date: '2026-03-03',
  },
};

// Варіація 2: Низький результат
export const LowScore = {
  args: {
    username: 'NewPlayer',
    score: 15,
    date: '2026-03-01',
  },
};