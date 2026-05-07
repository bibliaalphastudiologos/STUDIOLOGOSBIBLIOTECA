import React from 'react';
import { useAuth } from './AuthProvider';
import { BookOpen, Users, BarChart3, CalendarCheck } from 'lucide-react';
import { formatBrasiliaDate, getBrasiliaDateString } from '../lib/brasiliaDate';

export const AdminPanel: React.FC = () => {
  const { user, profile, hasAccess } = useAuth();
  const approvalDate = profile?.approvalDateBrasilia || formatBrasiliaDate(profile?.approvedAt);
  const expirationDate = formatBrasiliaDate(profile?.subscriptionExpiresAt);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-3xl text-navy mb-6">Painel Administrativo</h1>
        <div className="mb-6 border border-gray-200 bg-white p-5 rounded-sm shadow-sm">
          <p className="text-xs uppercase tracking-[0.22em] font-black text-gray-400 mb-2">
            Controle de assinatura
          </p>
          <h2 className="font-serif text-2xl text-navy mb-3">
            Plano anual Studio Logos · R$ 47,00 por 1 ano
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
            <div className="border border-gray-100 p-3">
              <p className="text-gray-400 text-xs uppercase font-bold">Hoje em Brasília</p>
              <p className="font-serif text-lg">{getBrasiliaDateString()}</p>
            </div>
            <div className="border border-gray-100 p-3">
              <p className="text-gray-400 text-xs uppercase font-bold">Usuário atual</p>
              <p className="font-serif text-lg truncate">{profile?.nome || user?.displayName || user?.email || 'Sem login'}</p>
            </div>
            <div className="border border-gray-100 p-3">
              <p className="text-gray-400 text-xs uppercase font-bold">Data de aprovação</p>
              <p className="font-serif text-lg">{hasAccess ? approvalDate : 'Aguardando aprovação'}</p>
            </div>
            <div className="border border-gray-100 p-3">
              <p className="text-gray-400 text-xs uppercase font-bold">Validade</p>
              <p className="font-serif text-lg">{hasAccess ? expirationDate : '1 ano após aprovação'}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-sm shadow">
            <BookOpen className="w-8 h-8 text-navy mb-3" />
            <h3 className="font-serif text-xl mb-2">Ebooks</h3>
            <p className="text-gray-600">Gerenciar acervo</p>
          </div>
          
          <div className="bg-white p-6 rounded-sm shadow">
            <Users className="w-8 h-8 text-navy mb-3" />
            <h3 className="font-serif text-xl mb-2">Usuários</h3>
            <p className="text-gray-600">Aprovar novos membros e registrar data de aprovação</p>
          </div>
          
          <div className="bg-white p-6 rounded-sm shadow">
            <BarChart3 className="w-8 h-8 text-navy mb-3" />
            <h3 className="font-serif text-xl mb-2">Estatísticas</h3>
            <p className="text-gray-600">Análise de uso</p>
          </div>

          <div className="bg-white p-6 rounded-sm shadow">
            <CalendarCheck className="w-8 h-8 text-navy mb-3" />
            <h3 className="font-serif text-xl mb-2">Plano Anual</h3>
            <p className="text-gray-600">R$ 47,00 · validade de 1 ano</p>
          </div>
        </div>
      </div>
    </div>
  );
};
