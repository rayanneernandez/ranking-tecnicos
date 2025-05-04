import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Components
import Layout from './components/Layout/Layout';

// Pages
import DashboardPage from './pages/DashboardPage';
import TechniciansListPage from './pages/TechniciansListPage';
import TechnicianDetailPage from './pages/TechnicianDetailPage';
import AddTechnicianPage from './pages/AddTechnicianPage';
import EditTechnicianPage from './pages/EditTechnicianPage';
import AddServiceRecordPage from './pages/AddServiceRecordPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="technicians" element={<TechniciansListPage />} />
            <Route path="technicians/:id" element={<TechnicianDetailPage />} />
            <Route path="technicians/new" element={<AddTechnicianPage />} />
            <Route path="technicians/:id/edit" element={<EditTechnicianPage />} />
            <Route path="add-record" element={<AddServiceRecordPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;