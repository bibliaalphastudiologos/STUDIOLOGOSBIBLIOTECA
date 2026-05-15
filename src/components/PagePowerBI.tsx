import React from 'react';
import { BarChart3, Database, FileSpreadsheet, Filter, LineChart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const PagePowerBI: React.FC = () => {
  const files: Array<{ title: string; path: string; Icon: LucideIcon }> = [
    { title: 'Base', path: 'data/powerbi/diario_unidades.csv', Icon: Database },
    { title: 'Horário', path: 'data/powerbi/grade_horaria.csv', Icon: FileSpreadsheet },
    { title: 'Lançamentos', path: 'data/powerbi/lancamentos_modelo.csv', Icon: LineChart },
  ];

  return (
    <div className="ebook-page">
      <div className="flex items-start justify-between mb-8">
        <div>
          <span className="eyebrow">Power BI</span>
          <h2 className="page-title">Painel de acompanhamento</h2>
          <p className="text-slate-600 max-w-2xl">
            Estrutura pronta para importar em Power BI Desktop: turmas, horário, unidades, habilidades, simulados, presença e desempenho por estudante.
          </p>
        </div>
        <div className="icon-badge bg-ef-blue">
          <BarChart3 size={34} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {files.map(({ title, path, Icon }) => (
          <div key={title} className="info-panel">
            <Icon className="text-em-purple" size={24} />
            <h3>{title}</h3>
            <p className="font-mono">{path}</p>
          </div>
        ))}
      </div>

      <section className="mb-8">
        <div className="section-heading">
          <Filter size={18} />
          <h3>Visuais recomendados</h3>
        </div>
        <div className="dashboard-wireframe">
          <div className="dash-card wide">Evolução por bimestre</div>
          <div className="dash-card">Média por turma</div>
          <div className="dash-card">Habilidades críticas</div>
          <div className="dash-card">Presença x desempenho</div>
          <div className="dash-card wide">Mapa de calor: unidade, turma e avaliação</div>
        </div>
      </section>

      <div className="box-premium border-em-purple bg-purple-50">
        <h3 className="font-heading font-bold text-em-purple mb-2 uppercase text-xs">Como conectar</h3>
        <ol className="text-sm text-slate-700 space-y-2">
          <li>1. Abra o Power BI Desktop e escolha Obter Dados &gt; Texto/CSV.</li>
          <li>2. Importe os três arquivos da pasta data/powerbi.</li>
          <li>3. Relacione diario_unidades[unit_id] com lancamentos_modelo[unit_id].</li>
          <li>4. Use turma, ano_serie, bimestre, habilidade e avaliacao como filtros do relatório.</li>
        </ol>
      </div>
    </div>
  );
};
