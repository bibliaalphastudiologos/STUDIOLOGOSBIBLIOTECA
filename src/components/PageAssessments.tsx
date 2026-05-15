import React from 'react';
import { ClipboardCheck, FileText, Gauge, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { UNITS } from '../data';
import { Grade } from '../types';

const assessmentPlan = [
  ['Diagnóstico', 'Semana 1', 'Leitura, inferência, vocabulário e escrita inicial.'],
  ['Bimestral 1', 'Fechamento do 1º bimestre', 'Tirinhas, fake news, tese e competências ENEM.'],
  ['Bimestral 2', 'Fechamento do 2º bimestre', 'Narrativa, verbos, resenha, regência e gêneros argumentativos.'],
  ['Bimestral 3', 'Fechamento do 3º bimestre', 'Notícia, conectivos, modernismo e estratégias de prova.'],
  ['Final', 'Último bimestre', 'Revisão geral, simulado acumulativo e redação completa.'],
];

export const PageAssessments: React.FC = () => {
  const grouped = Object.values(Grade).map((grade) => ({
    grade,
    units: UNITS.filter((unit) => unit.grade === grade),
  }));
  const routines: Array<{ title: string; text: string; Icon: LucideIcon }> = [
    { title: 'Correção comentada', text: 'Explique por que a alternativa correta resolve o comando e por que os distratores parecem plausíveis.', Icon: FileText },
    { title: 'Diário de erro', text: 'Classifique cada erro por habilidade, conteúdo, atenção, tempo ou repertório.', Icon: Gauge },
    { title: 'Reensino rápido', text: 'Retome a habilidade com mini-aula, novo exemplo e questão paralela em até 15 minutos.', Icon: ClipboardCheck },
  ];

  return (
    <div className="ebook-page">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="eyebrow">Avaliações e simulados</span>
          <h2 className="page-title">Plano anual de desempenho</h2>
          <p className="text-slate-600 max-w-2xl">
            Sequência de simulados diagnósticos, bimestrais e finais com itens objetivos, habilidade BNCC, nível de dificuldade e gabarito comentado.
          </p>
        </div>
        <div className="icon-badge bg-em-gold text-slate-900">
          <Trophy size={34} />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-8">
        {assessmentPlan.map(([name, date, focus]) => (
          <div key={name} className="assessment-card">
            <ClipboardCheck size={18} />
            <h3>{name}</h3>
            <strong>{date}</strong>
            <p>{focus}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {grouped.map(({ grade, units }) => (
          <div key={grade} className="grade-card">
            <h4>{grade}</h4>
            <p className="text-xs text-slate-500 mb-3">{units.length} unidades e {units.reduce((sum, unit) => sum + unit.exercises.length, 0)} itens objetivos.</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(units.flatMap((unit) => unit.exercises.map((ex) => ex.examStyle)))).map((style) => (
                <span key={style} className="pill">{style}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {routines.map(({ title, text, Icon }) => (
          <div key={title} className="info-panel">
            <Icon className="text-ef-blue" size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
