import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { api } from '../../../services/api';
import { User, Course } from '../../../types';
import { MOCK_COURSES } from '../../../constants';
import { IconUpload, IconDownload } from '../../../components/icons';

type FormInputs = {
  grades: { [studentId: string]: number };
};

const ManageGradesPage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    
    const [course, setCourse] = useState<Course | null>(null);
    const [students, setStudents] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!courseId) return;
            setLoading(true);
            const courseData = MOCK_COURSES.find(c => c.id === courseId);
            const studentData = await api.getStudentsByCourse(courseId);
            setCourse(courseData || null);
            setStudents(studentData);
            setLoading(false);
        };
        fetchData();
    }, [courseId]);

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        if (!courseId) return;
        setSaving(true);
        const success = await api.saveGrades(courseId, data.grades);
        setSaving(false);
        if (success) {
            alert('Notas guardadas con éxito.');
            navigate('/dashboard');
        } else {
            alert('Hubo un error al guardar las notas.');
        }
    };
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            console.log('Uploading file:', selectedFile.name);
            alert(`Archivo "${selectedFile.name}" subido con éxito.`);
            setSelectedFile(null); 
        } else {
            alert('Por favor, selecciona un archivo primero.');
        }
    };
    
    const handleDownload = () => {
        alert(`Iniciando la descarga del material para el curso ${course?.name}.`);
    };


    if (loading) {
        return <div className="flex justify-center items-center h-full"><p>Cargando...</p></div>;
    }

    if (!course) {
        return <div className="flex justify-center items-center h-full"><p>Curso no encontrado.</p></div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestionar Curso</h1>
            <h2 className="text-xl text-gray-600 mb-6">
                {course.name} ({course.code})
            </h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Registro de Notas</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3">Estudiante</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3 w-48">Nota Final (0-100)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id} className="border-b">
                                        <td className="p-3 font-medium">{student.name}</td>
                                        <td className="p-3 text-gray-600">{student.email}</td>
                                        <td className="p-3">
                                            <input
                                                type="number"
                                                {...register(`grades.${student.id}`, {
                                                    required: "Requerido",
                                                    min: { value: 0, message: "Min 0" },
                                                    max: { value: 100, message: "Max 100" },
                                                    valueAsNumber: true,
                                                })}
                                                className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                                placeholder="-"
                                            />
                                            {errors.grades?.[student.id] && (
                                                <p className="text-red-500 text-xs mt-1">{errors.grades[student.id].message}</p>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex justify-end gap-4">
                         <button 
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            disabled={saving}
                            className="bg-brand-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-blue-dark transition-colors disabled:bg-gray-400"
                        >
                            {saving ? 'Guardando...' : 'Guardar Notas'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Material de Clase</h2>
                
                <div className="pb-6 border-b border-gray-200">
                    <label className="block text-gray-700 font-medium mb-2">Subir nuevo material</label>
                    <div className="flex items-center gap-4">
                       <input 
                            type="file" 
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-brand-blue
                            hover:file:bg-blue-100 cursor-pointer"
                        />
                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile}
                            className="flex items-center bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors shrink-0 disabled:bg-gray-400"
                        >
                            <IconUpload className="w-5 h-5 mr-2" />
                            Subir
                        </button>
                    </div>
                    {selectedFile && <p className="text-sm text-gray-500 mt-2">Archivo seleccionado: <span className="font-medium">{selectedFile.name}</span></p>}
                </div>

                <div className="mt-6">
                    <label className="block text-gray-700 font-medium mb-2">Descargar material existente</label>
                    <button
                        onClick={handleDownload}
                        className="w-full md:w-auto flex items-center justify-center bg-brand-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-blue-dark transition-colors"
                    >
                        <IconDownload className="w-5 h-5 mr-2" />
                        Descargar .zip con todo el material
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageGradesPage;