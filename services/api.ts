
import { MOCK_COURSES, MOCK_NEWS, MOCK_PROGRAMS, MOCK_USERS } from '../constants';
import { Program, User, Role } from '../types';

// Simulate API latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const api = {
  // AUTH
  login: async (email: string, pass: string): Promise<User | null> => {
    await delay(500);
    const user = MOCK_USERS.find(u => u.email === email);
    // In a real app, you would verify the password hash here.
    if (user && pass === 'password') { 
      return user;
    }
    return null;
  },

  // DATA FETCHING
  getPrograms: async (): Promise<Program[]> => {
    await delay(300);
    return MOCK_PROGRAMS;
  },
  getProgramById: async (id: string): Promise<Program | undefined> => {
    await delay(300);
    return MOCK_PROGRAMS.find(p => p.id === id);
  },
  getNews: async () => {
    await delay(300);
    return MOCK_NEWS;
  },
  getUsers: async () => {
    await delay(300);
    return MOCK_USERS;
  },
  getCourses: async () => {
    await delay(300);
    return MOCK_COURSES;
  },
  getStudentsByCourse: async (courseId: string): Promise<User[]> => {
    await delay(200);
    // In a real app, this would query students enrolled in the course.
    // For this mock, we'll return all mock students for demonstration.
    return MOCK_USERS.filter(u => u.role === Role.STUDENT);
  },
  saveGrades: async (courseId: string, grades: { [studentId: string]: number }): Promise<boolean> => {
    await delay(500);
    console.log(`Grades saved for course ${courseId}:`, grades);
    // Here you would update the database.
    // We'll just return true to simulate success.
    return true;
  },
};