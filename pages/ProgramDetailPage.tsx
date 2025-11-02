
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Program } from '../types';
import { IconClock, IconFileText, IconUsers } from '../components/icons';

const ProgramDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [program, setProgram] = useState<Program | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgram = async () => {
            if (id) {
                const data = await api.getProgramById(id);
                setProgram(data || null);
            }
            setLoading(false);
        };
        fetchProgram();
    }, [id]);

    if (loading) {
        return <div className="text-center py-20">Cargando...</div>;
    }

    if (!program) {
        return <div className="text-center py-20">Programa no encontrado.</div>;
    }

    return (
        <div className="bg-white">
            <div className="container mx-auto px-6 py-16">
                <div className="lg:flex">
                    <div className="lg:w-2/3 lg:pr-12">
                        <span className="text-brand-blue font-semibold">{program.type}</span>
                        <h1 className="text-4xl font-bold text-gray-800 mt-2 mb-6">{program.title}</h1>
                        <p className="text-lg text-gray-600 leading-relaxed">{program.description}</p>
                        
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Plan de Estudios</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside text-gray-600">
                                {program.curriculum.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="lg:w-1/3 mt-12 lg:mt-0">
                        <div className="bg-brand-gray p-8 rounded-lg">
                            <h3 className="text-xl font-bold mb-6">Detalles del Programa</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <IconClock className="w-6 h-6 mr-4 text-brand-blue"/>
                                    <div>
                                        <p className="font-semibold">Duración</p>
                                        <p className="text-gray-600">{program.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <IconUsers className="w-6 h-6 mr-4 text-brand-blue mt-1"/>
                                    <div>
                                        <p className="font-semibold">Docentes Asociados</p>
                                        <p className="text-gray-600">{program.faculty.join(', ')}</p>
                                    </div>
                                </div>
                            </div>
                            <button className="mt-8 w-full bg-brand-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-blue-dark transition-colors">
                                Inscripción en Línea
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramDetailPage;
