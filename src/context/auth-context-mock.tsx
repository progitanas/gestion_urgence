'use client';

import type { User, UserRole } from '@/types';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER_KEY = 'healthlink_mock_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(MOCK_USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      localStorage.removeItem(MOCK_USER_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, role: UserRole) => {
    setIsLoading(true);
    const mockUser: User = {
      id: 'mock-user-id-' + Math.random().toString(36).substr(2, 9),
      email,
      role,
      name: email.split('@')[0] || 'User',
    };
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    setIsLoading(false);
    router.push('/dashboard/home');
  };

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem(MOCK_USER_KEY);
    setUser(null);
    setIsLoading(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthMock = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthMock must be used within an AuthProvider');
  }
  return context;
};
