import React from 'react';
import { Link } from 'react-router-dom';
import AddEditTechnicianForm from '../components/Technicians/AddEditTechnicianForm';
import { ArrowLeft } from 'lucide-react';

const AddTechnicianPage: React.FC = () => {
  return (
    <div>
      <div className="mb-6 flex items-center">
        <Link 
          to="/technicians"
          className="mr-4 text-gray-500 hover:text-blue-600 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Add New Technician</h1>
      </div>
      
      <AddEditTechnicianForm />
    </div>
  );
};

export default AddTechnicianPage;