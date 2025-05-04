import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Users, Plus, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <BarChart3 className="h-7 w-7 mr-2" />
            <h1 className="text-xl font-bold">Ranking de Técnicos</h1>
          </div>
          
          <nav className="flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center
                ${isActive('/') 
                  ? 'bg-blue-950 text-white' 
                  : 'text-blue-100 hover:bg-blue-800'}`}
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              <span>Dashboard</span>
            </Link>
            
            <Link 
              to="/technicians" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center
                ${isActive('/technicians') 
                  ? 'bg-blue-950 text-white' 
                  : 'text-blue-100 hover:bg-blue-800'}`}
            >
              <Users className="h-4 w-4 mr-1" />
              <span>Técnicos</span>
            </Link>
            
            <Link 
              to="/add-record" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center
                ${isActive('/add-record') 
                  ? 'bg-blue-950 text-white' 
                  : 'text-blue-100 hover:bg-blue-800'}`}
            >
              <Plus className="h-4 w-4 mr-1" />
              <span>Novo Registro</span>
            </Link>
            
            <Link 
              to="/settings" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center
                ${isActive('/settings') 
                  ? 'bg-blue-950 text-white' 
                  : 'text-blue-100 hover:bg-blue-800'}`}
            >
              <Settings className="h-4 w-4 mr-1" />
              <span>Configurações</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;