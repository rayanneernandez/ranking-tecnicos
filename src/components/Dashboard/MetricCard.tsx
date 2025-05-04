import React from 'react';
import { Trophy, Clock, Star, BarChart2 } from 'lucide-react';

type MetricType = 'totalCalls' | 'avgServiceTime' | 'firstResponseTime' | 'rating';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: 'totalCalls' | 'avgServiceTime' | 'firstResponseTime' | 'rating';
  type: MetricType;
  isSelected: boolean;
  onClick: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  type,
  isSelected,
  onClick 
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'totalCalls':
        return <BarChart2 className="w-6 h-6" />;
      case 'avgServiceTime':
      case 'firstResponseTime':
        return <Clock className="w-6 h-6" />;
      case 'rating':
        return <Star className="w-6 h-6" />;
      default:
        return <Trophy className="w-6 h-6" />;
    }
  };
  
  const getBgColor = () => {
    if (isSelected) {
      return 'bg-blue-900 text-white';
    }
    
    switch (type) {
      case 'totalCalls':
        return 'bg-gray-800 text-blue-200';
      case 'avgServiceTime':
        return 'bg-gray-800 text-emerald-200';
      case 'firstResponseTime':
        return 'bg-gray-800 text-amber-200';
      case 'rating':
        return 'bg-gray-800 text-purple-200';
      default:
        return 'bg-gray-800 text-gray-200';
    }
  };
  
  const getIconBgColor = () => {
    if (isSelected) {
      return 'bg-blue-800';
    }
    
    switch (type) {
      case 'totalCalls':
        return 'bg-gray-700';
      case 'avgServiceTime':
        return 'bg-gray-700';
      case 'firstResponseTime':
        return 'bg-gray-700';
      case 'rating':
        return 'bg-gray-700';
      default:
        return 'bg-gray-700';
    }
  };
  
  return (
    <div 
      className={`rounded-lg shadow-md p-4 transition-all duration-200 transform hover:scale-105 cursor-pointer ${getBgColor()}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{title}</h3>
        <div className={`p-2 rounded-full ${getIconBgColor()}`}>
          {getIcon()}
        </div>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs uppercase font-semibold mt-2 opacity-80">Clique para ordenar por esta métrica</p>
    </div>
  );
};

export default MetricCard;