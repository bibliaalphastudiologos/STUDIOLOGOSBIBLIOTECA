import React, { useState } from 'react';
import { Unit, Exercise, Grade } from '../types';
import { CheckCircle2, HelpCircle, Lightbulb, Target, Map, Users, PenTool, Sparkles, ClipboardList, MessageCircle, Brain } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  unit: Unit;
  pageNumber: number;
}

export const PageUnit: React.FC<Props> = ({ unit, pageNumber }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const isEM = unit.grade === Grade.EM2 || unit.grade === Grade.EM3;
  const accentColor = isEM ? 'text-em-purple' : 'text-ef-blue';
  const bgColor = isEM ? 'bg-em-dark' : 'bg-ef-blue';
  const borderClass = isEM ? 'border-em-purple' : 'border-ef-blue';

  const handleSelect = (exId: string, idx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [exId]: idx }));
  };

  return (
    <div className="ebook-page flex flex-col">
      {/* Header */}
      <div className="mb-8 relative">
        <div className={`absolute top-0 left-0 w-2 h-full ${bgColor}`}></div>
        <div className="pl-6">
          <div className="flex justify-between items-start mb-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${accentColor}`}>{unit.grade}</span>
            <span className="text-[10px] font-mono text-slate-400">UNIT_{unit.id.toUpperCase()}</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-slate-800 leading-tight mb-2">
            {unit.title}
          </h2>
          <div className="flex flex-wrap gap-2">
            {unit.skills.map(s => (
              <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[9px] font-bold border border-slate-200">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-8 flex-1">
        <div className="col-span-8">
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm lg:text-base mb-8">
             <ReactMarkdown>{unit.content}</ReactMarkdown>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="box-premium border-ef-orange bg-orange-50">
              <div className="flex gap-3">
                <Sparkles className="text-ef-orange shrink-0" size={20} />
                <div>
                  <h4 className="mini-title text-ef-orange">Curiosidade</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">{unit.curiosity}</p>
                </div>
              </div>
            </div>
            <div className="box-premium border-ef-green bg-emerald-50">
              <div className="flex gap-3">
                <MessageCircle className="text-ef-green shrink-0" size={20} />
                <div>
                  <h4 className="mini-title text-ef-green">Português no cotidiano</h4>
                  <p className="text-xs text-slate-700 leading-relaxed">{unit.everydayPortuguese}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${borderClass} bg-slate-50 mb-8`}>
            <div className="flex items-center gap-2 mb-3">
              <Target size={20} className={accentColor} />
              <h4 className={`font-heading font-bold text-xs uppercase tracking-wider ${accentColor}`}>Exercícios de Fixação</h4>
            </div>
            <div className="space-y-6">
              {unit.exercises.map(ex => (
                <div key={ex.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-slate-100 text-slate-400 rounded uppercase">Nível: {ex.difficulty}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-50 text-amber-700 rounded uppercase">{ex.examStyle}</span>
                    <span className="text-[9px] font-mono text-slate-400">{ex.skill}</span>
                  </div>
                  <p className="font-medium text-slate-800 mb-4">{ex.question}</p>
                  <div className="space-y-2">
                    {ex.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelect(ex.id, i)}
                        className={`w-full text-left p-3 rounded-lg border transition-all text-sm flex items-center gap-3 ${
                          selectedAnswers[ex.id] === i 
                            ? 'border-em-purple bg-blue-50' 
                            : 'border-slate-100 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${
                           selectedAnswers[ex.id] === i ? 'bg-em-purple text-white border-em-purple' : 'bg-slate-100 border-slate-200 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </div>
                        {opt}
                      </button>
                    ))}
                  </div>
                  
                  {selectedAnswers[ex.id] !== undefined && (
                    <div className="mt-4">
                      <button 
                        onClick={() => setShowExplanations(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                        className={`text-[10px] font-bold uppercase tracking-widest ${accentColor} flex items-center gap-1`}
                      >
                        <HelpCircle size={12} />
                        {showExplanations[ex.id] ? 'Ocultar Explicação' : 'Ver Gabarito Comentado'}
                      </button>
                      {showExplanations[ex.id] && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="mt-3 p-3 bg-emerald-50 border-l-2 border-emerald-400 text-emerald-900 text-xs leading-relaxed rounded-r-lg"
                        >
                          <span className="font-bold">RESPOSTA CORRETA: {String.fromCharCode(65 + ex.correctOption)}</span>
                          <p className="mt-1">{ex.explanation}</p>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList size={18} className={accentColor} />
              <h4 className="font-heading font-bold text-[10px] uppercase text-slate-500">Instruções ao professor</h4>
            </div>
            <ol className="space-y-2">
              {unit.teacherInstructions?.map((step, i) => (
                <li key={step} className="text-xs text-slate-600 flex gap-2 leading-snug">
                  <span className={`font-bold ${accentColor}`}>{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={18} className="text-orange-400" />
              <h4 className="font-heading font-bold text-[10px] uppercase text-slate-500">Exemplos</h4>
            </div>
            <ul className="space-y-2">
              {unit.examples.map((ex, i) => (
                <li key={i} className="text-xs text-slate-600 flex gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-200 rounded-full mt-1.5 shrink-0"></div>
                  {ex}
                </li>
              ))}
            </ul>
          </div>

          <div className={`rounded-2xl p-4 border text-white ${bgColor}`}>
            <div className="flex items-center gap-2 mb-3">
              <Users size={18} />
              <h4 className="font-heading font-bold text-[10px] uppercase">Dinâmica Premium</h4>
            </div>
            <p className="text-xs opacity-90 leading-relaxed font-light">
              {unit.dynamic}
            </p>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 ">
            <div className="flex items-center gap-2 mb-3">
              <PenTool size={18} className="text-emerald-600" />
              <h4 className="font-heading font-bold text-[10px] uppercase text-emerald-600">Produção Textual</h4>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed italic">
              "{unit.textProduction}"
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h5 className="text-[9px] font-bold uppercase text-slate-400 mb-3 tracking-widest text-center">Resumo Visual</h5>
            <div className="bg-slate-100 rounded-xl border-2 border-dashed border-slate-200 p-4">
              <div className="grid grid-cols-2 gap-2">
                {unit.visualSummary?.map((item) => (
                  <div key={item} className="bg-white rounded-lg p-2 text-[10px] text-slate-600 font-bold text-center shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Brain size={18} className="text-em-gold" />
              <h4 className="font-heading font-bold text-[10px] uppercase">Mapa mental</h4>
            </div>
            <div className="mind-map">
              {unit.mentalMap?.map((node, i) => (
                <span key={node} className={i === 0 ? 'root' : ''}>{node}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-8 flex justify-between items-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <span>{unit.grade}</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span>Português em Ação</span>
        </div>
        <span>PÁGINA {pageNumber.toString().padStart(2, '0')}</span>
      </div>
    </div>
  );
};
