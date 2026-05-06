import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { User, LogOut, Loader2 } from 'lucide-react';

export const Header: React.FC = () => {
  // Autenticação removida

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl font-bold text-navy">
          STUDIO LOGOS
        </Link>
        
        {/* Autenticação removida */}
      </div>
    </header>
  );
};