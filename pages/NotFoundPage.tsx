
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
            <h1 className="text-9xl font-extrabold text-brand-blue">404</h1>
            <h2 className="text-3xl font-bold text-gray-800 mt-4">Página no encontrada</h2>
            <p className="text-gray-600 mt-2">Lo sentimos, la página que estás buscando no existe.</p>
            <Link 
                to="/" 
                className="mt-8 px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue-dark transition-colors"
            >
                Volver al Inicio
            </Link>
        </div>
    );
};

export default NotFoundPage;
