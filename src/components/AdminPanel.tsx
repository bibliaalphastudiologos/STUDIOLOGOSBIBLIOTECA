import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, doc, updateDoc, Timestamp, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile, UserStatus } from '../types';
import { Shield, CheckCircle, XCircle, Clock, Search, User as UserIcon } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { Link } from 'react-router-dom';

export const AdminPanel: React.FC = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData: UserProfile[] = [];
      snapshot.forEach((doc) => {
        usersData.push(doc.data() as UserProfile);
      });
      setUsers(usersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const updateStatus = async (userId: string, status: UserStatus) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { 
        status,
        approvedAt: status === 'approved' ? new Date() : null 
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 text-center">
        <div>
          <Shield className="w-16 h-16 text-gold mx-auto mb-4" />
          <h1 className="text-2xl font-serif font-bold text-navy">Acesso Restrito</h1>
          <p className="text-muted mt-2">Você não tem permissão para acessar esta área.</p>
        </div>
      </div>
    );
  }

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: users.length,
    pending: users.filter(u => u.status === 'pending').length,
    approved: users.filter(u => u.status === 'approved').length,
    blocked: users.filter(u => u.status === 'blocked').length,
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] p-4 md:p-12 grain">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <Link to="/" className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-sm hover:scale-105 transition-transform shadow-xl">
                <Shield className="w-5 h-5 text-gold" />
              </Link>
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-navy/40">SISTEMA ALPHA v.2.0</h2>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-navy tracking-tight italic">Controle de Acesso.</h1>
          </div>
          
          <div className="flex items-center space-x-4">
             <Link to="/" className="premium-button-outline px-8 py-4 text-[10px] tracking-widest font-black uppercase">Voltar ao Logos</Link>
             <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-navy transition-colors" />
                <input
                  type="text"
                  placeholder="Pesquisar Membro..."
                  className="pl-14 pr-8 py-4 bg-white border border-border rounded-sm text-[11px] font-black uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-navy transition-all shadow-sm w-full md:w-80"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
          </div>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'TOTAL DE MEMBROS', value: stats.total, color: 'text-navy', icon: UserIcon },
            { label: 'AGUARDANDO ALPHA', value: stats.pending, color: 'text-gold', icon: Clock },
            { label: 'MEMBROS ATIVOS', value: stats.approved, color: 'text-green-600', icon: CheckCircle },
            { label: 'BLOQUEADOS', value: stats.blocked, color: 'text-red-500', icon: XCircle },
          ].map((stat, i) => (
            <div key={i} className="premium-card p-10 rounded-sm bg-white border border-gray-100 shadow-sm sheen-wrapper group hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">{stat.label}</div>
                <stat.icon className={`w-4 h-4 ${stat.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
              </div>
              <div className={`text-4xl font-serif font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-sm border border-border overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border bg-gray-50/50">
                  <th className="px-10 py-6 text-[10px] font-black text-muted uppercase tracking-widest">MEMBRO / E-MAIL</th>
                  <th className="px-10 py-6 text-[10px] font-black text-muted uppercase tracking-widest">DATA DE INGRESSO</th>
                  <th className="px-10 py-6 text-[10px] font-black text-muted uppercase tracking-widest">STATUS DE ACESSO</th>
                  <th className="px-10 py-6 text-[10px] font-black text-muted uppercase tracking-widest text-right">AÇÕES ALPHA</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.uid} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-10 py-8">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full border border-border overflow-hidden mr-4 shadow-inner">
                          <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-navy uppercase tracking-widest mb-1">{user.name}</div>
                          <div className="text-[10px] font-bold text-muted uppercase tracking-tighter">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                       <div className="text-[10px] font-black text-navy uppercase tracking-widest">
                         {user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString('pt-BR') : '--/--/----'}
                       </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ${
                        user.status === 'approved' ? 'bg-green-50 text-green-700 border border-green-100' :
                        user.status === 'pending' ? 'bg-gold/5 text-gold border border-gold/10' : 'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        {user.status === 'approved' ? 'MEMBRO ATIVO' : user.status === 'pending' ? 'AGUARDANDO' : 'BLOQUEADO'}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right space-x-2">
                       {user.status !== 'approved' && (
                         <button 
                          onClick={() => updateStatus(user.uid, 'approved')}
                          className="px-6 py-3 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-navy transition-all shadow-lg active:scale-95"
                          title="Liberar Acesso"
                         >
                           APROVAR
                         </button>
                       )}
                       {user.status !== 'blocked' && (
                         <button 
                          onClick={() => updateStatus(user.uid, 'blocked')}
                          className="px-6 py-3 border border-red-100 text-red-500 text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-red-50 transition-all active:scale-95"
                          title="Bloquear Acesso"
                         >
                           BLOQUEAR
                         </button>
                       )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
