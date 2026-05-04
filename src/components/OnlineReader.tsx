import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ebook } from '../types';

interface Bookmark {
  id: string;
  chapterId: string;
  chapterTitle: string;
  scrollY: number;
  note?: string;
  createdAt: number;
}

interface Highlight {
  id: string;
  chapterId: string;
  text: string;
  color: string;
  note?: string;
  createdAt: number;
}

interface Note {
  id: string;
  chapterId: string;
  chapterTitle: string;
  content: string;
  createdAt: number;
}

interface OnlineReaderProps {
  ebook: Ebook;
  onClose: () => void;
}

const FONT_SIZES = [14, 16, 18, 20, 22, 24];
const THEMES = [
  { id: 'light', label: 'Claro', bg: '#faf8f3', text: '#2d2a24', surface: '#f0ede4' },
  { id: 'sepia', label: 'Sépia', bg: '#f5f0e8', text: '#3d3020', surface: '#ede4d3' },
  { id: 'dark', label: 'Escuro', bg: '#1a1814', text: '#e8e4dc', surface: '#252219' },
  { id: 'night', label: 'Noite', bg: '#0f0f0f', text: '#cccccc', surface: '#1a1a1a' },
];

const HIGHLIGHT_COLORS = [
  { id: 'yellow', color: '#fef08a', label: 'Amarelo' },
  { id: 'green', color: '#bbf7d0', label: 'Verde' },
  { id: 'blue', color: '#bfdbfe', label: 'Azul' },
  { id: 'pink', color: '#fbcfe8', label: 'Rosa' },
];

export default function OnlineReader({ ebook, onClose }: OnlineReaderProps) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [fontSizeIndex, setFontSizeIndex] = useState(2); // 18px default
  const [themeIndex, setThemeIndex] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [highlightMenuPos, setHighlightMenuPos] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ chapterIndex: number; excerpt: string }[]>([]);
  const [readingProgress, setReadingProgress] = useState<Record<string, number>>({});
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [showTopBar, setShowTopBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const chapterKey = ebook.chapters[currentChapterIndex]?.id;
  const theme = THEMES[themeIndex];
  const fontSize = FONT_SIZES[fontSizeIndex];
  const chapter = ebook.chapters[currentChapterIndex];
  const totalChapters = ebook.chapters.length;

  // Persist reading state in localStorage
  const storageKey = `reader_${ebook.id}`;
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.chapterIndex !== undefined) setCurrentChapterIndex(data.chapterIndex);
        if (data.fontSizeIndex !== undefined) setFontSizeIndex(data.fontSizeIndex);
        if (data.themeIndex !== undefined) setThemeIndex(data.themeIndex);
        if (data.readingProgress) setReadingProgress(data.readingProgress);
        if (data.bookmarks) setBookmarks(data.bookmarks);
        if (data.highlights) setHighlights(data.highlights);
        if (data.notes) setNotes(data.notes);
      }
    } catch {}
  }, [storageKey]);

  const saveState = useCallback(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        chapterIndex: currentChapterIndex,
        fontSizeIndex,
        themeIndex,
        readingProgress,
        bookmarks,
        highlights,
        notes,
      }));
    } catch {}
  }, [storageKey, currentChapterIndex, fontSizeIndex, themeIndex, readingProgress, bookmarks, highlights, notes]);

  useEffect(() => { saveState(); }, [saveState]);

  // Reading progress tracking
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const progress = scrollHeight <= clientHeight ? 100 : Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
      setReadingProgress(prev => ({ ...prev, [chapterKey]: progress }));

      // Hide/show top bar on scroll
      const diff = scrollTop - lastScrollY;
      if (diff > 5) setShowTopBar(false);
      else if (diff < -5) setShowTopBar(true);
      setLastScrollY(scrollTop);
    };
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [chapterKey, lastScrollY]);

  // Text selection for highlights
  useEffect(() => {
    const handleMouseUp = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) { setShowHighlightMenu(false); return; }
      const text = sel.toString().trim();
      if (text.length < 3 || text.length > 500) { setShowHighlightMenu(false); return; }
      setSelectedText(text);
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setHighlightMenuPos({ x: rect.left + rect.width / 2, y: rect.top - 8 });
      setShowHighlightMenu(true);
    };
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  // Search functionality
  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) { setSearchResults([]); return; }
    const results: { chapterIndex: number; excerpt: string }[] = [];
    const lower = q.toLowerCase();
    ebook.chapters.forEach((ch, idx) => {
      const stripped = ch.content.replace(/<[^>]+>/g, ' ');
      if (stripped.toLowerCase().includes(lower)) {
        const pos = stripped.toLowerCase().indexOf(lower);
        const start = Math.max(0, pos - 60);
        const end = Math.min(stripped.length, pos + q.length + 60);
        results.push({ chapterIndex: idx, excerpt: '…' + stripped.slice(start, end) + '…' });
      }
    });
    setSearchResults(results);
  };

  // Add bookmark
  const addBookmark = () => {
    const scrollY = contentRef.current?.scrollTop || 0;
    const bm: Bookmark = {
      id: Date.now().toString(),
      chapterId: chapterKey,
      chapterTitle: chapter.title,
      scrollY,
      createdAt: Date.now(),
    };
    setBookmarks(prev => [...prev, bm]);
  };

  const removeBookmark = (id: string) => setBookmarks(prev => prev.filter(b => b.id !== id));

  // Add highlight
  const addHighlight = (color: string) => {
    if (!selectedText) return;
    const h: Highlight = {
      id: Date.now().toString(),
      chapterId: chapterKey,
      text: selectedText,
      color,
      createdAt: Date.now(),
    };
    setHighlights(prev => [...prev, h]);
    setShowHighlightMenu(false);
    window.getSelection()?.removeAllRanges();
  };

  // Add note
  const saveNote = () => {
    if (!newNoteText.trim()) return;
    const n: Note = {
      id: Date.now().toString(),
      chapterId: chapterKey,
      chapterTitle: chapter.title,
      content: newNoteText,
      createdAt: Date.now(),
    };
    setNotes(prev => [...prev, n]);
    setNewNoteText('');
    setAddingNote(false);
  };

  const currentProgress = readingProgress[chapterKey] || 0;
  const overallProgress = Math.round(
    ((currentChapterIndex + currentProgress / 100) / totalChapters) * 100
  );
  const chapterHighlights = highlights.filter(h => h.chapterId === chapterKey);

  // Render chapter content with highlights applied
  const renderContent = () => {
    let html = chapter.content;
    // Apply highlights (simple text replacement — no DOM manipulation)
    chapterHighlights.forEach(h => {
      const escaped = h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      html = html.replace(
        new RegExp(`(${escaped})`, 'g'),
        `<mark style="background:${h.color};border-radius:2px;padding:0 2px">$1</mark>`
      );
    });
    return html;
  };

  return (
    <div
      style={{ background: theme.bg, color: theme.text }}
      className="fixed inset-0 z-50 flex flex-col overflow-hidden"
    >
      {/* TOP BAR */}
      <AnimatePresence>
        {(showTopBar || focusMode === false) && (
          <motion.div
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            exit={{ y: -60 }}
            transition={{ duration: 0.2 }}
            style={{ background: theme.surface, borderBottom: `1px solid ${theme.text}15` }}
            className="flex items-center justify-between px-4 py-2 gap-2 z-10 shrink-0"
          >
            {/* Left: close + title */}
            <div className="flex items-center gap-3 min-w-0">
              <button onClick={onClose} title="Fechar leitor"
                className="p-2 rounded-full hover:opacity-70 transition-opacity shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <div className="min-w-0">
                <p className="text-xs opacity-50 truncate">{ebook.title}</p>
                <p className="text-sm font-medium truncate">{chapter.title}</p>
              </div>
            </div>

            {/* Center: progress */}
            <div className="hidden md:flex items-center gap-2 text-xs opacity-60">
              <span>{currentChapterIndex + 1}/{totalChapters}</span>
              <div style={{ background: `${theme.text}20` }} className="w-24 h-1 rounded-full overflow-hidden">
                <div style={{ width: `${overallProgress}%`, background: '#c9a227' }} className="h-full rounded-full transition-all" />
              </div>
              <span>{overallProgress}%</span>
            </div>

            {/* Right: toolbar */}
            <div className="flex items-center gap-1 shrink-0">
              <ReaderBtn title="Buscar" onClick={() => { setShowSearch(s => !s); setShowTOC(false); setShowBookmarks(false); setShowNotes(false); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </ReaderBtn>
              <ReaderBtn title="Índice" onClick={() => { setShowTOC(s => !s); setShowSearch(false); setShowBookmarks(false); setShowNotes(false); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              </ReaderBtn>
              <ReaderBtn title="Marcadores" onClick={() => { setShowBookmarks(s => !s); setShowTOC(false); setShowSearch(false); setShowNotes(false); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </ReaderBtn>
              <ReaderBtn title="Notas" onClick={() => { setShowNotes(s => !s); setShowBookmarks(false); setShowTOC(false); setShowSearch(false); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </ReaderBtn>
              <ReaderBtn title="Adicionar marcador" onClick={addBookmark}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><line x1="12" y1="7" x2="12" y2="13"/><line x1="9" y1="10" x2="15" y2="10"/>
                </svg>
              </ReaderBtn>
              <ReaderBtn title="Configurações" onClick={() => setShowSettings(s => !s)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </ReaderBtn>
              <ReaderBtn title={focusMode ? 'Sair do modo foco' : 'Modo foco'} onClick={() => setFocusMode(f => !f)}>
                {focusMode
                  ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                  : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                }
              </ReaderBtn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* READING PROGRESS BAR */}
      <div style={{ background: `${theme.text}10` }} className="h-0.5 shrink-0">
        <div style={{ width: `${currentProgress}%`, background: '#c9a227' }} className="h-full transition-all duration-300" />
      </div>

      {/* MAIN AREA */}
      <div className="flex flex-1 overflow-hidden">

        {/* SIDE PANELS */}
        <AnimatePresence>
          {(showTOC || showBookmarks || showNotes || showSearch) && (
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ background: theme.surface, borderRight: `1px solid ${theme.text}15`, width: 300 }}
              className="flex flex-col overflow-hidden shrink-0"
            >
              {/* TOC */}
              {showTOC && (
                <div className="flex flex-col h-full overflow-hidden">
                  <div style={{ borderBottom: `1px solid ${theme.text}15` }} className="px-4 py-3 font-semibold text-sm">
                    Índice
                  </div>
                  <div className="overflow-y-auto flex-1 py-2">
                    {ebook.chapters.map((ch, idx) => (
                      <button
                        key={ch.id}
                        onClick={() => { setCurrentChapterIndex(idx); setShowTOC(false); contentRef.current?.scrollTo(0,0); }}
                        style={{
                          background: idx === currentChapterIndex ? `${theme.text}10` : 'transparent',
                          color: theme.text,
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:opacity-80 transition-all flex items-start gap-2"
                      >
                        <div style={{ width: 24, minWidth: 24 }} className="text-xs opacity-40 mt-0.5 text-right">{idx + 1}</div>
                        <div className="flex-1">
                          <div className={idx === currentChapterIndex ? 'font-medium' : ''}>{ch.title}</div>
                          {ch.estimatedMinutes && (
                            <div className="text-xs opacity-40 mt-0.5">{ch.estimatedMinutes} min</div>
                          )}
                          {readingProgress[ch.id] > 0 && (
                            <div style={{ background: `${theme.text}15` }} className="mt-1 h-0.5 rounded-full overflow-hidden">
                              <div style={{ width: `${readingProgress[ch.id]}%`, background: '#c9a227' }} className="h-full" />
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* BOOKMARKS */}
              {showBookmarks && (
                <div className="flex flex-col h-full overflow-hidden">
                  <div style={{ borderBottom: `1px solid ${theme.text}15` }} className="px-4 py-3 font-semibold text-sm flex justify-between items-center">
                    <span>Marcadores ({bookmarks.length})</span>
                    <button onClick={addBookmark} className="text-xs opacity-60 hover:opacity-100 underline">+ Adicionar</button>
                  </div>
                  <div className="overflow-y-auto flex-1 py-2">
                    {bookmarks.length === 0 && (
                      <div className="px-4 py-8 text-sm opacity-40 text-center">Nenhum marcador ainda.<br/>Clique no ícone 📌 para marcar.</div>
                    )}
                    {bookmarks.map(bm => (
                      <div key={bm.id} style={{ borderBottom: `1px solid ${theme.text}10` }} className="px-4 py-2.5 flex items-start justify-between gap-2">
                        <button
                          onClick={() => {
                            const idx = ebook.chapters.findIndex(c => c.id === bm.chapterId);
                            if (idx >= 0) { setCurrentChapterIndex(idx); setShowBookmarks(false); setTimeout(() => { contentRef.current?.scrollTo(0, bm.scrollY); }, 100); }
                          }}
                          className="text-left flex-1 hover:opacity-80"
                        >
                          <div className="text-sm font-medium">{bm.chapterTitle}</div>
                          <div className="text-xs opacity-40 mt-0.5">{new Date(bm.createdAt).toLocaleDateString('pt-BR')}</div>
                        </button>
                        <button onClick={() => removeBookmark(bm.id)} className="text-xs opacity-40 hover:opacity-80">✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NOTES */}
              {showNotes && (
                <div className="flex flex-col h-full overflow-hidden">
                  <div style={{ borderBottom: `1px solid ${theme.text}15` }} className="px-4 py-3 font-semibold text-sm flex justify-between items-center">
                    <span>Notas ({notes.length})</span>
                    <button onClick={() => setAddingNote(true)} className="text-xs opacity-60 hover:opacity-100 underline">+ Nova</button>
                  </div>
                  {addingNote && (
                    <div style={{ borderBottom: `1px solid ${theme.text}15` }} className="p-3 flex flex-col gap-2">
                      <textarea
                        value={newNoteText}
                        onChange={e => setNewNoteText(e.target.value)}
                        placeholder="Sua anotação..."
                        style={{ background: `${theme.text}08`, color: theme.text, borderColor: `${theme.text}20` }}
                        className="w-full text-sm p-2 rounded border resize-none h-20 focus:outline-none"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button onClick={saveNote} style={{ background: '#c9a227', color: '#fff' }} className="flex-1 text-xs py-1.5 rounded font-medium">Salvar</button>
                        <button onClick={() => setAddingNote(false)} style={{ background: `${theme.text}15` }} className="flex-1 text-xs py-1.5 rounded">Cancelar</button>
                      </div>
                    </div>
                  )}
                  <div className="overflow-y-auto flex-1 py-2">
                    {notes.length === 0 && !addingNote && (
                      <div className="px-4 py-8 text-sm opacity-40 text-center">Nenhuma nota ainda.<br/>Clique em "+ Nova" para anotar.</div>
                    )}
                    {notes.map(n => (
                      <div key={n.id} style={{ borderBottom: `1px solid ${theme.text}10` }} className="px-4 py-2.5">
                        <div className="text-xs opacity-40 mb-1">{n.chapterTitle} · {new Date(n.createdAt).toLocaleDateString('pt-BR')}</div>
                        <div className="text-sm">{n.content}</div>
                        <button onClick={() => setNotes(prev => prev.filter(x => x.id !== n.id))} className="text-xs opacity-30 hover:opacity-60 mt-1">remover</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SEARCH */}
              {showSearch && (
                <div className="flex flex-col h-full overflow-hidden">
                  <div style={{ borderBottom: `1px solid ${theme.text}15` }} className="px-4 py-3">
                    <input
                      value={searchQuery}
                      onChange={e => handleSearch(e.target.value)}
                      placeholder="Buscar no livro..."
                      style={{ background: `${theme.text}08`, color: theme.text, borderColor: `${theme.text}20` }}
                      className="w-full text-sm px-3 py-2 rounded border focus:outline-none"
                      autoFocus
                    />
                  </div>
                  <div className="overflow-y-auto flex-1 py-2">
                    {searchQuery && searchResults.length === 0 && (
                      <div className="px-4 py-8 text-sm opacity-40 text-center">Nenhum resultado encontrado.</div>
                    )}
                    {searchResults.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => { setCurrentChapterIndex(r.chapterIndex); setShowSearch(false); contentRef.current?.scrollTo(0,0); }}
                        style={{ borderBottom: `1px solid ${theme.text}10` }}
                        className="w-full text-left px-4 py-2.5 hover:opacity-80"
                      >
                        <div className="text-xs font-medium opacity-60 mb-0.5">{ebook.chapters[r.chapterIndex].title}</div>
                        <div className="text-sm opacity-80">{r.excerpt}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* SETTINGS PANEL (right) */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ x: 280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 280, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ background: theme.surface, borderLeft: `1px solid ${theme.text}15`, width: 260, right: 0, position: 'absolute', top: focusMode ? 0 : 52, bottom: 0, zIndex: 20 }}
              className="flex flex-col overflow-y-auto py-4 px-4 gap-5"
            >
              <div>
                <div className="text-xs font-semibold uppercase opacity-40 mb-3">Tema</div>
                <div className="grid grid-cols-2 gap-2">
                  {THEMES.map((t, i) => (
                    <button
                      key={t.id}
                      onClick={() => setThemeIndex(i)}
                      style={{ background: t.bg, color: t.text, border: `2px solid ${i === themeIndex ? '#c9a227' : t.text + '20'}` }}
                      className="px-3 py-2 rounded text-sm font-medium transition-all"
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase opacity-40 mb-3">Tamanho da fonte</div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setFontSizeIndex(i => Math.max(0, i-1))} style={{ background: `${theme.text}10` }} className="w-8 h-8 rounded-full text-lg font-bold">−</button>
                  <div className="flex-1 text-center font-medium">{fontSize}px</div>
                  <button onClick={() => setFontSizeIndex(i => Math.min(FONT_SIZES.length-1, i+1))} style={{ background: `${theme.text}10` }} className="w-8 h-8 rounded-full text-lg font-bold">+</button>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase opacity-40 mb-3">Espaçamento entre linhas</div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setLineHeight(h => Math.max(1.3, +(h-0.1).toFixed(1)))} style={{ background: `${theme.text}10` }} className="w-8 h-8 rounded-full text-lg font-bold">−</button>
                  <div className="flex-1 text-center font-medium">{lineHeight.toFixed(1)}</div>
                  <button onClick={() => setLineHeight(h => Math.min(2.5, +(h+0.1).toFixed(1)))} style={{ background: `${theme.text}10` }} className="w-8 h-8 rounded-full text-lg font-bold">+</button>
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase opacity-40 mb-2">Destaques ({chapterHighlights.length})</div>
                {chapterHighlights.length === 0 && <div className="text-xs opacity-40">Selecione texto para destacar.</div>}
                {chapterHighlights.map(h => (
                  <div key={h.id} style={{ background: h.color, borderRadius: 4 }} className="text-xs p-1.5 mb-1 flex justify-between items-start">
                    <span className="text-gray-800 truncate flex-1">{h.text.slice(0, 60)}{h.text.length > 60 ? '…' : ''}</span>
                    <button onClick={() => setHighlights(prev => prev.filter(x => x.id !== h.id))} className="ml-1 opacity-50 hover:opacity-100">✕</button>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: `1px solid ${theme.text}15` }} className="pt-4">
                <div className="text-xs opacity-40 leading-relaxed">{ebook.editorialNotice}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HIGHLIGHT MENU */}
        <AnimatePresence>
          {showHighlightMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                position: 'fixed',
                left: highlightMenuPos.x,
                top: highlightMenuPos.y,
                transform: 'translateX(-50%) translateY(-100%)',
                background: theme.surface,
                border: `1px solid ${theme.text}20`,
                borderRadius: 8,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                zIndex: 100,
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span style={{ fontSize: 11, opacity: 0.5, marginRight: 4 }}>Destacar:</span>
              {HIGHLIGHT_COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => addHighlight(c.color)}
                  title={c.label}
                  style={{ background: c.color, width: 20, height: 20, borderRadius: 4, border: '1px solid rgba(0,0,0,0.1)' }}
                />
              ))}
              <button
                onClick={() => { setAddingNote(true); setShowNotes(true); setShowHighlightMenu(false); }}
                style={{ fontSize: 11, opacity: 0.6, marginLeft: 4 }}
                className="hover:opacity-100"
              >
                📝 Nota
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* READING CONTENT */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <div
            style={{
              maxWidth: focusMode ? 640 : 720,
              margin: '0 auto',
              padding: focusMode ? '4rem 2rem 8rem' : '3rem 2rem 8rem',
            }}
          >
            {/* Chapter header */}
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider opacity-30 mb-2">
                Capítulo {currentChapterIndex + 1} de {totalChapters}
              </div>
              {chapter.estimatedMinutes && (
                <div className="text-xs opacity-40 mb-4">⏱ {chapter.estimatedMinutes} min de leitura</div>
              )}
            </div>

            {/* Content */}
            <div
              className="reader-content"
              style={{ fontSize, lineHeight, color: theme.text }}
              dangerouslySetInnerHTML={{ __html: renderContent() }}
            />

            {/* Chapter navigation */}
            <div style={{ borderTop: `1px solid ${theme.text}15`, marginTop: '4rem', paddingTop: '2rem' }}
              className="flex items-center justify-between gap-4">
              <button
                onClick={() => { if (currentChapterIndex > 0) { setCurrentChapterIndex(i => i-1); contentRef.current?.scrollTo(0,0); }}}
                disabled={currentChapterIndex === 0}
                style={{ background: `${theme.text}08`, color: theme.text }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-20 hover:opacity-80 transition-opacity"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Anterior
              </button>
              <div className="text-xs opacity-40 text-center">
                {currentProgress}% do capítulo
              </div>
              <button
                onClick={() => { if (currentChapterIndex < totalChapters-1) { setCurrentChapterIndex(i => i+1); contentRef.current?.scrollTo(0,0); }}}
                disabled={currentChapterIndex === totalChapters-1}
                style={{ background: `${theme.text}08`, color: theme.text }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-20 hover:opacity-80 transition-opacity"
              >
                Próximo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            {/* No-download notice */}
            <div style={{ background: `${theme.text}05`, borderRadius: 8, padding: '1rem 1.5rem', marginTop: '2rem', border: `1px solid ${theme.text}10` }}
              className="text-xs opacity-50 text-center leading-relaxed">
              🔒 Leitura exclusivamente online · Nenhum download disponível
              <br/>Conteúdo curado pelo Studio Logos para uso pessoal e acadêmico
            </div>
          </div>
        </div>
      </div>

      {/* Reader styles */}
      <style>{`
        .reader-content h1, .reader-content h2 {
          font-size: 1.5em;
          font-weight: 700;
          margin: 0 0 1.2em;
          letter-spacing: -0.01em;
        }
        .reader-content h3 {
          font-size: 1.15em;
          font-weight: 600;
          margin: 2em 0 0.8em;
          opacity: 0.85;
        }
        .reader-content p {
          margin: 0 0 1.2em;
          text-align: justify;
          hyphens: auto;
        }
        .reader-content p.dropcap::first-letter {
          float: left;
          font-size: 3.5em;
          line-height: 0.8;
          padding-right: 0.12em;
          padding-top: 0.06em;
          font-weight: 700;
          color: #c9a227;
        }
        .reader-content em { font-style: italic; }
        .reader-content strong { font-weight: 700; }
        .reader-content hr {
          border: none;
          border-top: 1px solid currentColor;
          opacity: 0.15;
          margin: 2em auto;
          width: 60%;
        }
        .reader-content blockquote {
          border-left: 3px solid #c9a227;
          margin: 1.5em 0;
          padding: 0.5em 1.2em;
          opacity: 0.85;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}

function ReaderBtn({ children, onClick, title }: { children: React.ReactNode; onClick: () => void; title: string }) {
  return (
    <button onClick={onClick} title={title}
      className="p-2 rounded-lg hover:opacity-70 transition-opacity">
      {children}
    </button>
  );
}
