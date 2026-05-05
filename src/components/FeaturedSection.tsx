import React from 'react';
import { motion } from 'motion/react';
import { Crown, BookOpen, Zap, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { signInWithGoogle } from '../lib/firebase';

export const FeaturedSection: React.FC = () => {
  const { user, profile } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const handleSubscribe = async () => {
    if (user && profile?.status !== 'approved') {
      window.open('https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=bcf17285bfd64b70b1892692538db1ed', '_blank');
    } else if (!user) {
      setIsLoggingIn(true);
      try {
        await signInWithGoogle();
      } finally {
        setIsLoggingIn(false);
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gold/5 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-navy mb-6">
            Por Que Escolher o Studio Logos?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted/80">
            Uma plataforma pensada para quem busca profundidade intelectual, qualidade de leitura e acesso ilimitado a grandes obras.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: BookOpen,
              title: 'Leitura 100% Online',
              description: 'Acesse suas obras diretamente no navegador. Sem downloads, sem aplicativos, sem complicações. Leia em qualquer dispositivo.',
              color: 'text-theology'
            },
            {
              icon: Shield,
              title: 'Obras Verificadas',
              description: 'Todas as obras são verificadas e autenticadas. Traduções confiáveis e edições de qualidade.',
              color: 'text-philosophy'
            },
            {
              icon: Zap,
              title: 'Acesso Ilimitado',
              description: 'Com uma assinatura, acesse toda a biblioteca. Sem limites de leitura, sem restrições, sem surpresas.',
              color: 'text-psicanalise'
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-lg border border-gray-200 bg-white hover:border-gold hover:shadow-lg transition-all duration-300 group"
            >
              <feature.icon className={`w-12 h-12 ${feature.color} mb-6 group-hover:text-gold transition-colors`} />
              <h3 className="text-xl font-bold text-navy mb-4">{feature.title}</h3>
              <p className="text-muted/80 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Premium CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-navy via-[#1a3a5a] to-navy p-12 md:p-16 border border-gold/30"
        >
          {/* Background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-8">
              <Sparkles className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                  Comece Sua Jornada Intelectual Hoje
                </h3>
                <p className="text-lg text-white/80 leading-relaxed mb-8">
                  Acesso a mais de 500 obras clássicas em Filosofia, Teologia, Literatura Brasileira e Portuguesa. Leia online, sem interrupções, sem publicidade.
                </p>

                {/* Benefits list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    '✓ Biblioteca completa desbloqueada',
                    '✓ Leitura offline (em breve)',
                    '✓ Marcadores e anotações',
                    '✓ Suporte prioritário'
                  ].map((benefit, idx) => (
                    <p key={idx} className="text-white/90 font-medium flex items-center gap-2">
                      {benefit}
                    </p>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={handleSubscribe}
                    disabled={isLoggingIn}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-gold text-navy font-black text-sm uppercase tracking-[0.3em] rounded-lg hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 flex items-center justify-center gap-2 group"
                  >
                    <Crown className="w-5 h-5" />
                    <span>
                      {isLoggingIn ? 'Conectando...' : profile?.status === 'approved' ? 'Acessar Biblioteca' : 'Assinar Agora'}
                    </span>
                    {!isLoggingIn && <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />}
                  </motion.button>

                  <motion.button
                    onClick={() => document.getElementById('biblioteca')?.scrollIntoView({ behavior: 'smooth' })}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 border-2 border-white text-white font-black text-sm uppercase tracking-[0.3em] rounded-lg hover:bg-white/10 transition-all duration-300"
                  >
                    Explorar Catálogo
                  </motion.button>
                </div>

                {/* Trust badge */}
                <p className="mt-8 text-white/60 text-sm">
                  💳 Pagamento seguro via Mercado Pago · 📱 Acesso imediato · ❌ Sem compromisso
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pricing info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted/80 text-lg mb-4">
            <span className="text-3xl font-black text-navy">R$ 11,00</span> por mês
          </p>
          <p className="text-sm text-muted/60">
            Cancele a qualquer momento. Sem taxas ocultas. Sem compromisso.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
