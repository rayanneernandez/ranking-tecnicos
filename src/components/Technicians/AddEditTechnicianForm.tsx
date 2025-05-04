import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Technician } from '../../types';
import { User, Save, X } from 'lucide-react';

interface AddEditTechnicianFormProps {
  technician?: Technician;
  isEdit?: boolean;
}

const AddEditTechnicianForm: React.FC<AddEditTechnicianFormProps> = ({ 
  technician,
  isEdit = false
}) => {
  const navigate = useNavigate();
  const { addTechnician, updateTechnician } = useAppContext();
  
  const [name, setName] = useState('');
  
  useEffect(() => {
    if (isEdit && technician) {
      setName(technician.name);
    }
  }, [isEdit, technician]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() === '') {
      alert('Please enter a technician name');
      return;
    }
    
    if (isEdit && technician) {
      updateTechnician({
        ...technician,
        name
      });
      navigate(`/technicians/${technician.id}`);
    } else {
      addTechnician({
        name,
        totalCalls: 0,
        avgServiceTime: 0,
        firstResponseTime: 0,
        rating: 0
      });
      navigate('/technicians');
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <User className="h-6 w-6 text-blue-600 mr-2" />
          {isEdit ? 'Edit Technician' : 'Add New Technician'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 sm:p-6">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Technician Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter technician name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="h-4 w-4 mr-1" />
            {isEdit ? 'Update' : 'Save'} Technician
          </button>
        </div>
      </form>
      
      {isEdit && (
        <div className="px-4 sm:px-6 py-3 bg-gray-50 text-xs text-gray-500">
          Note: Metrics data (calls, times, ratings) is calculated automatically from service records.
        </div>
      )}
    </div>
  );
};

export default AddEditTechnicianForm;