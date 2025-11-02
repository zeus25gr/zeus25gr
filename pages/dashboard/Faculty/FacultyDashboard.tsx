
import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { Faculty as FacultyType, Course } from '../../../types';
import { MOCK_USERS, MOCK_COURSES } from '../../../constants';
import { IconBookOpen, IconPlusCircle } from '../../../components/icons';

const FacultyDashboard: React.FC = () => {
    const { user } = useAuth();
    const faculty = MOCK_USERS.find(u => u.id === user?.id) as FacultyType;

    const getTaughtCourses = (): Course[] => {
        return MOCK_COURSES.filter(course => faculty.coursesTaught.includes(course.id));
    };
    
    const taughtCourses = getTaughtCourses();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Portal del Docente</h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center"><IconBookOpen className="mr-3" />Mis Cursos Asignados</h2>
                    <button className="flex items-center bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue-dark">
                        <IconPlusCircle className="w-5 h-5 mr-2" />
                        Subir Material
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3">Código</th>
                                <th className="p-3">Nombre del Curso</th>
                                <th className="p-3">Créditos</th>
                                <th className="p-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taughtCourses.map((course) => (
                                <tr key={course.id} className="border-b">
                                    <td className="p-3 font-mono">{course.code}</td>
                                    <td className="p-3 font-medium">{course.name}</td>
                                    <td className="p-3">{course.credits}</td>
                                    <td className="p-3">
                                        <Link to={`/dashboard/grades/${course.id}`} className="text-brand-blue hover:underline font-semibold">
                                            Registrar Notas
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FacultyDashboard;