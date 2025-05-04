import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, RefreshCw } from 'lucide-react';

interface DashboardHeaderProps {
  onRefresh: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onRefresh }) => {
  const { dateRange, updateDateRange } = useAppContext();
  
  const handleDateRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const today = new Date();
    
    let startDate = new Date();
    let endDate = new Date();
    
    if (value === 'all') {
      updateDateRange(null);
      return;
    } else if (value === 'today') {
      startDate = new Date(today.setHours(0, 0, 0, 0));
      endDate = new Date(today.setHours(23, 59, 59, 999));
    } else if (value === 'week') {
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 7);
    } else if (value === 'month') {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (value === 'year') {
      startDate = new Date(today.getFullYear(), 0, 1);
      endDate = new Date(today.getFullYear(), 11, 31);
    }
    
    updateDateRange({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  };
  
  return (
    <div className="mb-6 bg-gray-800 rounded-lg shadow-md p-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-white">Ranking de Técnicos</h1>
          <p className="text-gray-400">
            {dateRange ? (
              <>
                <Calendar className="inline-block w-4 h-4 mr-1" />
                {format(new Date(dateRange.startDate), "d 'de' MMMM 'de' yyyy", { locale: ptBR })} - {format(new Date(dateRange.endDate), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </>
            ) : (
              'Todo o Período'
            )}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative">
            <select
              className="appearance-none pl-3 pr-8 py-2 border border-gray-600 bg-gray-700 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              onChange={handleDateRangeChange}
              defaultValue="all"
            >
              <option value="all">Todo o Período</option>
              <option value="today">Hoje</option>
              <option value="week">Últimos 7 Dias</option>
              <option value="month">Este Mês</option>
              <option value="year">Este Ano</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            onClick={onRefresh}
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Atualizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;