
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type FormInputs = {
  email: string;
  pass: string;
};

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
    const [loginError, setLoginError] = useState<string | null>(null);
    const auth = useAuth();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setLoginError(null);
        const user = await auth.login(data.email, data.pass);
        if (user) {
            navigate('/dashboard');
        } else {
            setLoginError('Credenciales incorrectas. Inténtalo de nuevo.');
        }
    };
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-brand-gray">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Iniciar Sesión</h1>
                    <p className="mt-2 text-gray-600">Accede a tu portal de UniversidadGlobal.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
                        <input 
                            type="email" 
                            id="email" 
                            {...register("email", { required: "El email es requerido" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue" 
                            placeholder="tu@email.com"
                        />
                         {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="pass" className="block text-gray-700 font-medium mb-2">Contraseña</label>
                        <input 
                            type="password" 
                            id="pass" 
                            {...register("pass", { required: "La contraseña es requerida" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                            placeholder="********"
                         />
                        {errors.pass && <p className="text-red-500 text-sm mt-1">{errors.pass.message}</p>}
                    </div>

                    {loginError && <p className="text-red-500 text-center">{loginError}</p>}
                    
                    <div className="text-right">
                        <Link to="#" className="text-sm text-brand-blue hover:underline">¿Olvidaste tu contraseña?</Link>
                    </div>

                    <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:bg-brand-blue-dark transition-colors">
                        Ingresar
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Ejemplos: admin@universidadglobal.edu, aturing@universidadglobal.edu, alovelace@universidadglobal.edu. Contraseña para todos: "password"
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
