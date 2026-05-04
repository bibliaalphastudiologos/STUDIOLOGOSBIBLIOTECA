import React, { useState } from 'react';
import { Menu, X, User, LogIn, Crown, BookOpen, ChevronRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { signInWithGoogle, auth } from '../lib/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { user, profile, isAdmin } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Início', path: '/', hash: '' },
    { name: 'Teologia', path: '/teologia', hash: '' },
    { name: 'Filosofia', path: '/filosofia', hash: '' },
    { name: 'Psicanálise', path: '/psicanalise', hash: '' },
    { name: 'Biblioteca', path: '/', hash: 'biblioteca' },
  ];

  const handleNavClick = (e: React.MouseEvent, path: string, hash: string) => {
    e.preventDefault();
    setIsOpen(false);
    if (hash) {
      // scroll to anchor — navigate home first if needed
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      } else {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (path === '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
      // Scroll to library section after navigation
      setTimeout(() => {
        document.getElementById('biblioteca')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      await signInWithGoogle();
      setIsOpen(false);
    } catch (error: any) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-black flex items-center justify-center rounded-sm group-hover:scale-110 transition-transform shadow-lg">
              <span className="text-white font-black text-xl tracking-tighter">SL</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-sans text-xs font-black tracking-[0.4em] text-navy">STUDIO LOGOS</div>
              <div className="text-[8px] font-black tracking-[0.2em] text-gold uppercase">Pensamento Alpha</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.hash ? `/#${item.hash}` : item.path}
                onClick={(e) => handleNavClick(e, item.path, item.hash)}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-navy/60 hover:text-navy transition-all relative group cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-8">
            {user ? (
               <div className="flex items-center space-x-6">
                 {isAdmin && (
                   <Link to="/admin" className="text-[10px] font-black uppercase tracking-widest text-theology bg-theology/5 px-4 py-2 rounded-full border border-theology/10 hover:bg-theology hover:text-white transition-all">
                     Admin
                   </Link>
                 )}
                 <div className="relative group">
                   <button className="flex items-center space-x-3 group">
                     <div className="w-10 h-10 rounded-full bg-navy/5 border border-navy/10 flex items-center justify-center hover:border-gold transition-colors shadow-inner overflow-hidden">
                       {profile?.photoURL ? (
                         <img src={profile.photoURL} alt="" className="w-full h-full object-cover" />
                       ) : (
                         <User className="w-5 h-5 text-navy/40" />
                       )}
                     </div>
                   </button>
                   <div className="absolute right-0 mt-4 w-56 bg-white border border-gray-100 rounded-sm shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-3 z-50">
                     <div className="px-6 py-3 border-b border-gray-50 mb-3">
                       <p className="text-[10px] font-black text-navy uppercase truncate">{profile?.name || user.email}</p>
                       <p className="text-[8px] text-muted uppercase font-bold tracking-widest mt-1">{profile?.status === 'approved' ? 'Membro Premium' : 'Acesso Pendente'}</p>
                     </div>
                     <button
                       onClick={() => auth.signOut()}
                       className="w-full text-left px-6 py-3 text-[10px] font-black text-red-500 uppercase tracking-widest hover:bg-red-50 transition-colors"
                     >
                       Sair da Conta
                     </button>
                   </div>
                 </div>
               </div>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                disabled={isLoggingIn}
                className="premium-button text-[10px] px-8 py-3.5 tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? 'CONECTANDO...' : 'LOGIN ALPHA'}
              </button>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-navy"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Login Error Alert */}
        <AnimatePresence>
          {loginError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-sm flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-900">Erro ao conectar</p>
                <p className="text-sm text-red-700">{loginError}</p>
              </div>
              <button
                onClick={() => setLoginError(null)}
                className="ml-auto text-red-600 hover:text-red-900"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="py-8 px-6 space-y-6">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.hash ? `/#${item.hash}` : item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={(e) => handleNavClick(e, item.path, item.hash)}
                  className="flex items-center justify-between text-xs font-black uppercase tracking-[0.3em] text-navy border-b border-gray-50 pb-4"
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-200" />
                </motion.a>
              ))}
              
              <div className="pt-4 flex flex-col gap-4">
                {user ? (
                  <button
                    onClick={() => {
                      auth.signOut();
                      setIsOpen(false);
                    }}
                    className="premium-button-outline w-full py-5 text-center text-[10px] tracking-widest font-black"
                  >
                    FINALIZAR SESSÃO
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleGoogleSignIn();
                      setIsOpen(false);
                    }}
                    disabled={isLoggingIn}
                    className="premium-button w-full py-5 flex justify-center items-center space-x-2 text-[10px] tracking-widest font-black disabled:opacity-50"
                  >
                    <Crown className="w-4 h-4" />
                    <span>{isLoggingIn ? 'CONECTANDO...' : 'ASSINAR AGORA'}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
