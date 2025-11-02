import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { api } from '../services/api';
import { Program } from '../types';
import { IconBookOpen, IconClock, IconUsers } from '../components/icons';

const VirtualProgramsPage: React.FC = () => {
    const [virtualPrograms, setVirtualPrograms] = useState<Program[]>([]);
    const [activeArea, setActiveArea] = useState<string>('Todos');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const allPrograms = await api.getPrograms();
                const filtered = allPrograms.filter(p => p.type === 'Virtual');
                setVirtualPrograms(filtered);
            } catch (error) {
                console.error("Error fetching programs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrograms();
    }, []);

    const areas = useMemo(() => {
        const uniqueAreas = new Set(virtualPrograms.map(p => p.area));
        return ['Todos', ...Array.from(uniqueAreas)];
    }, [virtualPrograms]);

    const filteredPrograms = useMemo(() => {
        if (activeArea === 'Todos') {
            return virtualPrograms;
        }
        return virtualPrograms.filter(p => p.area === activeArea);
    }, [virtualPrograms, activeArea]);

    return (
        <div className="bg-brand-gray min-h-screen">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">Programas Virtuales</h1>
                <p className="text-center text-gray-600 mb-8">Aprende desde cualquier lugar con nuestra oferta académica 100% online.</p>

                {/* Filters */}
                <div className="flex justify-center flex-wrap gap-2 mb-12">
                    {areas.map(area => (
                        <button
                            key={area}
                            onClick={() => setActiveArea(area)}
                            className={`px-4 py-2 rounded-full font-medium transition-colors text-sm md:text-base ${
                                activeArea === area
                                    ? 'bg-brand-blue text-white shadow'
                                    : 'bg-white text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {area}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="text-center text-gray-500 py-10">Cargando programas...</div>
                ) : filteredPrograms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                        {filteredPrograms.map((program) => (
                           <Card key={program.id} className="flex flex-col">
                                <div className="p-6 flex-grow">
                                    <div className="flex items-center text-brand-blue mb-4">
                                        <IconBookOpen className="w-5 h-5 mr-2"/>
                                        <span className="font-semibold text-sm">{program.area}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-3 min-h-[56px]">{program.title}</h2>
                                    <p className="text-gray-600 text-sm mb-4 min-h-[80px]">{program.description}</p>
                                </div>
                                <div className="p-6 bg-gray-50 border-t">
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center text-sm text-gray-700">
                                            <IconClock className="w-4 h-4 mr-2 text-brand-blue" />
                                            <span><strong>Duración:</strong> {program.duration}</span>
                                        </div>
                                        <div className="flex items-start text-sm text-gray-700">
                                            <IconUsers className="w-4 h-4 mr-2 text-brand-blue mt-1 shrink-0" />
                                            <span><strong>Docentes:</strong> {program.faculty.join(', ')}</span>
                                        </div>
                                    </div>
                                    <Link to={`/programas/${program.id}`} className="block text-center w-full bg-brand-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-blue-dark transition-colors">
                                        Ver Detalles
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                     <div className="text-center text-gray-500 py-10">
                        <p>No se encontraron programas que coincidan con el filtro seleccionado.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VirtualProgramsPage;
