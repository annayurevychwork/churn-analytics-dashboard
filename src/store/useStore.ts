import { create } from 'zustand';

// Описуємо типи нашого стану
interface DashboardState {
  selectedPlan: string;
  setPlanFilter: (plan: string) => void;
}

// Створюємо саме сховище
export const useStore = create<DashboardState>((set) => ({
  selectedPlan: 'All', // За замовчуванням показуємо всіх
  setPlanFilter: (plan) => set({ selectedPlan: plan }), // Функція для оновлення стану
}));