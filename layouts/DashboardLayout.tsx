
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { IconMenu, IconX, IconHome, IconBookOpen, IconUsers, IconLogOut, IconBarChart2, IconFileText } from '../components/icons';

const DashboardLayout: React.FC = () => {
  const { user, logout, isAdmin, isFaculty, isStudent } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getMenuItems = () => {
    const baseItems = [{ name: 'Dashboard', href: '/dashboard', icon: IconHome }];
    if (isAdmin) {
      return [
        ...baseItems,
        { name: 'Usuarios', href: '/dashboard/users', icon: IconUsers },
        { name: 'Programas', href: '/dashboard/programs', icon: IconBookOpen },
      ];
    }
    if (isFaculty) {
      return [
        ...baseItems,
        { name: 'Mis Cursos', href: '/dashboard/courses', icon: IconBookOpen },
        { name: 'Calificaciones', href: '/dashboard/grades', icon: IconBarChart2 },
      ];
    }
    if (isStudent) {
      return [
        ...baseItems,
        { name: 'Mis Notas', href: '/dashboard/grades', icon: IconBarChart2 },
        { name: 'Horario', href: '/dashboard/schedule', icon: IconFileText },
      ];
    }
    return baseItems;
  };
  
  const menuItems = getMenuItems();

  const SidebarContent = () => (
     <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white">UniversidadGlobal</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
            <NavLink
                key={item.name}
                to={item.href}
                end
                className={({ isActive }) =>
                `flex items-center px-4 py-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200 ${
                    isActive ? 'bg-gray-700 text-white' : ''
                }`
                }
            >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
            </NavLink>
            ))}
        </nav>
        <div className="px-4 py-4 border-t border-gray-700">
            <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200">
                <IconLogOut className="w-5 h-5 mr-3" />
                Cerrar Sesión
            </button>
        </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Static sidebar for desktop */}
      <aside className="hidden md:flex flex-shrink-0 w-64 bg-gray-800">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <aside className="w-64 bg-gray-800">
            <SidebarContent />
        </aside>
        <div className="flex-1" onClick={() => setSidebarOpen(false)}></div>
      </div>


      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between md:justify-end h-16 px-6 bg-white border-b">
          <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <IconX/> : <IconMenu />}
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Bienvenido, {user?.name}</span>
            <img src={user?.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
