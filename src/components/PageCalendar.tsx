import React from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, Info } from 'lucide-react';

export const PageCalendar: React.FC = () => {
  const events = [
    { date: '02/02', title: 'Início das Aulas', style: 'bg-ef-blue' },
    { date: '06/07', title: 'Fim do 1º Semestre', style: 'bg-ef-green' },
    { date: '07/07 - 23/07', title: 'Férias / Recesso', style: 'bg-slate-200 text-slate-800' },
    { date: '18, 21 e 22/07', title: 'Planejamento Escolar', style: 'bg-ef-orange' },
    { date: '24/07', title: 'Retorno das Aulas', style: 'bg-ef-blue' },
    { date: '18/12', title: 'Término do Ano Letivo', style: 'bg-em-purple text-white' },
  ];

  return (
    <div className="ebook-page">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-em-purple text-white rounded-xl">
          <CalendarIcon size={32} />
        </div>
        <div>
          <h2 className="font-heading text-3xl font-bold text-em-dark">CALENDÁRIO LETIVO 2026</h2>
          <p className="text-slate-500 font-medium">Cronograma Oficial e Planejamento Estratégico</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-12">
        <div className="relative pl-8 border-l-2 border-slate-100 flex flex-col gap-8">
          {events.map((event, index) => (
            <div key={index} className="relative">
              <div className={`absolute -left-[41px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white ${event.style.split(' ')[0]}`}></div>
              <div className={`p-4 rounded-xl flex items-center justify-between shadow-sm border border-slate-100 ${event.style.includes('text') ? event.style : event.style + ' text-white'}`}>
                <span className="font-bold text-lg">{event.date}</span>
                <span className="font-heading font-medium">{event.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="box-premium border-em-purple bg-blue-50">
        <div className="flex gap-4">
          <Info className="text-em-purple shrink-0" />
          <div>
            <h4 className="font-heading font-bold text-em-purple mb-1 text-sm uppercase">Nota do Autor</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              Este material foi organizado para maximizar o tempo de sala. Siga o cronograma bimestral para garantir que todas as habilidades sejam cobertas antes das avaliações oficiais (SARESP, ENEM, AAP).
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-12 text-[10px] text-slate-400 font-bold tracking-widest flex justify-between uppercase">
        <span>Organização Bimestral 2026</span>
        <span>Página 03</span>
      </div>
    </div>
  );
};
