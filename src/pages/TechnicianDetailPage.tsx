import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { format } from 'date-fns';
import { Star, Clock, CheckCircle, Edit, ArrowLeft, Trash2 } from 'lucide-react';

const TechnicianDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { technicians, serviceRecords, dateRange, deleteTechnician } = useAppContext();
  
  const technician = useMemo(() => {
    return technicians.find(tech => tech.id === id);
  }, [technicians, id]);
  
  const technicianRecords = useMemo(() => {
    if (!id) return [];
    
    let filteredRecords = serviceRecords.filter(record => record.technicianId === id);
    
    if (dateRange) {
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      
      filteredRecords = filteredRecords.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= startDate && recordDate <= endDate;
      });
    }
    
    return filteredRecords.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [serviceRecords, id, dateRange]);
  
  if (!technician) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Technician Not Found</h2>
        <p className="text-gray-600 mb-4">The technician you're looking for doesn't exist.</p>
        <Link 
          to="/technicians"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Technicians
        </Link>
      </div>
    );
  }
  
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
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${technician.name}? This will also delete all their service records.`)) {
      deleteTechnician(technician.id);
      navigate('/technicians');
    }
  };
  
  return (
    <div>
      <div className="mb-6 flex items-center">
        <Link 
          to="/technicians"
          className="mr-4 text-gray-500 hover:text-blue-600 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Technician Details</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{technician.name}</h2>
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <Link
                to={`/technicians/${technician.id}/edit`}
                className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-3 py-1.5 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50 transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-medium text-blue-900">Total Calls</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{technician.totalCalls}</p>
              <p className="text-sm text-gray-500">{dateRange ? 'In selected period' : 'All time'}</p>
            </div>
            
            <div className="bg-emerald-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-emerald-600 mr-2" />
                <h3 className="font-medium text-emerald-900">Avg Service Time</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatMinutes(technician.avgServiceTime)}</p>
              <p className="text-sm text-gray-500">Per service call</p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-amber-600 mr-2" />
                <h3 className="font-medium text-amber-900">First Response</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatMinutes(technician.firstResponseTime)}</p>
              <p className="text-sm text-gray-500">Average response time</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Star className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="font-medium text-purple-900">Rating</h3>
              </div>
              <div className="text-2xl font-bold text-gray-900">{renderRating(technician.rating)}</div>
              <p className="text-sm text-gray-500">Average customer rating</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Records</h3>
          
          {technicianRecords.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Response</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {technicianRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {format(new Date(record.date), 'MMM d, yyyy')}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatMinutes(record.serviceTime)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {formatMinutes(record.firstResponseTime)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {renderRating(record.rating)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">
                        {record.notes || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-500 mb-4">No service records found for this technician.</p>
              <Link
                to="/add-record"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Service Record
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicianDetailPage;