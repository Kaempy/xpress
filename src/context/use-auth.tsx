'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  isAuth: boolean;
  user: User | null;
  login: (data: { token?: string; user: User }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Retrieve auth data from localStorage on app load
    const storedData = localStorage.getItem('auth');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.token && parsedData.user) {
        setIsAuth(true);
        setUser(parsedData.user);
      }
    }
  }, []);

  const login = ({ token, user }: { token?: string; user: User }) => {
    localStorage.setItem('auth', JSON.stringify({ token, user }));
    setIsAuth(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
