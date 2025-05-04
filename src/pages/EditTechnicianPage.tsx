import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import AddEditTechnicianForm from '../components/Technicians/AddEditTechnicianForm';
import { ArrowLeft } from 'lucide-react';

const EditTechnicianPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { technicians } = useAppContext();
  
  const technician = useMemo(() => {
    return technicians.find(tech => tech.id === id);
  }, [technicians, id]);
  
  if (!technician) {
    return <Navigate to="/technicians" />;
  }
  
  return (
    <div>
      <div className="mb-6 flex items-center">
        <Link 
          to={`/technicians/${id}`}
          className="mr-4 text-gray-500 hover:text-blue-600 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Edit Technician</h1>
      </div>
      
      <AddEditTechnicianForm technician={technician} isEdit />
    </div>
  );
};

export default EditTechnicianPage;