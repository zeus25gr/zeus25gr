export enum Role {
  ADMIN = 'admin',
  FACULTY = 'faculty',
  STUDENT = 'student',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
}

export interface Program {
  id: string;
  title: string;
  type: 'Pregrado' | 'Posgrado' | 'Diplomado' | 'Virtual';
  description: string;
  duration: string;
  curriculum: string[];
  faculty: string[];
  area: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  date: string;
  imageUrl: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
}

export interface Grade {
  courseId: string;
  grade: number;
  period: string;
}

export interface Student extends User {
  grades: Grade[];
  schedule: { [day: string]: { time: string; courseId: string }[] };
}

export interface Faculty extends User {
  coursesTaught: string[];
}
