import React from 'react';
import { PAYMENT_LINKS } from '../types';
import { motion } from 'framer-motion';
import { Mail, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = () => {
    window.open(PAYMENT_LINKS.studioLogosMonthly, '_blank');
  };

  return (
    <footer className="bg-navy text-white">
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border-t border-white/10 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Ainda não é membro?
              </h3>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Acesse a biblioteca completa e comece a explorar as grandes obras clássicas hoje mesmo.
              </p>
              <p className="text-gold font-black text-xl">
                R$ 47,00 por 1 ano de acesso
              </p>
            </div>

            <motion.button
              onClick={handleSubscribe}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-gold text-navy font-black text-lg uppercase tracking-[0.3em] rounded-lg hover:bg-white transition-all duration-300 shadow-2xl hover:shadow-gold/50 flex items-center justify-center gap-3 group w-full md:w-auto"
            >
              <span>Assinar Agora</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Footer */}
      <div className="border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-2xl font-serif font-bold text-gold mb-4">Studio Logos</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Plataforma premium de leitura online. Grandes obras clássicas para quem deseja estudar, pesquisar e crescer intelectualmente.
              </p>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h5 className="text-sm font-black uppercase tracking-[0.3em] text-gold mb-6">Categorias</h5>
              <ul className="space-y-3 text-sm text-white/70">
                <li><a href="/teologia" className="hover:text-gold transition-colors">Teologia</a></li>
                <li><a href="/filosofia" className="hover:text-gold transition-colors">Filosofia</a></li>
                <li><a href="/psicanalise" className="hover:text-gold transition-colors">Psicanálise</a></li>
                <li><a href="/" className="hover:text-gold transition-colors">Todas as Obras</a></li>
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h5 className="text-sm font-black uppercase tracking-[0.3em] text-gold mb-6">Recursos</h5>
              <ul className="space-y-3 text-sm text-white/70">
                <li><a href="/" className="hover:text-gold transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Contato</a></li>
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h5 className="text-sm font-black uppercase tracking-[0.3em] text-gold mb-6">Contato</h5>
              <div className="space-y-4">
                <a href="mailto:contato@studiologos.com.br" className="flex items-center gap-2 text-white/70 hover:text-gold transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">contato@studiologos.com.br</span>
                </a>
                <div className="flex gap-4 pt-4">
                  {[
                    { icon: Facebook, href: '#' },
                    { icon: Twitter, href: '#' },
                    { icon: Instagram, href: '#' },
                    { icon: Linkedin, href: '#' }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/60 text-sm">
                © {currentYear} Studio Logos. Todos os direitos reservados.
              </p>
              <div className="flex gap-6 text-sm text-white/60">
                <a href="#" className="hover:text-gold transition-colors">Privacidade</a>
                <a href="#" className="hover:text-gold transition-colors">Termos de Uso</a>
                <a href="#" className="hover:text-gold transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black/30 py-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-white/40">
          Desenvolvido com ❤️ para amantes de grandes obras clássicas
        </div>
      </div>
    </footer>
  );
};
