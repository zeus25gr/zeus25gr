
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Role } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isFaculty: boolean;
  isStudent: boolean;
  login: (email: string, pass: string) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (email: string, pass: string) => {
    const userData = await api.login(email, pass);
    if (userData) {
      setUser(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));
    }
    return userData;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === Role.ADMIN;
  const isFaculty = user?.role === Role.FACULTY;
  const isStudent = user?.role === Role.STUDENT;

  const value = { user, isAuthenticated, login, logout, isAdmin, isFaculty, isStudent };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
