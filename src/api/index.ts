import type { Customer } from '../types';
import { mockCustomers } from '../data/mockData';

// Штучна затримка для імітації мережевого запиту (800 мілісекунд)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCustomers = async (): Promise<Customer[]> => {
  await delay(800); 
  
  // Імітуємо випадкову помилку сервера (з імовірністю 5%), щоб перевірити обробку помилок
  if (Math.random() < 0.05) {
    throw new Error('Помилка сервера: Не вдалося завантажити дані клієнтів');
  }

  return mockCustomers;
};

// Функція для отримання одного клієнта за його ID
export const fetchCustomerById = async (id: string): Promise<Customer | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Затримка 0.5с
  return mockCustomers.find(c => c.id === id);
};