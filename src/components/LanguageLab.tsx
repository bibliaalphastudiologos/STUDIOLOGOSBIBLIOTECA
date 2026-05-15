import React, { useMemo, useState } from 'react';
import { BookMarked, CheckCircle2, ExternalLink, Loader2, Search, Sparkles } from 'lucide-react';

type WikiResult = {
  title: string;
  extract: string;
  content_urls?: {
    desktop?: {
      page?: string;
    };
  };
};

type LanguageToolMatch = {
  message: string;
  shortMessage?: string;
  offset: number;
  length: number;
  rule: {
    id: string;
    category?: {
      name: string;
    };
  };
  replacements: Array<{ value: string }>;
};

export const LanguageLab: React.FC = () => {
  const [term, setTerm] = useState('concordância verbal');
  const [wikiResult, setWikiResult] = useState<WikiResult | null>(null);
  const [wikiStatus, setWikiStatus] = useState('');
  const [text, setText] = useState('Nós vai revisar a redação antes de entregar para a professora amanha.');
  const [matches, setMatches] = useState<LanguageToolMatch[]>([]);
  const [checkStatus, setCheckStatus] = useState('');

  const encodedTerm = useMemo(() => encodeURIComponent(term.trim()), [term]);

  const references = [
    {
      name: 'ABL / VOLP',
      detail: 'Vocabulário Ortográfico da Língua Portuguesa',
      url: `https://www.academia.org.br/nossa-lingua/busca-no-vocabulario?sid=${encodedTerm}`
    },
    {
      name: 'Dicio',
      detail: 'Definições, sinônimos e exemplos',
      url: `https://www.dicio.com.br/pesquisa.php?q=${encodedTerm}`
    },
    {
      name: 'Portal da Língua Portuguesa',
      detail: 'Vocabulário, acordos e recursos linguísticos',
      url: `https://www.portaldalinguaportuguesa.org/?action=lemma&lemma=${encodedTerm}`
    },
    {
      name: 'Norma Culta',
      detail: 'Explicações gramaticais para consulta rápida',
      url: `https://www.normaculta.com.br/?s=${encodedTerm}`
    }
  ];

  async function searchWikipedia() {
    if (!term.trim()) return;
    setWikiStatus('consultando');
    setWikiResult(null);
    try {
      const response = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodedTerm}`);
      if (!response.ok) throw new Error('verbete não encontrado');
      const data = await response.json();
      setWikiResult(data);
      setWikiStatus('consulta concluída');
    } catch (error) {
      setWikiStatus(error instanceof Error ? error.message : 'falha na consulta');
    }
  }

  async function checkText() {
    if (!text.trim()) return;
    setCheckStatus('analisando');
    setMatches([]);
    try {
      const body = new URLSearchParams({
        text,
        language: 'pt-BR'
      });
      const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body
      });
      if (!response.ok) throw new Error('serviço indisponível no momento');
      const data = await response.json();
      setMatches(data.matches || []);
      setCheckStatus('correção concluída');
    } catch (error) {
      setCheckStatus(error instanceof Error ? error.message : 'falha na correção');
    }
  }

  return (
    <div className="ebook-page flex flex-col gap-8">
      <header className="border-b border-slate-200 pb-6">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-em-purple">Laboratório conectado</span>
        <h2 className="font-heading text-4xl font-bold text-slate-800 mt-2">Pesquisa, vocabulário e revisão em português</h2>
        <p className="text-sm text-slate-500 mt-3 max-w-2xl">
          Ferramentas gratuitas para apoiar aula, preparação de material, consulta lexical e revisão de textos em português do Brasil.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Search className="text-ef-blue" size={20} />
            <h3 className="font-heading font-bold text-slate-800">Consulta de aula</h3>
          </div>
          <div className="flex gap-2">
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-ef-blue"
              placeholder="Digite um termo"
            />
            <button onClick={searchWikipedia} className="rounded-xl bg-ef-blue px-4 py-2 text-xs font-bold text-white">
              Buscar
            </button>
          </div>
          <div className="mt-4 min-h-36 rounded-xl border border-slate-200 bg-white p-4">
            {wikiStatus === 'consultando' && <p className="flex items-center gap-2 text-xs text-slate-500"><Loader2 size={14} className="animate-spin" /> Consultando Wikipédia...</p>}
            {wikiResult && (
              <div>
                <h4 className="font-heading font-bold text-slate-800">{wikiResult.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{wikiResult.extract}</p>
                {wikiResult.content_urls?.desktop?.page && (
                  <a className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-ef-blue" href={wikiResult.content_urls.desktop.page} target="_blank" rel="noreferrer">
                    Abrir verbete <ExternalLink size={12} />
                  </a>
                )}
              </div>
            )}
            {!wikiResult && wikiStatus && wikiStatus !== 'consultando' && <p className="text-xs text-slate-500">{wikiStatus}</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="text-emerald-600" size={20} />
            <h3 className="font-heading font-bold text-slate-800">Corretor gramatical</h3>
          </div>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className="h-28 w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-emerald-500"
          />
          <button onClick={checkText} className="mt-3 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white">
            Corrigir com LanguageTool
          </button>
          <div className="mt-4 max-h-44 overflow-auto rounded-xl border border-slate-200 bg-white p-4">
            {checkStatus === 'analisando' && <p className="flex items-center gap-2 text-xs text-slate-500"><Loader2 size={14} className="animate-spin" /> Analisando texto...</p>}
            {matches.length === 0 && checkStatus === 'correção concluída' && <p className="text-xs text-emerald-700">Nenhum problema encontrado pelo serviço.</p>}
            {matches.map((match, index) => (
              <article key={`${match.rule.id}-${index}`} className="mb-3 border-b border-slate-100 pb-3 last:mb-0 last:border-b-0 last:pb-0">
                <p className="text-xs font-semibold text-slate-800">{match.shortMessage || match.message}</p>
                <p className="mt-1 text-[11px] text-slate-500">{match.rule.category?.name || match.rule.id}</p>
                {match.replacements.length > 0 && (
                  <p className="mt-2 text-[11px] text-emerald-700">
                    Sugestões: {match.replacements.slice(0, 4).map((item) => item.value).join(', ')}
                  </p>
                )}
              </article>
            ))}
            {checkStatus && checkStatus !== 'analisando' && checkStatus !== 'correção concluída' && <p className="text-xs text-slate-500">{checkStatus}</p>}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <BookMarked className="text-em-gold" size={20} />
          <h3 className="font-heading font-bold text-slate-800">Sites gratuitos conectados</h3>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {references.map((reference) => (
            <a key={reference.name} href={reference.url} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-em-purple hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <Sparkles size={16} className="text-em-purple" />
                <ExternalLink size={13} className="text-slate-300" />
              </div>
              <strong className="text-sm text-slate-800">{reference.name}</strong>
              <p className="mt-1 text-[11px] leading-snug text-slate-500">{reference.detail}</p>
            </a>
          ))}
        </div>
      </section>

      <footer className="mt-auto flex justify-between border-t border-slate-200 pt-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <span>APIs e consultas gratuitas: uso leve e pedagógico</span>
        <span>Página 398</span>
      </footer>
    </div>
  );
};
