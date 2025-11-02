import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import HomePage from './pages/HomePage';
import AcademicsPage from './pages/AcademicsPage';
import ProgramDetailPage from './pages/ProgramDetailPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/dashboard/Admin/AdminDashboard';
import StudentDashboard from './pages/dashboard/Student/StudentDashboard';
import FacultyDashboard from './pages/dashboard/Faculty/FacultyDashboard';
import ManageGradesPage from './pages/dashboard/Faculty/ManageGradesPage';
import NotFoundPage from './pages/NotFoundPage';
import VirtualProgramsPage from './pages/VirtualProgramsPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isAdmin, isFaculty, isStudent } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="programas" element={<AcademicsPage />} />
        <Route path="programas-virtuales" element={<VirtualProgramsPage />} />
        <Route path="programas/:id" element={<ProgramDetailPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>

      <Route path="/dashboard" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}>
        <Route index element={
          isAdmin ? <AdminDashboard /> :
          isFaculty ? <FacultyDashboard /> :
          isStudent ? <StudentDashboard /> :
          <Navigate to="/" />
        } />
        {/* Add more specific dashboard routes here */}
        {isFaculty && <Route path="grades/:courseId" element={<ManageGradesPage />} />}
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;