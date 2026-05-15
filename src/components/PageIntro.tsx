import React from 'react';
import { BookOpen, CheckCircle2, Compass, FileCheck2, GraduationCap, Link2, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ALIGNMENT_REFERENCES, METHOD_BY_GRADE } from '../data';
import { Grade } from '../types';

export const PageIntro: React.FC = () => {
  const grades = Object.values(Grade);
  const overviewCards: Array<{ title: string; text: string; Icon: LucideIcon }> = [
    { title: 'Objetivo', text: 'Entregar aulas prontas, exercícios, simulados e registros para o ano letivo.', Icon: Target },
    { title: 'Metodologia', text: 'Aula curta, prática guiada, produção autoral e devolutiva por habilidade.', Icon: Compass },
    { title: 'Avaliação', text: 'Itens no padrão SARESP, AAP, SAEB, Provão Paulista e ENEM.', Icon: FileCheck2 },
  ];

  return (
    <div className="ebook-page">
      <div className="flex items-start justify-between gap-8 mb-8">
        <div>
          <span className="eyebrow">Manual do Professor</span>
          <h2 className="page-title">Diário anual avançado</h2>
          <p className="text-slate-600 leading-relaxed max-w-2xl">
            Material autossuficiente para planejar, conduzir, avaliar e registrar aulas de Língua Portuguesa na rede estadual de São Paulo, com foco em leitura, análise linguística, oralidade, produção textual e desempenho em avaliações externas.
          </p>
        </div>
        <div className="w-20 h-20 rounded-2xl bg-em-dark text-white flex items-center justify-center shadow-xl">
          <GraduationCap size={40} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {overviewCards.map(({ title, text, Icon }) => (
          <div key={title} className="info-panel">
            <Icon className="text-em-purple" size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>

      <section className="mb-8">
        <div className="section-heading">
          <BookOpen size={18} />
          <h3>Como usar</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            'Escolha a turma no índice e siga a unidade do bimestre.',
            'Use a explicação teórica como exposição principal da aula.',
            'Aplique exercícios por nível e corrija com o gabarito comentado.',
            'Registre evidências no diário e alimente o Power BI com os CSVs.',
          ].map((item) => (
            <div key={item} className="check-row">
              <CheckCircle2 size={16} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="section-heading">
          <Target size={18} />
          <h3>Organização por turma</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {grades.map((grade) => (
            <div key={grade} className="grade-card">
              <h4>{grade}</h4>
              <ul>
                {METHOD_BY_GRADE[grade].map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-heading">
          <Link2 size={18} />
          <h3>Referências oficiais usadas no alinhamento</h3>
        </div>
        <div className="space-y-2">
          {ALIGNMENT_REFERENCES.map((ref) => (
            <a key={ref.url} href={ref.url} target="_blank" rel="noreferrer" className="reference-row">
              <span>{ref.label}</span>
              <small>{ref.description}</small>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
