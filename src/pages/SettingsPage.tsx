import React from 'react';
import { useState } from 'react';
import { Download, Upload, Trash2, Save } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SettingsPage: React.FC = () => {
  const { technicians, serviceRecords } = useAppContext();
  const [exportSuccess, setExportSuccess] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importError, setImportError] = useState('');
  
  const handleExportData = () => {
    const data = {
      technicians,
      serviceRecords,
      exportDate: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `technician-rankings-export-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };
  
  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImportError('');
    setImportSuccess(false);
    
    const fileReader = new FileReader();
    const file = event.target.files && event.target.files[0];
    
    if (!file) {
      return;
    }
    
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = e => {
      try {
        if (e.target?.result) {
          const content = e.target.result as string;
          const parsedData = JSON.parse(content);
          
          // Validate data structure
          if (!parsedData.technicians || !Array.isArray(parsedData.technicians) ||
              !parsedData.serviceRecords || !Array.isArray(parsedData.serviceRecords)) {
            setImportError('Invalid file format. The file must contain technicians and serviceRecords arrays.');
            return;
          }
          
          // Save to localStorage
          localStorage.setItem('technicians', JSON.stringify(parsedData.technicians));
          localStorage.setItem('serviceRecords', JSON.stringify(parsedData.serviceRecords));
          
          setImportSuccess(true);
          setTimeout(() => {
            window.location.reload(); // Reload to apply the imported data
          }, 1500);
        }
      } catch (error) {
        console.error('Import error:', error);
        setImportError('Failed to parse the import file. Please ensure it is a valid JSON file.');
      }
    };
    fileReader.onerror = () => {
      setImportError('Error reading file');
    };
  };
  
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('technicians');
      localStorage.removeItem('serviceRecords');
      window.location.reload();
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Data Management</h2>
          <p className="text-gray-600">Export or import your technician data</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-2">Export Data</h3>
              <p className="text-sm text-gray-500 mb-4">
                Download all your technician and service record data as a JSON file.
              </p>
              <button
                onClick={handleExportData}
                className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </button>
              {exportSuccess && (
                <p className="mt-2 text-sm text-green-600">Data exported successfully!</p>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-md font-medium text-gray-700 mb-2">Import Data</h3>
              <p className="text-sm text-gray-500 mb-4">
                Import technician and service record data from a JSON file.
                <br />
                <span className="text-amber-600">Warning: This will replace your current data.</span>
              </p>
              <div className="flex items-center">
                <label className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleImportData}
                  />
                </label>
              </div>
              {importSuccess && (
                <p className="mt-2 text-sm text-green-600">Data imported successfully! Reloading...</p>
              )}
              {importError && (
                <p className="mt-2 text-sm text-red-600">{importError}</p>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-md font-medium text-gray-700 mb-2">Clear All Data</h3>
              <p className="text-sm text-gray-500 mb-4">
                This will remove all technicians and service records.
                <br />
                <span className="text-red-600 font-semibold">Warning: This action cannot be undone.</span>
              </p>
              <button
                onClick={handleClearData}
                className="inline-flex items-center px-4 py-2 border border-red-600 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">About</h2>
        </div>
        
        <div className="p-6">
          <p className="text-gray-600 mb-2">
            Technician Ranking System - Version 1.0.0
          </p>
          <p className="text-gray-500 text-sm">
            A tool to track and rank technicians based on their performance metrics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;