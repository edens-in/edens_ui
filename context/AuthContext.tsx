'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as authService from '../services/authService';
import { User, AuthError } from '../services/authService'; // Ensure these are exported

// Define types for signup function
// This should match the expected structure in authService.signupUser
interface SignupUserData {
  fullname: string;
  email: string;
  phone: string;
  password: string;
}

// Define AuthState interface
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Define AuthContextType interface
interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupUserData) => Promise<void>;
  logout: () => void;
}

// Create AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Implement AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserFromStorage = () => {
      setIsLoading(true);
      const storedUser = authService.getCurrentUser();
      const storedToken = authService.getToken();

      if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);
      }
      setIsLoading(false);
    };
    loadUserFromStorage();
  }, []);

  const isAuthenticated = !!user && !!token;

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    const response = await authService.loginUser(email, password);
    if (response && 'error' in response && (response as AuthError).error) {
      setError((response as AuthError).message);
      setUser(null);
      setToken(null);
    } else if (response && 'id' in response) { // Check if it's a User object
      setUser(response as User);
      setToken(authService.getToken());
      setError(null);
    } else {
      // Handle unexpected response structure
      setError('Login failed due to an unexpected error.');
      setUser(null);
      setToken(null);
    }
    setIsLoading(false);
  };

  const signup = async (userData: SignupUserData) => {
    setIsLoading(true);
    setError(null);
    const response = await authService.signupUser(userData);
    if (response && 'error' in response && (response as AuthError).error) {
      setError((response as AuthError).message);
      setUser(null);
      setToken(null);
    } else if (response && 'id' in response) { // Check if it's a User object
      setUser(response as User);
      setToken(authService.getToken());
      setError(null);
    } else {
      // Handle unexpected response structure
      setError('Signup failed due to an unexpected error.');
      setUser(null);
      setToken(null);
    }
    setIsLoading(false);
  };

  const logout = () => {
    authService.logoutUser();
    setUser(null);
    setToken(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Implement useAuth custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
