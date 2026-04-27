import type { Customer } from '../types';

export const mockCustomers: Customer[] = [
  { id: '1', name: 'Олена Петренко', company: 'TechNova', plan: 'Enterprise', mrr: 1200, churnProbability: 15, lastActive: '2026-04-26', status: 'Active' },
  { id: '2', name: 'Іван Коваленко', company: 'BuildSoft', plan: 'Pro', mrr: 300, churnProbability: 85, lastActive: '2026-04-10', status: 'At Risk' },
  { id: '3', name: 'Марія Бойко', company: 'EduCorp', plan: 'Basic', mrr: 50, churnProbability: 45, lastActive: '2026-04-20', status: 'Active' },
  { id: '4', name: 'Олег Ткач', company: 'FinStream', plan: 'Enterprise', mrr: 2500, churnProbability: 92, lastActive: '2026-03-15', status: 'At Risk' },
  { id: '5', name: 'Анна Лисенко', company: 'MedCare', plan: 'Pro', mrr: 450, churnProbability: 10, lastActive: '2026-04-27', status: 'Active' },
  { id: '6', name: 'Дмитро Шевченко', company: 'AgroPlus', plan: 'Basic', mrr: 30, churnProbability: 78, lastActive: '2026-04-05', status: 'At Risk' },
  { id: '7', name: 'Вікторія Романенко', company: 'DesignHub', plan: 'Pro', mrr: 200, churnProbability: 25, lastActive: '2026-04-25', status: 'Active' },
  { id: '8', name: 'Тарас Григорчук', company: 'Logistix', plan: 'Enterprise', mrr: 1800, churnProbability: 60, lastActive: '2026-04-18', status: 'At Risk' },
  { id: '9', name: 'Софія Мельник', company: 'RetailPro', plan: 'Basic', mrr: 60, churnProbability: 5, lastActive: '2026-04-27', status: 'Active' },
  { id: '10', name: 'Андрій Павленко', company: 'CloudNet', plan: 'Enterprise', mrr: 3000, churnProbability: 95, lastActive: '2026-02-28', status: 'At Risk' },
  { id: '11', name: 'Юлія Сидоренко', company: 'FoodDelivery', plan: 'Pro', mrr: 500, churnProbability: 33, lastActive: '2026-04-22', status: 'Active' },
  { id: '12', name: 'Максим Кравченко', company: 'AutoParts', plan: 'Basic', mrr: 40, churnProbability: 88, lastActive: '2026-04-01', status: 'At Risk' },
];