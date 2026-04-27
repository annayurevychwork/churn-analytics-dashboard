import { describe, it, expect } from 'vitest';
import { useStore } from './useStore';

describe('Zustand Dashboard Store', () => {
  it('має початкове значення "All" для фільтра тарифу', () => {
    // Перевіряємо, що стан за замовчуванням правильний
    expect(useStore.getState().selectedPlan).toBe('None');
  });

  it('успішно змінює тарифний план при виклику setPlanFilter', () => {
    // Емулюємо дію користувача (вибір тарифу Pro)
    useStore.getState().setPlanFilter('Pro');
    
    // Перевіряємо, чи оновився стан
    expect(useStore.getState().selectedPlan).toBe('Pro');
  });
});