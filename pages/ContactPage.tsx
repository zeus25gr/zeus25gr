
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IconMail, IconMapPin, IconPhone } from '../components/icons';

type FormInputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log('Contact form submitted:', data);
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        // In a real app, you would send this data to a server.
    };

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-6 py-16">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Contáctanos</h1>
                    <p className="text-lg text-gray-600">
                        Estamos aquí para ayudarte. Rellena el formulario o utiliza nuestros datos de contacto.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div className="space-y-8">
                         <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Información de Contacto</h2>
                             <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start">
                                    <IconMapPin className="w-6 h-6 mr-4 mt-1 text-brand-blue flex-shrink-0" />
                                    <span>Av. Siempre Viva 123, Ciudad Capital</span>
                                </li>
                                <li className="flex items-center">
                                    <IconPhone className="w-6 h-6 mr-4 text-brand-blue flex-shrink-0" />
                                    <span>+1 (234) 567-890</span>
                                </li>
                                <li className="flex items-center">
                                    <IconMail className="w-6 h-6 mr-4 text-brand-blue flex-shrink-0" />
                                    <span>info@universidadglobal.edu</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                           <h2 className="text-2xl font-bold text-gray-800 mb-4">Horario de Atención</h2>
                           <p className="text-gray-700">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre Completo</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    {...register("name", { required: "El nombre es requerido" })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    {...register("email", { required: "El email es requerido", pattern: { value: /^\S+@\S+$/i, message: "Email inválido"} })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Asunto</label>
                                <input 
                                    type="text" 
                                    id="subject" 
                                    {...register("subject", { required: "El asunto es requerido" })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                />
                                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Mensaje</label>
                                <textarea 
                                    id="message" 
                                    rows={5}
                                    {...register("message", { required: "El mensaje es requerido" })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue"
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                            </div>
                             <button type="submit" className="w-full bg-brand-blue text-white font-bold py-3 rounded-lg hover:bg-brand-blue-dark transition-colors">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
