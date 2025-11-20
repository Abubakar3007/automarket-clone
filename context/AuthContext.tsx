import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { mockSupabase } from '../services/mockSupabase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        // In a real app, we'd check Supabase session here
        // For demo, we start logged out, but let's simulate a check
        await new Promise(resolve => setTimeout(resolve, 500));
        // Intentionally left null for initial state to show login flow options
        setUser(null); 
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await mockSupabase.auth.signIn(email);
      setUser(user);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    setIsLoading(true);
    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newUser = await mockSupabase.auth.signIn(data.email);
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await mockSupabase.auth.signOut();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
