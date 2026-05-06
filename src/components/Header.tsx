import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { User, LogOut, Loader2 } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, isAdmin, login, logout, loading } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      await login();
    } catch (err: any) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl font-bold text-navy">
          STUDIO LOGOS
        </Link>
        
        {loginError && (
          <div className="absolute top-full left-0 right-0 bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm flex justify-between items-center">
            <span>{loginError}</span>
            <button onClick={() => setLoginError(null)} className="text-red-500">×</button>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm text-gray-600">{user.displayName || user.email}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm text-navy hover:bg-gray-100 rounded"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              disabled={isLoggingIn || loading}
              className="flex items-center space-x-2 px-4 py-2 bg-navy text-white rounded-sm hover:bg-navy/90 disabled:opacity-50"
            >
              {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <User className="w-4 h-4" />}
              <span>Entrar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};