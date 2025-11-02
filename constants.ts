import { Role, User, Program, NewsArticle, Course, Student, Faculty } from './types';

export const MOCK_COURSES: Course[] = [
  { id: 'cs101', name: 'Introducción a la Programación', code: 'CS101', credits: 4 },
  { id: 'ma202', name: 'Cálculo Avanzado', code: 'MA202', credits: 5 },
  { id: 'ph301', name: 'Física Moderna', code: 'PH301', credits: 4 },
  { id: 'hi105', name: 'Historia del Arte', code: 'HI105', credits: 3 },
];

export const MOCK_USERS: (User | Student | Faculty)[] = [
  {
    id: 'admin01',
    name: 'Admin Global',
    email: 'admin@universidadglobal.edu',
    role: Role.ADMIN,
    avatar: 'https://i.pravatar.cc/150?u=admin01',
  },
  {
    id: 'faculty01',
    name: 'Dr. Alan Turing',
    email: 'aturing@universidadglobal.edu',
    role: Role.FACULTY,
    avatar: 'https://i.pravatar.cc/150?u=faculty01',
    coursesTaught: ['cs101', 'ma202', 'ph301'],
  },
  {
    id: 'student01',
    name: 'Ada Lovelace',
    email: 'alovelace@universidadglobal.edu',
    role: Role.STUDENT,
    avatar: 'https://i.pravatar.cc/150?u=student01',
    grades: [
      { courseId: 'cs101', grade: 95, period: '2023-1' },
      { courseId: 'ma202', grade: 88, period: '2023-1' },
    ],
    schedule: {
      Lunes: [{ time: '10:00 - 12:00', courseId: 'cs101' }],
      Miércoles: [{ time: '10:00 - 12:00', courseId: 'cs101' }],
      Viernes: [{ time: '14:00 - 16:00', courseId: 'ma202' }],
    },
  },
  {
    id: 'student02',
    name: 'Marie Curie',
    email: 'mcurie@universidadglobal.edu',
    role: Role.STUDENT,
    avatar: 'https://i.pravatar.cc/150?u=student02',
    grades: [
      { courseId: 'ph301', grade: 98, period: '2023-1' },
      { courseId: 'ma202', grade: 92, period: '2023-1' },
    ],
    schedule: {
      Martes: [{ time: '08:00 - 10:00', courseId: 'ph301' }],
      Jueves: [{ time: '08:00 - 10:00', courseId: 'ph301' }],
    },
  },
];

export const MOCK_PROGRAMS: Program[] = [
  {
    id: 'dev-web-virtual',
    title: 'Desarrollo Web Full Stack',
    type: 'Virtual',
    area: 'Tecnología',
    description: 'Conviértete en un desarrollador web profesional desde casa con nuestro programa intensivo y práctico.',
    duration: '6 meses',
    curriculum: ['HTML5 & CSS3', 'JavaScript Moderno', 'React.js', 'Node.js & Express', 'Bases de Datos SQL y NoSQL'],
    faculty: ['Dr. Tim Berners-Lee'],
  },
  {
    id: 'marketing-virtual',
    title: 'Marketing Digital Estratégico',
    type: 'Virtual',
    area: 'Negocios',
    description: 'Domina las herramientas y estrategias del marketing digital para impulsar negocios en el entorno online.',
    duration: '4 meses',
    curriculum: ['SEO y SEM', 'Marketing de Contenidos', 'Redes Sociales', 'Email Marketing', 'Analítica Web'],
    faculty: ['Dra. Philip Kotler'],
  },
   {
    id: 'diseno-virtual',
    title: 'Diseño Gráfico y Branding',
    type: 'Virtual',
    area: 'Arte',
    description: 'Desarrolla tu creatividad y aprende a construir identidades visuales impactantes desde cero.',
    duration: '5 meses',
    curriculum: ['Fundamentos del Diseño', 'Adobe Illustrator', 'Adobe Photoshop', 'Branding y Logotipos', 'Diseño Editorial'],
    faculty: ['Dra. Paula Scher'],
  },
  {
    id: 'data-science-virtual',
    title: 'Ciencia de Datos Aplicada',
    type: 'Virtual',
    area: 'Tecnología',
    description: 'Aprende a manipular, analizar y visualizar datos para extraer insights valiosos y tomar decisiones estratégicas.',
    duration: '8 meses',
    curriculum: ['Python para Ciencia de Datos', 'Estadística y Probabilidad', 'Machine Learning', 'Visualización de Datos con Tableau', 'Big Data'],
    faculty: ['Dr. Andrew Ng'],
  },
  {
    id: 'ing-sistemas',
    title: 'Ingeniería de Sistemas',
    type: 'Pregrado',
    area: 'Tecnología',
    description: 'Formar profesionales capaces de diseñar, desarrollar y gestionar sistemas de información y tecnologías computacionales.',
    duration: '10 semestres',
    curriculum: ['Algoritmos', 'Bases de Datos', 'Redes de Computadoras', 'Inteligencia Artificial'],
    faculty: ['Dr. Alan Turing', 'Dr. Grace Hopper'],
  },
   {
    id: 'psicologia',
    title: 'Psicología',
    type: 'Pregrado',
    area: 'Negocios', // Assuming a Business/Social Science area
    description: 'Estudia el comportamiento humano y los procesos mentales para aplicar los conocimientos en diversos campos clínicos y organizacionales.',
    duration: '10 semestres',
    curriculum: ['Psicología General', 'Neurociencia Cognitiva', 'Psicopatología', 'Psicología Social', 'Terapias Cognitivo-Conductuales'],
    faculty: ['Dr. Sigmund Freud', 'Dra. Jean Piaget'],
  },
  {
    id: 'mba',
    title: 'Maestría en Administración de Empresas',
    type: 'Posgrado',
    area: 'Negocios',
    description: 'Desarrollar líderes con visión estratégica para la gestión de organizaciones en un entorno global.',
    duration: '4 semestres',
    curriculum: ['Finanzas Corporativas', 'Marketing Estratégico', 'Liderazgo', 'Operaciones'],
    faculty: ['Dr. Peter Drucker', 'Dra. Sheryl Sandberg'],
  },
  {
    id: 'doc-neurociencia',
    title: 'Doctorado en Neurociencia Computacional',
    type: 'Posgrado',
    area: 'Tecnología',
    description: 'Investigación de vanguardia en la intersección de la neurociencia, la inteligencia artificial y la modelización matemática.',
    duration: '6 semestres',
    curriculum: ['Modelos Neuronales', 'Análisis de Datos Neuronales', 'Machine Learning para Neurociencia', 'Tesis Doctoral'],
    faculty: ['Dr. Santiago Ramón y Cajal'],
  },
  {
    id: 'dip-ia',
    title: 'Diplomado en Inteligencia Artificial',
    type: 'Diplomado',
    area: 'Tecnología',
    description: 'Proporcionar conocimientos prácticos sobre los fundamentos y aplicaciones de la IA y el Machine Learning.',
    duration: '120 horas',
    curriculum: ['Fundamentos de Python', 'Machine Learning', 'Deep Learning', 'Procesamiento de Lenguaje Natural'],
    faculty: ['Dr. Geoffrey Hinton'],
  },
  {
    id: 'dip-agile',
    title: 'Diplomado en Gestión de Proyectos Ágiles',
    type: 'Diplomado',
    area: 'Negocios',
    description: 'Aprende a gestionar proyectos de forma flexible y eficiente utilizando metodologías como Scrum y Kanban.',
    duration: '90 horas',
    curriculum: ['Manifiesto Ágil', 'Framework Scrum', 'Roles y Eventos', 'Kanban y Lean', 'Métricas Ágiles'],
    faculty: ['Dr. Jeff Sutherland'],
  }
];

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 1,
    title: 'UniversidadGlobal Lanza Nuevo Centro de Investigación en IA',
    summary: 'La universidad inaugura un moderno centro dedicado a la investigación y desarrollo de inteligencia artificial, posicionándose a la vanguardia de la tecnología.',
    date: '2023-10-26',
    imageUrl: 'https://picsum.photos/seed/noticia1/600/400',
  },
  {
    id: 2,
    title: 'Estudiantes Ganan Competencia Nacional de Robótica',
    summary: 'Un equipo de estudiantes de Ingeniería de Sistemas obtuvo el primer lugar en la competencia anual de robótica con su innovador prototipo.',
    date: '2023-10-22',
    imageUrl: 'https://picsum.photos/seed/noticia2/600/400',
  },
];