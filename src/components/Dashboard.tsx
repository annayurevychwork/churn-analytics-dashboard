import React, { useMemo } from 'react';
import { Users, DollarSign, Activity, Loader2, AlertCircle, Filter } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchCustomers } from '../api';
import ChurnTable from './ChurnTable';
import ChurnChart from './ChurnChart';
import { useStore } from '../store/useStore';

const Dashboard: React.FC = () => {
  // 1. Отримуємо дані з API
  const { 
    data: customers = [], 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });

  // 2. Отримуємо стан фільтру з Zustand
  const { selectedPlan, setPlanFilter } = useStore();

  // 3. ФІЛЬТРУЄМО ДАНІ на основі обраного тарифу
  const filteredCustomers = useMemo(() => {
    if (selectedPlan === 'All') return customers;
    return customers.filter(c => c.plan === selectedPlan);
  }, [customers, selectedPlan]);

  // 4. Обчислюємо статистику ТІЛЬКИ для відфільтрованих клієнтів
  const stats = useMemo(() => {
    if (!filteredCustomers.length) return { totalCustomers: 0, totalMRR: 0, highRiskCount: 0, mrrAtRisk: 0 };
    
    const totalMRR = filteredCustomers.reduce((acc, curr) => acc + curr.mrr, 0);
    const highRiskCustomers = filteredCustomers.filter(c => c.churnProbability > 70);
    const mrrAtRisk = highRiskCustomers.reduce((acc, curr) => acc + curr.mrr, 0);
    
    return {
      totalCustomers: filteredCustomers.length,
      totalMRR,
      highRiskCount: highRiskCustomers.length,
      mrrAtRisk
    };
  }, [filteredCustomers]);

  // СТАН 1: Завантаження (показуємо спінер)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-gray-500 font-medium">Завантаження аналітики...</p>
      </div>
    );
  }

  // СТАН 2: Помилка (показуємо повідомлення та кнопку)
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100 max-w-md text-center space-y-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-gray-800">Щось пішло не так</h2>
          <p className="text-gray-600">{(error as Error).message}</p>
          <button 
            onClick={() => refetch()}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
          >
            Спробувати знову
          </button>
        </div>
      </div>
    );
  }

  // СТАН 3: Успішне завантаження (показуємо дашборд)
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Заголовок та панель фільтрів */}
        <div className="flex justify-between items-end mb-8">
          <header>
            <h1 className="text-3xl font-bold text-gray-900">Аналітика Відтоку Клієнтів</h1>
            <p className="text-gray-500 mt-2">Прогнозування та моніторинг клієнтів за допомогою предиктивних моделей.</p>
          </header>

          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Тариф:</span>
            <select 
              value={selectedPlan}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="bg-transparent text-sm font-semibold text-gray-800 focus:outline-none cursor-pointer"
            >
              <option value="All">Всі тарифи</option>
              <option value="Basic">Basic</option>
              <option value="Pro">Pro</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
        </div>

        {/* Віджети статистики (KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Users className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Всього клієнтів</p>
              <h4 className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg"><DollarSign className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Загальний MRR</p>
              <h4 className="text-2xl font-bold text-gray-900">${stats.totalMRR.toLocaleString()}</h4>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg"><Activity className="w-6 h-6" /></div>
            <div>
              <p className="text-sm text-gray-500 font-medium">MRR в зоні ризику</p>
              <h4 className="text-2xl font-bold text-gray-900">${stats.mrrAtRisk.toLocaleString()}</h4>
              <p className="text-xs text-red-500 mt-1">{stats.highRiskCount} клієнтів можуть піти</p>
            </div>
          </div>
        </div>

        {/* Графік та Таблиця — ПЕРЕДАЄМО ВІДФІЛЬТРОВАНІ ДАНІ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ChurnChart data={filteredCustomers} />
          </div>
          <div className="lg:col-span-2">
            <ChurnTable data={filteredCustomers} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;