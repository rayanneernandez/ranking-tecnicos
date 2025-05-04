import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Star, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const TechnicianRankTable: React.FC = () => {
  const { getRankedTechnicians, sortBy, updateSearchQuery, searchQuery } = useAppContext();
  
  const rankedTechnicians = getRankedTechnicians();
  
  const formatMinutes = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes.toFixed(0)} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };
  
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        <span className="mr-1 font-semibold">{rating.toFixed(1)}</span>
        <div className="flex text-yellow-400">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={`full-${i}`} className="h-4 w-4 fill-current" />
          ))}
          {hasHalfStar && (
            <div className="relative">
              <Star className="h-4 w-4 text-gray-300" />
              <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                <Star className="h-4 w-4 fill-current text-yellow-400" />
              </div>
            </div>
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
          ))}
        </div>
      </div>
    );
  };
  
  const getHeaderClassName = (metric: typeof sortBy) => {
    return `px-4 py-2 text-left ${sortBy === metric ? 'text-blue-400 font-bold' : ''}`;
  };
  
  const getMetricCellClassName = (metric: typeof sortBy) => {
    return `px-4 py-2 ${sortBy === metric ? 'font-bold bg-gray-800' : ''}`;
  };
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">Ranking de Técnicos</h2>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              placeholder="Buscar técnicos..."
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Posição
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Técnico
              </th>
              <th className={`${getHeaderClassName('totalCalls')} text-xs font-medium text-gray-400 uppercase tracking-wider`}>
                Total de Atendimentos
              </th>
              <th className={`${getHeaderClassName('avgServiceTime')} text-xs font-medium text-gray-400 uppercase tracking-wider`}>
                Tempo Médio
              </th>
              <th className={`${getHeaderClassName('firstResponseTime')} text-xs font-medium text-gray-400 uppercase tracking-wider`}>
                Primeira Resposta
              </th>
              <th className={`${getHeaderClassName('rating')} text-xs font-medium text-gray-400 uppercase tracking-wider`}>
                Avaliação
              </th>
              <th className="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {rankedTechnicians.length > 0 ? (
              rankedTechnicians.map((technician, index) => (
                <tr key={technician.id} className="hover:bg-gray-700 transition-colors duration-150">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className={`
                      flex items-center justify-center w-8 h-8 rounded-full 
                      ${index === 0 ? 'bg-yellow-900 text-yellow-200' : 
                        index === 1 ? 'bg-gray-700 text-gray-200' : 
                        index === 2 ? 'bg-amber-900 text-amber-200' : 'bg-blue-900 text-blue-200'}
                    `}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-white">{technician.name}</div>
                  </td>
                  <td className={getMetricCellClassName('totalCalls')}>{technician.totalCalls}</td>
                  <td className={getMetricCellClassName('avgServiceTime')}>{formatMinutes(technician.avgServiceTime)}</td>
                  <td className={getMetricCellClassName('firstResponseTime')}>{formatMinutes(technician.firstResponseTime)}</td>
                  <td className={getMetricCellClassName('rating')}>{renderRating(technician.rating)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Link 
                      to={`/technicians/${technician.id}`}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      Detalhes
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-400">
                  {searchQuery ? 'Nenhum técnico encontrado com esses critérios.' : 'Nenhum técnico com dados disponíveis.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechnicianRankTable;