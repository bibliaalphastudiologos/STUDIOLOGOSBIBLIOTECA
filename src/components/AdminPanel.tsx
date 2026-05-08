import React, { useEffect, useMemo, useState } from 'react';
import { collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { BookOpen, CalendarCheck, RefreshCw, Shield, Users } from 'lucide-react';
import { useAuth, type StudioLogosProfile } from './AuthProvider';
import { db } from '../services/firebase';
import { formatBrasiliaDate, getBrasiliaDateString } from '../lib/brasiliaDate';

type AdminUser = StudioLogosProfile & {
  uid: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

const USERS_COLLECTION = 'studio_users';
const PAYMENT_ACCESS_COLLECTION = 'studio_payment_access';

function statusBadge(value?: string) {
  if (value === 'approved' || value === 'active') return 'bg-emerald-900 text-emerald-100 border-emerald-700';
  if (value === 'blocked' || value === 'rejected' || value === 'cancelled') return 'bg-red-950 text-red-100 border-red-800';
  if (value === 'expired') return 'bg-amber-900 text-amber-100 border-amber-700';
  return 'bg-black text-white border-black';
}

export const AdminPanel: React.FC = () => {
  const { user, profile, hasAccess } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const isAdmin = profile?.isAdmin === true;
  const approvalDate = profile?.approvalDateBrasilia || formatBrasiliaDate(profile?.approvedAt);
  const expirationDate = formatBrasiliaDate(profile?.subscriptionExpiresAt);

  const totals = useMemo(() => ({
    approved: users.filter((item) => item.payment_status === 'approved').length,
    active: users.filter((item) => item.access_status === 'active').length,
    blocked: users.filter((item) => item.access_status === 'blocked').length,
  }), [users]);

  async function loadUsers() {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const snapshot = await getDocs(query(collection(db, USERS_COLLECTION), orderBy('updatedAt', 'desc')));
      setUsers(snapshot.docs.map((item) => ({ uid: item.id, ...(item.data() as StudioLogosProfile) })));
    } finally {
      setLoading(false);
    }
  }

  async function setAccess(uid: string, access_status: 'active' | 'blocked') {
    const target = users.find((item) => item.uid === uid);
    await updateDoc(doc(db, USERS_COLLECTION, uid), {
      access_status,
      status: access_status === 'active' ? 'approved' : 'blocked',
      payment_status: access_status === 'active' ? 'approved' : 'cancelled',
      manual_access: access_status === 'active',
      updatedAt: serverTimestamp(),
    });
    if (target?.email) {
      await setDoc(doc(db, PAYMENT_ACCESS_COLLECTION, target.email.trim().toLowerCase()), {
        nome: target.nome || target.email,
        email: target.email.trim().toLowerCase(),
        payment_status: access_status === 'active' ? 'approved' : 'cancelled',
        access_status,
        manual_access: access_status === 'active',
        paymentId: `admin_${access_status}_${Date.now()}`,
        rawStatus: 'manual',
        planPrice: 'R$ 19,00',
        planPeriod: 'mensal',
        ...(access_status === 'active' ? {
          approvedAt: serverTimestamp(),
          approvalDateBrasilia: getBrasiliaDateString(),
        } : {}),
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }
    await loadUsers();
  }

  useEffect(() => {
    loadUsers();
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] p-6 flex items-center justify-center">
        <div className="max-w-md border border-black/10 bg-white p-8 text-center shadow-xl">
          <Shield className="mx-auto mb-4 h-8 w-8 text-[#C5A059]" />
          <h1 className="font-serif text-3xl text-[#111] mb-3">Painel administrativo</h1>
          <p className="text-sm text-black/60">Entre com o Gmail administrador para visualizar pagamentos, usuários e liberações.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2] p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] font-black text-[#C5A059]">Studio Logos</p>
            <h1 className="font-serif text-3xl md:text-5xl text-[#111]">Painel Administrativo</h1>
          </div>
          <button
            onClick={loadUsers}
            className="inline-flex h-11 items-center justify-center gap-2 border border-black/10 bg-black px-5 text-[10px] uppercase tracking-[0.2em] font-bold text-white"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>

        <div className="border border-gray-200 bg-white p-5 rounded-sm shadow-sm">
          <p className="text-xs uppercase tracking-[0.22em] font-black text-gray-400 mb-2">Controle de assinatura</p>
          <h2 className="font-serif text-2xl text-[#111] mb-3">Plano mensal Studio Logos · R$ 19,00 por mês</h2>
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
              <p className="font-serif text-lg">{hasAccess ? expirationDate : 'Mensal após aprovação'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {[
            { icon: Users, label: 'Usuários', value: users.length },
            { icon: CalendarCheck, label: 'Pagamentos aprovados', value: totals.approved },
            { icon: Shield, label: 'Acessos ativos', value: totals.active },
            { icon: BookOpen, label: 'Bloqueados', value: totals.blocked },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white p-4 md:p-6 border border-black/10 shadow-sm">
              <Icon className="w-6 h-6 text-[#C5A059] mb-3" />
              <p className="text-[9px] uppercase tracking-[0.2em] font-black text-black/40">{label}</p>
              <p className="font-serif text-3xl mt-1">{value}</p>
            </div>
          ))}
        </div>

        <section className="bg-white border border-black/10 shadow-sm overflow-hidden">
          <div className="p-4 md:p-5 border-b border-black/10">
            <h2 className="font-serif text-2xl">Usuários e pagamentos</h2>
            <p className="text-sm text-black/55">Acesso automático quando payment_status = approved e access_status = active.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-black text-white">
                <tr className="text-[10px] uppercase tracking-[0.18em]">
                  <th className="p-3">Nome</th>
                  <th className="p-3">E-mail</th>
                  <th className="p-3">Pagamento</th>
                  <th className="p-3">Acesso</th>
                  <th className="p-3">Aprovação</th>
                  <th className="p-3">Pagamento ID</th>
                  <th className="p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr key={item.uid} className="border-b border-black/5">
                    <td className="p-3 font-serif">{item.nome || 'Sem nome'}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3"><span className={`border px-2 py-1 text-[10px] uppercase font-bold ${statusBadge(item.payment_status)}`}>{item.payment_status || 'pending'}</span></td>
                    <td className="p-3"><span className={`border px-2 py-1 text-[10px] uppercase font-bold ${statusBadge(item.access_status)}`}>{item.access_status || 'blocked'}</span></td>
                    <td className="p-3">{item.approvalDateBrasilia || formatBrasiliaDate(item.approvedAt) || '-'}</td>
                    <td className="p-3 font-mono text-xs">{item.paymentId || '-'}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button onClick={() => setAccess(item.uid, 'active')} className="px-3 py-2 bg-[#C5A059] text-black text-[10px] uppercase font-black">Liberar</button>
                        <button onClick={() => setAccess(item.uid, 'blocked')} className="px-3 py-2 bg-black text-white text-[10px] uppercase font-black">Bloquear</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!users.length && (
                  <tr>
                    <td className="p-6 text-center text-black/50" colSpan={7}>Nenhum usuário encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
