import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: any | null;
  isAdmin: boolean;
  isApproved: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isApproved: false,
  login: async () => {},
  logout: async () => {},
  loading: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mantemos o estado para não quebrar os componentes, mas sem Firebase
  const [user] = useState<any | null>(null);
  const [isAdmin] = useState(false);
  const [isApproved] = useState(false);
  const [loading] = useState(false);

  const login = async () => {
    console.log('Login desativado');
  };

  const logout = async () => {
    console.log('Logout desativado');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isApproved, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
