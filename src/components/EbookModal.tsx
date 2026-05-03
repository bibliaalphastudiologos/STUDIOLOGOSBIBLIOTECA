import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Clock, Tag, Shield, List, AlertCircle } from 'lucide-react';
import { Ebook } from '../types';
import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';

interface EbookModalProps {
  ebook: Ebook | null;
  onClose: () => void;
}

export const EbookModal: React.FC<EbookModalProps> = ({ ebook, onClose }) => {
  const { user, isApproved: authIsApproved, loading, isAdmin } = useAuth();
  const isAdminEmail = user?.email?.toLowerCase().trim() === 'analista.ericksilva@gmail.com';
  const isApproved = isAdminEmail || isAdmin || authIsApproved;
  const navigate = useNavigate();

  const handleRead = () => {
    if (ebook) {
      onClose();
      navigate(`/leitor/${ebook.id}`);
    }
  };

  return (
    <AnimatePresence>
      {ebook && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row border border-gray-100 sheen-wrapper"
          >
            {/* Cover Section */}
            <div className={`w-full md:w-2/5 p-12 flex flex-col min-h-[500px] text-navy overflow-hidden relative border-r border-gray-100 grain ${
              ebook.category === 'Teologia' ? 'bg-theology/5' : 
              ebook.category === 'Filosofia' ? 'bg-philosophy/5' : 
              'bg-psicanalise/5'
            }`}>
               {/* Realistic Background Image */}
               {ebook.cover && (
                 <div className="absolute inset-0 z-0 opacity-10 grayscale mix-blend-multiply transition-opacity duration-1000">
                    <img 
                      src={ebook.cover} 
                      alt={ebook.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[0.3] brightness-[0.7]"
                    />
                  </div>
                )}
                
               <div className={`absolute inset-4 border ${
                 ebook.category === 'Teologia' ? 'border-theology/10' : 
                 ebook.category === 'Filosofia' ? 'border-philosophy/10' : 
                 'border-psicanalise/10'
               } pointer-events-none`} />
                
                <div className="flex justify-between items-start mb-12 relative z-10">
                 <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${
                   ebook.category === 'Teologia' ? 'text-theology' : 
                   ebook.category === 'Filosofia' ? 'text-philosophy' : 
                   'text-psicanalise'
                 }`}>{ebook.brand} • {ebook.category}</span>
                 <button onClick={onClose} className="md:hidden text-navy"><X className="w-6 h-6" /></button>
                </div>
                
                <div className="mt-auto relative z-10">
                 <div className={`w-12 h-px mb-8 ${
                    ebook.category === 'Teologia' ? 'bg-theology/30' : 
                    ebook.category === 'Filosofia' ? 'bg-philosophy/30' : 
                    'bg-psicanalise/30'
                 }`} />
                 <h2 className="font-serif text-5xl md:text-6xl leading-[1.1] mb-6 text-navy">{ebook.title}</h2>
                 <p className="text-muted font-normal mb-10 uppercase tracking-[0.3em] text-[10px] leading-relaxed">{ebook.subtitle}</p>
                  
                 <div className="flex items-center space-x-8 text-[10px] uppercase tracking-[0.4em] font-black text-navy/40">
                    <div className="flex items-center text-navy font-black">
                     <Clock className="w-4 h-4 mr-3 opacity-40" />
                      <span>{ebook.readingTime}</span>
                    </div>
                    <div className="flex items-center text-navy font-black">
                     <Shield className="w-4 h-4 mr-3 opacity-40" />
                      <span>ONLINE ALPHA</span>
                    </div>
                  </div>
               </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 overflow-y-auto bg-white p-8 md:p-16">
              <div className="hidden md:flex justify-end mb-8 sticky top-0 bg-white/80 backdrop-blur-sm z-50">
                 <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-300 hover:text-navy"><X className="w-6 h-6" /></button>
              </div>

              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-[10px] font-black text-navy uppercase tracking-[0.5em] mb-6 border-b border-gray-100 pb-4">Síntese do Pensamento</h4>
                  <p className="text-lg text-muted leading-relaxed font-serif text-navy/80">{ebook.description}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className={`text-[10px] font-black uppercase tracking-[0.5em] mb-6 flex items-center ${
                      ebook.category === 'Teologia' ? 'text-theology' : 
                      ebook.category === 'Filosofia' ? 'text-philosophy' : 
                      'text-psicanalise'
                    }`}>
                      <BookOpen className="w-3 h-3 mr-3" />
                      OBJETIVOS
                    </h4>
                    <ul className="space-y-4">
                      {ebook.learn.map((item, i) => (
                        <li key={i} className="text-sm text-muted flex items-start leading-relaxed font-normal">
                          <span className={`mr-4 font-black ${
                            ebook.category === 'Teologia' ? 'text-theology' : 
                            ebook.category === 'Filosofia' ? 'text-philosophy' : 
                            'text-psicanalise'
                          }`}>0{i+1}</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mb-6 flex items-center">
                      <List className="w-3 h-3 mr-3" />
                      ESTRUTURA
                    </h4>
                    <ul className="space-y-3">
                      {ebook.chapters.map((cap, i) => (
                        <li key={i} className="group text-sm text-muted flex items-center font-normal hover:text-navy transition-colors">
                          <span className="w-6 h-6 rounded-sm bg-gray-50 border border-gray-100 text-[10px] flex items-center justify-center mr-4 text-navy font-black group-hover:bg-black group-hover:text-white transition-all">{i+1}</span>
                          <span className="truncate">{cap.title}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                <motion.div 
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 0.6 }}
                   className={`p-10 rounded-sm border border-l-8 ${
                    ebook.category === 'Teologia' ? 'bg-theology/5 border-theology border-theology/10' : 
                    ebook.category === 'Filosofia' ? 'bg-philosophy/5 border-philosophy border-philosophy/10' : 
                    'bg-psicanalise/5 border-psicanalise border-psicanalise/10'
                  }`}>
                  <div className="flex items-start">
                    <AlertCircle className={`w-5 h-5 mr-6 mt-1 shrink-0 ${
                      ebook.category === 'Teologia' ? 'text-theology' : 
                      ebook.category === 'Filosofia' ? 'text-philosophy' : 
                      'text-psicanalise'
                    }`} />
                    <p className="text-[11px] text-muted font-medium uppercase tracking-[0.1em] leading-relaxed">
                      {ebook.editorialNotice}
                    </p>
                  </div>
                </motion.div>

                <div className="pt-10 flex flex-col sm:flex-row gap-6">
                  {loading ? (
                    <div className="flex-1 py-7 bg-gray-50 rounded-sm animate-pulse" />
                  ) : isApproved ? (
                    <button 
                      onClick={handleRead}
                      className="premium-button flex-1 flex justify-center items-center py-7 uppercase tracking-[0.6em] text-[12px] font-black shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-black/30 transition-all cursor-pointer"
                    >
                      <BookOpen className="w-5 h-5 mr-4" />
                      LER AGORA
                    </button>
                  ) : (
                    <a 
                      href="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=bcf17285bfd64b70b1892692538db1ed"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="premium-button flex-1 flex justify-center items-center py-6 uppercase tracking-[0.5em] text-[11px] font-black shadow-xl"
                    >
                      Assinar e Liberar Acesso
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
