import { Button } from './Button';

export default {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
};

// Варіація 1: Звичайна кнопка
export const Primary = {
  args: {
    text: 'Почати гру',
    variant: 'primary',
  },
};

// Варіація 2: Вторинна кнопка (наприклад, для меню)
export const Secondary = {
  args: {
    text: 'Налаштування',
    variant: 'secondary',
  },
};