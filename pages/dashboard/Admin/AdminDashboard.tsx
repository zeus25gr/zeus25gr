
import React, { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import { User, Program } from '../../../types';
import { IconUsers, IconBookOpen, IconPlusCircle } from '../../../components/icons';

const AdminDashboard: React.FC = () => {
    const [userCount, setUserCount] = useState(0);
    const [programCount, setProgramCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const users = await api.getUsers();
            const programs = await api.getPrograms();
            setUserCount(users.length);
            setProgramCount(programs.length);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <IconUsers className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-500">Usuarios Totales</p>
                        <p className="text-2xl font-bold">{userCount}</p>
                    </div>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-green-100 p-3 rounded-full">
                        <IconBookOpen className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="ml-4">
                        <p className="text-gray-500">Programas Activos</p>
                        <p className="text-2xl font-bold">{programCount}</p>
                    </div>
                </div>
            </div>

            {/* User Management Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Gestión de Usuarios</h2>
                    <button className="flex items-center bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue-dark">
                        <IconPlusCircle className="w-5 h-5 mr-2" />
                        Agregar Usuario
                    </button>
                </div>
                {/* A simplified user list would go here. A full component would be better for a real app. */}
                <p className="text-gray-600">Desde aquí puedes administrar los roles y accesos de estudiantes, docentes y administrativos.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
