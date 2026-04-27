import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, User, Building, CreditCard, Activity, Loader2 } from 'lucide-react';
import { fetchCustomerById } from '../api';

const CustomerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Отримуємо ID з URL
  
  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer', id],
    queryFn: () => fetchCustomerById(id!),
    enabled: !!id, // Запит виконається, тільки якщо є id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800">Клієнта не знайдено</h2>
        <Link to="/" className="mt-4 text-blue-600 hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> На головну
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <Link to="/" className="inline-flex items-center text-blue-600 hover:underline font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Повернутися до дашборду
        </Link>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{customer.name}</h1>
              <p className="text-gray-500 flex items-center gap-2 mt-2">
                <Building className="w-4 h-4" /> {customer.company}
              </p>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${customer.churnProbability > 70 ? 'bg-red-100 text-red-800' : customer.churnProbability > 30 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
              Ризик відтоку: {customer.churnProbability}%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-4 bg-gray-50 rounded-lg flex items-start gap-4">
              <CreditCard className="w-6 h-6 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Поточний Тариф</p>
                <p className="font-semibold text-lg text-gray-800">{customer.plan}</p>
                <p className="text-sm text-gray-600 mt-1">MRR: ${customer.mrr}</p>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg flex items-start gap-4">
              <Activity className="w-6 h-6 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Остання активність</p>
                <p className="font-semibold text-lg text-gray-800">{customer.lastActive}</p>
                <p className="text-sm text-gray-600 mt-1">Статус: {customer.status}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm">
              Надіслати email з пропозицією
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerDetail;