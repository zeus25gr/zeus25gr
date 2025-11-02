
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { api } from '../../../services/api';
import { Student as StudentType, Course, Grade } from '../../../types';
import { MOCK_COURSES, MOCK_USERS } from '../../../constants';
import { IconBarChart2, IconFileText, IconDownload } from '../../../components/icons';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const student = MOCK_USERS.find(u => u.id === user?.id) as StudentType;
    const courses = MOCK_COURSES;
    
    const getCourseName = (id: string) => courses.find(c => c.id === id)?.name || 'Curso Desconocido';
    const scheduleDays = Object.keys(student.schedule);

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Portal del Estudiante</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Grades Section */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold flex items-center mb-4"><IconBarChart2 className="mr-3" />Mis Calificaciones</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3">Materia</th>
                                    <th className="p-3">Periodo</th>
                                    <th className="p-3">Nota Final</th>
                                </tr>
                            </thead>
                            <tbody>
                                {student.grades.map((grade, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-3 font-medium">{getCourseName(grade.courseId)}</td>
                                        <td className="p-3 text-gray-600">{grade.period}</td>
                                        <td className="p-3 font-bold">{grade.grade}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Schedule & Actions */}
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold flex items-center mb-4"><IconFileText className="mr-3"/>Mi Horario</h2>
                        <div className="space-y-4">
                            {scheduleDays.map(day => (
                                <div key={day}>
                                    <h3 className="font-semibold">{day}</h3>
                                    <ul className="pl-4 text-gray-600">
                                        {student.schedule[day].map((item, i) => (
                                             <li key={i} className="text-sm">{item.time} - {getCourseName(item.courseId)}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Certificados</h2>
                        <button className="w-full flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                            <IconDownload className="w-5 h-5 mr-2" />
                            Descargar Certificado de Estudios
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
