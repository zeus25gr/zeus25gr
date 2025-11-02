
import React from 'react';
import { Link } from 'react-router-dom';
import { IconMail, IconMapPin, IconPhone } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">UniversidadGlobal</h3>
            <p className="text-gray-400">
              Formando líderes para un futuro mejor. Misión, visión y valores al servicio de la sociedad.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/programas" className="text-gray-400 hover:text-white">Programas</Link></li>
              <li><Link to="/contacto" className="text-gray-400 hover:text-white">Contacto</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-white">Portal Estudiantil</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <IconMapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <span>Av. Siempre Viva 123, Ciudad Capital</span>
              </li>
              <li className="flex items-center">
                <IconPhone className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center">
                <IconMail className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>info@universidadglobal.edu</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            {/* Add social media icons here */}
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} UniversidadGlobal. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
