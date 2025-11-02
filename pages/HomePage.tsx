import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { api } from '../services/api';
import { NewsArticle, Program } from '../types';
import { IconCalendar, IconBookOpen, IconUser, IconBriefcase, IconUsers } from '../components/icons';

const HomePage: React.FC = () => {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [programs, setPrograms] = useState<Program[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setNews(await api.getNews());
            setPrograms(await api.getPrograms());
        };
        fetchData();
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <section className="relative bg-brand-blue text-white h-[60vh] flex items-center justify-center text-center">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{backgroundImage: "url('https://picsum.photos/seed/hero/1600/900')"}}
                ></div>
                <div className="relative z-10 p-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Bienvenido a UniversidadGlobal</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto">
                        Comprometidos con la excelencia académica y la formación de líderes del mañana.
                    </p>
                    <Link to="/programas" className="mt-8 inline-block bg-white text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors duration-300">
                        Explora Nuestros Programas
                    </Link>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Nuestra Institución</h2>
                    <p className="max-w-4xl mx-auto text-gray-600">
                        En UniversidadGlobal, nuestra misión es proveer una educación de calidad que inspire a los estudiantes a alcanzar su máximo potencial. Con una visión orientada a la innovación y la investigación, buscamos impactar positivamente en la sociedad.
                    </p>
                </div>
            </section>
            
            {/* Portals Access Section */}
            <section className="py-20">
                 <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Accesos a Portales</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <Link to="/login">
                             <Card className="p-8 h-full">
                                <IconUser className="w-12 h-12 text-brand-blue mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Portal Estudiantil</h3>
                                <p className="text-gray-600">Consulta tus notas, horario y certificados.</p>
                            </Card>
                        </Link>
                        <Link to="/login">
                            <Card className="p-8 h-full ring-2 ring-brand-blue shadow-brand-blue/20">
                                <IconBriefcase className="w-12 h-12 text-brand-blue mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Portal Docentes</h3>
                                <p className="text-gray-600">Gestiona tus cursos, registra notas y sube material de clase.</p>
                            </Card>
                        </Link>
                        <Link to="/login">
                            <Card className="p-8 h-full">
                                <IconUsers className="w-12 h-12 text-brand-blue mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Portal Administrativo</h3>
                                <p className="text-gray-600">Administra usuarios, programas y configuraciones.</p>
                            </Card>
                        </Link>
                    </div>
                </div>
            </section>


            {/* News and Events Section */}
            <section className="py-20 bg-brand-gray">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Noticias y Eventos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {news.map(item => (
                            <Card key={item.id} className="flex flex-col md:flex-row">
                                <img src={item.imageUrl} alt={item.title} className="w-full md:w-1/3 h-48 md:h-full object-cover"/>
                                <div className="p-6 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-xl mb-2 text-gray-800">{item.title}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{item.summary}</p>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <IconCalendar className="w-4 h-4 mr-2" />
                                        <span>{item.date}</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Programas Destacados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {programs.slice(0, 3).map(program => (
                             <Card key={program.id}>
                                <div className="p-6">
                                    <div className="flex items-center text-brand-blue mb-4">
                                        <IconBookOpen className="w-6 h-6 mr-3"/>
                                        <span className="font-semibold">{program.type}</span>
                                    </div>
                                    <h3 className="font-bold text-xl mb-2 text-gray-800">{program.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 truncate">{program.description}</p>
                                    <Link to={`/programas/${program.id}`} className="font-semibold text-brand-blue hover:underline">
                                        Ver más
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;