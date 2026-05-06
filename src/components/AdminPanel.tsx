import React from 'react';
import { useAuth } from '../lib/AuthContext';
import { BookOpen, Users, Settings, BarChart3 } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  // Admin liberado

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-3xl text-navy mb-6">Painel Administrativo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-sm shadow">
            <BookOpen className="w-8 h-8 text-navy mb-3" />
            <h3 className="font-serif text-xl mb-2">Ebooks</h3>
            <p className="text-gray-600">Gerenciar acervo</p>
          </div>
          
          <div className="bg-white p-6 rounded-sm shadow">
            <Users className="w-8 h-8 text-navy mb-3" />
            <h3 className="font-serif text-xl mb-2">Usuários</h3>
            <p className="text-gray-600">Aprovar novos membros</p>
          </div>
          
          <div className="bg-white p-6 rounded-sm shadow">
            <BarChart3 className="w-8 h-8 text-navy mb-3" />
            <h3 className="font-serif text-xl mb-2">Estatísticas</h3>
            <p className="text-gray-600">Análise de uso</p>
          </div>
        </div>
      </div>
    </div>
  );
};
