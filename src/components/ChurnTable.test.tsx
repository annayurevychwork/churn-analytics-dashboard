import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ChurnTable from './ChurnTable';
import { describe, it, expect } from 'vitest';

// Фейковий клієнт для тесту
const mockData = [
  { 
    id: '1', 
    name: 'Тест Тестович', 
    company: 'TestCorp', 
    plan: 'Pro' as const, 
    mrr: 500, 
    churnProbability: 80, 
    lastActive: '2026-01-01', 
    status: 'At Risk' as const 
  }
];

describe('ChurnTable Component', () => {
  it('рендерить таблицю з даними клієнта', () => {
    // Рендеримо компонент. Огортаємо в BrowserRouter, бо всередині є лінки/навігація
    render(
      <BrowserRouter>
        <ChurnTable data={mockData} />
      </BrowserRouter>
    );

    // Перевіряємо, чи з'явилася на екрані назва компанії
    expect(screen.getByText('TestCorp')).toBeInTheDocument();
    
    // Перевіряємо, чи відображається правильний MRR
    expect(screen.getByText('$500')).toBeInTheDocument();
  });
});