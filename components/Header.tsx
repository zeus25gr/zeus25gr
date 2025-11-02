import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IconMenu, IconX, IconLogIn, IconUser } from './icons';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Programas Académicos', path: '/programas' },
    { name: 'Programas Virtuales', path: '/programas-virtuales' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const activeLinkClass = "text-brand-blue font-semibold";
  const inactiveLinkClass = "text-gray-600 hover:text-brand-blue transition-colors";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-brand-blue">
            UniversidadGlobal
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => (isActive ? activeLinkClass : inactiveLinkClass)}
              >
                {link.name}
              </NavLink>
            ))}
            {isAuthenticated ? (
                 <NavLink to="/dashboard" className="flex items-center px-4 py-2 bg-brand-blue text-white rounded-full hover:bg-brand-blue-dark transition-colors">
                    <IconUser className="w-4 h-4 mr-2" />
                    Mi Portal
                </NavLink>
            ) : (
                <NavLink to="/login" className="flex items-center px-4 py-2 bg-brand-blue text-white rounded-full hover:bg-brand-blue-dark transition-colors">
                    <IconLogIn className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                </NavLink>
            )}
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              {isOpen ? <IconX size={24} /> : <IconMenu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `py-2 text-center ${isActive ? activeLinkClass : inactiveLinkClass}`}
                >
                  {link.name}
                </NavLink>
              ))}
              {isAuthenticated ? (
                 <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center justify-center px-4 py-2 bg-brand-blue text-white rounded-full hover:bg-brand-blue-dark transition-colors">
                    <IconUser className="w-4 h-4 mr-2" />
                    Mi Portal
                </NavLink>
            ) : (
                <NavLink to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center px-4 py-2 bg-brand-blue text-white rounded-full hover:bg-brand-blue-dark transition-colors">
                    <IconLogIn className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                </NavLink>
            )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;