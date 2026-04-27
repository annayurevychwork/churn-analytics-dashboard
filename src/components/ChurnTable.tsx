import React, { useState, useMemo } from 'react';
import type { Customer, SortKey } from '../types';
import { Search, ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChurnTableProps {
  data: Customer[];
}

const ChurnTable: React.FC<ChurnTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>({ key: 'churnProbability', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Фільтрація, сортування та пагінація за допомогою useMemo
  const navigate = useNavigate();
  const processedData = useMemo(() => {
    let filtered = data.filter(customer => 
      customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [data, searchTerm, sortConfig]);

  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const paginatedData = processedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const requestSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortKey) => {
    if (sortConfig?.key !== key) return <ChevronUp className="w-4 h-4 text-gray-300 inline" />;
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-blue-500 inline" /> 
      : <ChevronDown className="w-4 h-4 text-blue-500 inline" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header & Search */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h3 className="text-lg font-semibold text-gray-700">Клієнти в зоні ризику</h3>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Пошук за компанією чи ім'ям..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-64"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Скидаємо на першу сторінку при пошуку
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('company')}>
                Компанія {getSortIcon('company')}
              </th>
              <th className="p-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('plan')}>
                Тариф {getSortIcon('plan')}
              </th>
              <th className="p-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('mrr')}>
                MRR {getSortIcon('mrr')}
              </th>
              <th className="p-4 cursor-pointer hover:bg-gray-100" onClick={() => requestSort('churnProbability')}>
                Ймовірність відтоку {getSortIcon('churnProbability')}
              </th>
              <th className="p-4">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.map((customer) => (
              <tr 
                key={customer.id} 
                onClick={() => navigate(`/customer/${customer.id}`)}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                <td className="p-4">
                  <div className="font-medium text-gray-800">{customer.company}</div>
                  <div className="text-sm text-gray-500">{customer.name}</div>
                </td>
                <td className="p-4 text-gray-600">{customer.plan}</td>
                <td className="p-4 font-medium text-gray-700">${customer.mrr}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-[100px]">
                      <div 
                        className={`h-2.5 rounded-full ${customer.churnProbability > 70 ? 'bg-red-500' : customer.churnProbability > 30 ? 'bg-yellow-400' : 'bg-green-500'}`} 
                        style={{ width: `${customer.churnProbability}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{customer.churnProbability}%</span>
                  </div>
                </td>
                <td className="p-4">
                  {customer.churnProbability > 70 ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <AlertTriangle className="w-3 h-3" /> В ризику
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Активний
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Показано {paginatedData.length} з {processedData.length} записів
        </span>
        <div className="flex gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Попередня
          </button>
          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Наступна
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChurnTable;