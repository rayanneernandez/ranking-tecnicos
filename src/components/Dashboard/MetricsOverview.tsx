import React from 'react';
import { useAppContext } from '../../context/AppContext';
import MetricCard from './MetricCard';

const MetricsOverview: React.FC = () => {
  const { technicians, sortBy, updateSortMetric } = useAppContext();
  
  // Calculate overall metrics
  const calculateOverallMetrics = () => {
    if (technicians.length === 0) {
      return {
        totalCalls: 0,
        avgServiceTime: 0,
        firstResponseTime: 0,
        rating: 0,
      };
    }
    
    const totalCalls = technicians.reduce((sum, tech) => sum + tech.totalCalls, 0);
    
    // Only include technicians with calls in averages
    const activeTechs = technicians.filter(tech => tech.totalCalls > 0);
    const techCount = activeTechs.length || 1; // Avoid division by zero
    
    const avgServiceTime = activeTechs.reduce((sum, tech) => sum + tech.avgServiceTime, 0) / techCount;
    const avgFirstResponseTime = activeTechs.reduce((sum, tech) => sum + tech.firstResponseTime, 0) / techCount;
    const avgRating = activeTechs.reduce((sum, tech) => sum + tech.rating, 0) / techCount;
    
    return {
      totalCalls,
      avgServiceTime,
      firstResponseTime: avgFirstResponseTime,
      rating: avgRating,
    };
  };
  
  const metrics = calculateOverallMetrics();
  
  const formatMinutes = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes.toFixed(0)} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        title="Total de Atendimentos"
        value={metrics.totalCalls.toString()}
        icon="totalCalls"
        type="totalCalls"
        isSelected={sortBy === 'totalCalls'}
        onClick={() => updateSortMetric('totalCalls')}
      />
      <MetricCard
        title="Tempo Médio de Serviço"
        value={formatMinutes(metrics.avgServiceTime)}
        icon="avgServiceTime"
        type="avgServiceTime"
        isSelected={sortBy === 'avgServiceTime'}
        onClick={() => updateSortMetric('avgServiceTime')}
      />
      <MetricCard
        title="Primeira Resposta"
        value={formatMinutes(metrics.firstResponseTime)}
        icon="firstResponseTime"
        type="firstResponseTime"
        isSelected={sortBy === 'firstResponseTime'}
        onClick={() => updateSortMetric('firstResponseTime')}
      />
      <MetricCard
        title="Avaliação Média"
        value={metrics.rating.toFixed(1)}
        icon="rating"
        type="rating"
        isSelected={sortBy === 'rating'}
        onClick={() => updateSortMetric('rating')}
      />
    </div>
  );
};

export default MetricsOverview;