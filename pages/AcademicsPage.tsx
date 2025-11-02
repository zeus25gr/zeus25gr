
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { api } from '../services/api';
import { Program } from '../types';
import { IconBookOpen } from '../components/icons';

const AcademicsPage: React.FC = () => {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [activeFilter, setActiveFilter] = useState<'Todos' | Program['type']>('Todos');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPrograms = async () => {
            setPrograms(await api.getPrograms());
        };
        fetchPrograms();
    }, []);

    const handleCardClick = (id: string) => {
        navigate(`/programas/${id}`);
    };

    const programTypes: ('Todos' | Program['type'])[] = ['Todos', 'Pregrado', 'Posgrado', 'Diplomado', 'Virtual'];

    const filteredPrograms = useMemo(() => {
        if (activeFilter === 'Todos') {
            return programs;
        }
        return programs.filter(p => p.type === activeFilter);
    }, [programs, activeFilter]);

    return (
        <div className="bg-brand-gray min-h-screen">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">Oferta Académica</h1>
                <p className="text-center text-gray-600 mb-8">Descubre el programa ideal para tu futuro profesional.</p>
                
                <div className="flex justify-center flex-wrap gap-2 mb-12">
                    {programTypes.map(type => (
                        <button
                            key={type}
                            onClick={() => setActiveFilter(type)}
                            className={`px-4 py-2 rounded-full font-medium transition-colors text-sm md:text-base ${
                                activeFilter === type
                                    ? 'bg-brand-blue text-white shadow'
                                    : 'bg-white text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPrograms.map((program) => (
                        <Card key={program.id} onClick={() => handleCardClick(program.id)}>
                            <div className="p-6">
                                <div className="flex items-center text-brand-blue mb-4">
                                    <IconBookOpen className="w-6 h-6 mr-3"/>
                                    <span className="font-semibold">{program.type}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">{program.title}</h2>
                                <p className="text-gray-600 mb-4 h-24 overflow-hidden text-ellipsis">{program.description}</p>
                                <span className="text-brand-blue font-semibold hover:underline">
                                    Conoce más
                                </span>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AcademicsPage;