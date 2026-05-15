import React from 'react';
import { BarChart3, Clock, NotebookTabs, Users } from 'lucide-react';
import { SCHEDULE } from '../data';

const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];

export const PageTeacherPlanner: React.FC = () => {
  const lessons = SCHEDULE.filter((slot) => slot.type === 'Aula');
  const byGrade = lessons.reduce<Record<string, number>>((acc, slot) => {
    const key = slot.grade ?? 'Outros';
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="ebook-page">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="eyebrow">Planejamento extraído do PDF</span>
          <h2 className="page-title">Grade semanal do professor</h2>
        </div>
        <div className="icon-badge">
          <Clock size={34} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-8">
        {Object.entries(byGrade).map(([grade, total]) => (
          <div key={grade} className="metric-card">
            <strong>{total}</strong>
            <span>{grade}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-8">
        {days.map((day) => (
          <div key={day} className="schedule-day">
            <h3>{day}</h3>
            <div className="schedule-grid">
              {SCHEDULE.filter((slot) => slot.day === day).map((slot) => (
                <div key={`${slot.day}-${slot.time}-${slot.activity}`} className={`schedule-slot ${slot.type.toLowerCase()}`}>
                  <span>{slot.time}</span>
                  <strong>{slot.activity}</strong>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="box-premium border-ef-blue bg-blue-50">
          <div className="flex gap-3">
            <NotebookTabs className="text-ef-blue shrink-0" />
            <p className="text-sm text-slate-700">
              Use a primeira aula semanal de cada turma para leitura orientada e a segunda para produção, correção ou simulado curto.
            </p>
          </div>
        </div>
        <div className="box-premium border-em-purple bg-purple-50">
          <div className="flex gap-3">
            <BarChart3 className="text-em-purple shrink-0" />
            <p className="text-sm text-slate-700">
              Registre presença, habilidade trabalhada, nota do item e observação no CSV para acompanhar evolução no Power BI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
