import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AppState, DateRange, ServiceRecord, SortMetric, Technician } from '../types';
import { initialTechnicians, initialServiceRecords } from '../data/initialData';
import { v4 as uuidv4 } from 'uuid';

interface AppContextType extends AppState {
  addTechnician: (technician: Omit<Technician, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTechnician: (technician: Technician) => void;
  deleteTechnician: (id: string) => void;
  addServiceRecord: (record: Omit<ServiceRecord, 'id'>) => void;
  updateDateRange: (range: DateRange | null) => void;
  updateSortMetric: (metric: SortMetric) => void;
  updateSearchQuery: (query: string) => void;
  getRankedTechnicians: () => Technician[];
  calculateMetrics: (technicianId: string) => {
    totalCalls: number;
    avgServiceTime: number;
    firstResponseTime: number;
    rating: number;
  };
}

const defaultContextValue: AppContextType = {
  technicians: [],
  serviceRecords: [],
  dateRange: null,
  sortBy: 'totalCalls',
  searchQuery: '',
  addTechnician: () => {},
  updateTechnician: () => {},
  deleteTechnician: () => {},
  addServiceRecord: () => {},
  updateDateRange: () => {},
  updateSortMetric: () => {},
  updateSearchQuery: () => {},
  getRankedTechnicians: () => [],
  calculateMetrics: () => ({ totalCalls: 0, avgServiceTime: 0, firstResponseTime: 0, rating: 0 }),
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Get data from localStorage if available, otherwise use initial data
  const [technicians, setTechnicians] = useState<Technician[]>(() => {
    const saved = localStorage.getItem('technicians');
    return saved ? JSON.parse(saved) : initialTechnicians;
  });
  
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>(() => {
    const saved = localStorage.getItem('serviceRecords');
    return saved ? JSON.parse(saved) : initialServiceRecords;
  });
  
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [sortBy, setSortBy] = useState<SortMetric>('totalCalls');
  const [searchQuery, setSearchQuery] = useState('');

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('technicians', JSON.stringify(technicians));
  }, [technicians]);

  useEffect(() => {
    localStorage.setItem('serviceRecords', JSON.stringify(serviceRecords));
  }, [serviceRecords]);

  const addTechnician = (technicianData: Omit<Technician, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTechnician: Technician = {
      ...technicianData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTechnicians([...technicians, newTechnician]);
  };

  const updateTechnician = (updatedTechnician: Technician) => {
    setTechnicians(
      technicians.map((tech) => 
        tech.id === updatedTechnician.id 
          ? { ...updatedTechnician, updatedAt: new Date().toISOString() } 
          : tech
      )
    );
  };

  const deleteTechnician = (id: string) => {
    setTechnicians(technicians.filter((tech) => tech.id !== id));
    // Also remove all service records for this technician
    setServiceRecords(serviceRecords.filter((record) => record.technicianId !== id));
  };

  const addServiceRecord = (recordData: Omit<ServiceRecord, 'id'>) => {
    const newRecord: ServiceRecord = {
      ...recordData,
      id: uuidv4(),
    };
    setServiceRecords([...serviceRecords, newRecord]);
    
    // Update technician metrics based on this new record
    const tech = technicians.find(t => t.id === recordData.technicianId);
    if (tech) {
      const metrics = calculateMetrics(tech.id);
      updateTechnician({
        ...tech,
        totalCalls: metrics.totalCalls,
        avgServiceTime: metrics.avgServiceTime,
        firstResponseTime: metrics.firstResponseTime,
        rating: metrics.rating
      });
    }
  };

  const updateDateRange = (range: DateRange | null) => {
    setDateRange(range);
  };

  const updateSortMetric = (metric: SortMetric) => {
    setSortBy(metric);
  };

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const calculateMetrics = (technicianId: string) => {
    // Filter records by date range if specified
    let filteredRecords = serviceRecords.filter(
      (record) => record.technicianId === technicianId
    );
    
    if (dateRange) {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      
      filteredRecords = filteredRecords.filter((record) => {
        const recordDate = new Date(record.date);
        return recordDate >= startDate && recordDate <= endDate;
      });
    }
    
    const totalCalls = filteredRecords.length;
    
    // Calculate average metrics
    const avgServiceTime = totalCalls === 0
      ? 0
      : filteredRecords.reduce((sum, record) => sum + record.serviceTime, 0) / totalCalls;
      
    const avgFirstResponseTime = totalCalls === 0
      ? 0
      : filteredRecords.reduce((sum, record) => sum + record.firstResponseTime, 0) / totalCalls;
      
    const avgRating = totalCalls === 0
      ? 0
      : filteredRecords.reduce((sum, record) => sum + record.rating, 0) / totalCalls;
      
    return {
      totalCalls,
      avgServiceTime,
      firstResponseTime: avgFirstResponseTime,
      rating: avgRating,
    };
  };

  const getRankedTechnicians = () => {
    // Update all technician metrics first
    const updatedTechnicians = technicians.map(tech => {
      const metrics = calculateMetrics(tech.id);
      return {
        ...tech,
        totalCalls: metrics.totalCalls,
        avgServiceTime: metrics.avgServiceTime,
        firstResponseTime: metrics.firstResponseTime,
        rating: metrics.rating,
      };
    });

    // Filter by search query if provided
    let filteredTechnicians = updatedTechnicians;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredTechnicians = filteredTechnicians.filter(tech => 
        tech.name.toLowerCase().includes(query)
      );
    }

    // Sort based on the selected metric
    return [...filteredTechnicians].sort((a, b) => {
      if (sortBy === 'totalCalls') {
        return b.totalCalls - a.totalCalls;
      } else if (sortBy === 'avgServiceTime') {
        // Lower service time is better
        return a.avgServiceTime - b.avgServiceTime;
      } else if (sortBy === 'firstResponseTime') {
        // Lower response time is better
        return a.firstResponseTime - b.firstResponseTime;
      } else {
        // Higher rating is better
        return b.rating - a.rating;
      }
    });
  };

  const contextValue: AppContextType = {
    technicians,
    serviceRecords,
    dateRange,
    sortBy,
    searchQuery,
    addTechnician,
    updateTechnician,
    deleteTechnician,
    addServiceRecord,
    updateDateRange,
    updateSortMetric,
    updateSearchQuery,
    getRankedTechnicians,
    calculateMetrics,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};