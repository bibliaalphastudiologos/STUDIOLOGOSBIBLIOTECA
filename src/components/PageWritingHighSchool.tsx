import React from 'react';
import { Award, CheckCircle, Flame, Star, Zap, Pen } from 'lucide-react';

export const PageWritingHighSchool: React.FC = () => {
  const competencies = [
    { n: 1, text: 'Domínio da norma culta da língua escrita.', icon: <CheckCircle size={14} /> },
    { n: 2, text: 'Compreensão da proposta e aplicação de diversas áreas de conhecimento.', icon: <Zap size={14} /> },
    { n: 3, text: 'Capacidade de selecionar, relacionar, organizar e interpretar informações.', icon: <Star size={14} /> },
    { n: 4, text: 'Demonstrar conhecimento dos mecanismos linguísticos (coerência/coesão).', icon: <Flame size={14} /> },
    { n: 5, text: 'Elaboração de proposta de intervenção social com respeito aos direitos humanos.', icon: <Award size={14} /> },
  ];

  const connectors = [
    { cat: 'Introdução', items: ['Em primeira análise...', 'Historicamente...', 'Sob a ótica de...'] },
    { cat: 'Desenvolvimento', items: ['Ademais...', 'Em contrapartida...', 'Nessa perspectiva...'] },
    { cat: 'Conclusão', items: ['Portanto...', 'Em suma...', 'Logo, torna-se evidente que...'] },
  ];

  return (
    <div className="ebook-page flex flex-col bg-slate-50">
      <div className="absolute top-0 right-0 p-8">
         <div className="w-24 h-24 border-4 border-em-gold rounded-full flex items-center justify-center -rotate-12 bg-white shadow-xl">
           <span className="text-em-gold font-bold text-2xl">1000</span>
         </div>
      </div>

      <div className="mb-8">
        <h2 className="font-heading text-5xl font-extrabold text-em-dark tracking-tighter mb-2">REDAÇÃO <span className="text-em-gold">NOTA ALTA</span></h2>
        <div className="h-1.5 w-32 bg-em-gold mb-6"></div>
        <p className="text-slate-600 font-medium max-w-md italic">O guia definitivo para o Ensino Médio: ENEM, Provão Paulista e Vestibulares.</p>
      </div>

      <div className="grid grid-cols-2 gap-8 flex-1">
        <div>
          <h3 className="font-heading font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
            <Award className="text-em-gold" /> As 5 Competências
          </h3>
          <div className="space-y-3">
            {competencies.map(c => (
              <div key={c.n} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex gap-3 items-start">
                <div className="w-6 h-6 rounded-lg bg-em-gold/10 text-em-gold flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  C{c.n}
                </div>
                <p className="text-xs text-slate-700 leading-snug">{c.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-em-dark text-white p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Pen size={100} />
            </div>
            <h4 className="font-heading font-bold mb-3 flex items-center gap-2">
              <Zap className="text-em-gold" /> Projeto de Texto
            </h4>
            <ul className="space-y-2 text-xs font-light">
              <li className="flex gap-2"><span>1.</span><span>Analise a frase temática com cuidado.</span></li>
              <li className="flex gap-2"><span>2.</span><span>Defina sua tese (ponto de vista).</span></li>
              <li className="flex gap-2"><span>3.</span><span>Selecione 2 argumentos principais.</span></li>
              <li className="flex gap-2"><span>4.</span><span>Pense na Proposta de Intervenção.</span></li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm h-full">
              <h3 className="font-heading font-bold text-slate-800 text-lg mb-4">Banco de Conectivos</h3>
              <div className="space-y-4">
                {connectors.map(c => (
                  <div key={c.cat}>
                    <span className="text-[10px] font-bold text-em-gold uppercase tracking-widest">{c.cat}</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {c.items.map(item => (
                        <span key={item} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-xs text-slate-600">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 border-2 border-dashed border-em-gold/30 rounded-xl bg-orange-50/30">
                <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-tight">Modelo pronto de introdução</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  No Brasil contemporâneo, o problema de [tema] revela um entrave social persistente. Nessa perspectiva, a questão se sustenta pela combinação de [causa 1] e [causa 2], o que exige ação coordenada do poder público e da sociedade.
                </p>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-tight">Repertórios coringa</h4>
                <ul className="text-[11px] text-slate-600 leading-relaxed space-y-1">
                  <li>Constituição Federal de 1988: cidadania, dignidade e direitos sociais.</li>
                  <li>Paulo Freire: educação crítica e formação cidadã.</li>
                  <li>Zygmunt Bauman: relações sociais marcadas pela fluidez.</li>
                  <li>Agenda 2030 da ONU: desigualdade, educação, saúde e sustentabilidade.</li>
                </ul>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-white border border-slate-200">
                <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-tight">Propostas comentadas</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Temas atuais: combate à desinformação digital; desafios da permanência escolar; valorização da leitura; saúde mental juvenil; uso ético da inteligência artificial. Em cada proposta, exija tese, dois argumentos, repertório legitimado e intervenção com agente, ação, meio, finalidade e detalhamento.
                </p>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-auto pt-8 flex justify-between items-center text-[10px] font-mono text-slate-400 font-bold uppercase">
        <span>Módulo Redação Nota Alta</span>
        <span>Página Final</span>
      </div>
    </div>
  );
};
