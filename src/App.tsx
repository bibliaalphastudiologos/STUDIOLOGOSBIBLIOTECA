import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BarChart3,
  BookMarked,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Flame,
  GraduationCap,
  Highlighter,
  Home,
  Library,
  Lightbulb,
  ListChecks,
  LogOut,
  Menu,
  Moon,
  PenLine,
  Play,
  Search,
  Sun,
  Target,
  Trophy,
  UserRound,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Reader } from "./components/Reader";
import { EBOOKS } from "./data";
import { Category, type Ebook } from "./studioTypes";
import { safeStorage } from "./lib/safeStorage";
import { useAuth } from "./components/AuthProvider";

type NavItem = {
  id: string;
  label: string;
  icon: React.ElementType;
};

type QuizQuestion = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  area: string;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "gramatica", label: "Gramática", icon: Brain },
  { id: "literatura", label: "Literatura", icon: BookOpen },
  { id: "redacao", label: "Redação", icon: PenLine },
  { id: "exercicios", label: "Exercícios", icon: ListChecks },
  { id: "quizzes", label: "Quizzes", icon: Trophy },
  { id: "biblioteca", label: "Biblioteca", icon: Library },
  { id: "enem", label: "ENEM", icon: GraduationCap },
  { id: "autores", label: "Autores", icon: PenLine },
  { id: "progresso", label: "Meu Progresso", icon: BarChart3 },
];

const grammarModules = [
  {
    title: "Classes gramaticais",
    level: "6o ao 8o ano",
    description: "Substantivos, verbos, adjetivos e advérbios explicados com exemplos rápidos.",
    lessons: 18,
    color: "bg-teal-100 text-teal-700",
  },
  {
    title: "Concordância",
    level: "8o ao Ensino Médio",
    description: "Regras essenciais para escrever frases corretas e naturais.",
    lessons: 12,
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Pontuação e crase",
    level: "7o ao 3o ano",
    description: "Vírgula, ponto e crase com prática guiada e correção automática.",
    lessons: 16,
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Análise sintática",
    level: "9o ao Ensino Médio",
    description: "Sujeito, predicado, objetos, adjuntos e complementos sem sofrimento.",
    lessons: 20,
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Figuras de linguagem",
    level: "Literatura e ENEM",
    description: "Metáfora, ironia, hipérbole, antítese e efeitos de sentido.",
    lessons: 14,
    color: "bg-violet-100 text-violet-700",
  },
  {
    title: "Interpretação textual",
    level: "Todos os anos",
    description: "Inferência, tese, argumentos, contexto e leitura crítica.",
    lessons: 22,
    color: "bg-rose-100 text-rose-700",
  },
];

const writingTools = [
  "Planejador de redação ENEM",
  "Banco de conectivos",
  "Explicador de erros",
  "Repertório sociocultural",
  "Estrutura dissertativa",
  "Diário de escrita",
];

const quizQuestions: QuizQuestion[] = [
  {
    area: "Gramática",
    prompt: "Em 'Os alunos chegaram cedo', qual é o sujeito?",
    options: ["chegaram cedo", "Os alunos", "cedo", "alunos chegaram"],
    answer: 1,
    hint: "Sujeito é sobre quem o verbo informa algo.",
  },
  {
    area: "Literatura",
    prompt: "Machado de Assis é associado principalmente a qual escola literária?",
    options: ["Barroco", "Realismo", "Arcadismo", "Modernismo"],
    answer: 1,
    hint: "Pense em Memórias Póstumas de Brás Cubas.",
  },
  {
    area: "Interpretação",
    prompt: "Inferir uma informação significa:",
    options: ["copiar uma frase", "decorar uma regra", "concluir pelo contexto", "ignorar o texto"],
    answer: 2,
    hint: "A resposta nem sempre está escrita literalmente.",
  },
  {
    area: "ENEM",
    prompt: "Uma boa tese de redação deve:",
    options: ["evitar opinião", "apresentar posição clara", "ser uma pergunta", "ter citação obrigatória"],
    answer: 1,
    hint: "A tese guia o texto inteiro.",
  },
];

const authorHighlights = [
  { name: "Machado de Assis", school: "Realismo", focus: "ironia, narrador e crítica social" },
  { name: "José de Alencar", school: "Romantismo", focus: "identidade nacional e indianismo" },
  { name: "Aluísio Azevedo", school: "Naturalismo", focus: "ambiente, sociedade e determinismo" },
  { name: "Lima Barreto", school: "Pré-modernismo", focus: "exclusão, cidade e crítica política" },
  { name: "Eça de Queirós", school: "Realismo português", focus: "sociedade, costumes e ironia" },
  { name: "Fernando Pessoa", school: "Modernismo português", focus: "heterônimos e identidade" },
  { name: "Camões", school: "Classicismo", focus: "épica, lírica e tradição portuguesa" },
  { name: "Euclides da Cunha", school: "Pré-modernismo", focus: "Brasil profundo e linguagem documental" },
];

const seoTopics = [
  "O que é predicado?",
  "Figuras de linguagem explicadas",
  "Como estudar literatura",
  "Machado de Assis para estudantes",
  "Adjunto adnominal ou complemento nominal?",
  "Como fazer introdução de redação ENEM",
  "Escolas literárias em ordem cronológica",
  "Diferença entre tema e tese",
];

const visualHighlights = [
  {
    title: "Leitura que parece app",
    text: "Obras integrais, progresso salvo, favoritos e leitor confortável para celular.",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Escrita com rotina",
    text: "Redação, diário, conectivos e repertório organizados para o aluno escrever melhor.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Gramática sem cara de apostila",
    text: "Explicações curtas, quizzes rápidos e missões semanais por série escolar.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
  },
];

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function getReaderSlug(pathname: string): string | null {
  const match = pathname.match(/^\/ler\/([^/]+)\/?$/i);
  return match ? decodeURIComponent(match[1]) : null;
}

function getReaderPath(ebook: Ebook): string {
  return `/ler/${ebook.slug || ebook.id}`;
}

function isSchoolLibraryBook(ebook: Ebook): boolean {
  if (ebook.isSpecial) return false;
  if (ebook.licenseStatus === "summary_only") return false;
  return [
    Category.BRAZILIAN_LITERATURE,
    Category.PORTUGUESE_LITERATURE,
    Category.UNIVERSAL_LITERATURE,
    Category.LITERATURE,
    Category.HISTORY,
    Category.HUMANITIES,
  ].includes(ebook.category);
}

function storageNumber(key: string, fallback: number) {
  const stored = Number(safeStorage.getItem(key));
  return Number.isFinite(stored) && stored > 0 ? stored : fallback;
}

function LoginGate() {
  const { login, loading } = useAuth();

  return (
    <main className="min-h-screen bg-[#fffaf0] text-slate-900">
      <section className="min-h-screen grid lg:grid-cols-[1.02fr_0.98fr]">
        <div className="flex items-center bg-[radial-gradient(circle_at_20%_10%,rgba(251,146,60,0.18),transparent_34%),linear-gradient(180deg,#fffaf0,#ffffff)] px-5 py-10 sm:px-10 lg:px-16">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-800 shadow-sm">
              <img src="/logo.png" alt="Studio Logos" className="h-7 w-7 rounded-full object-cover" />
              Studio Logos Educação
            </div>
            <div className="space-y-5">
              <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">
                Aprenda português, literatura e escrita de forma moderna, gratuita e acolhedora.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Uma plataforma brasileira de leitura, gramática, redação e quizzes para estudantes do 6o ano ao 3o ano do Ensino Médio.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={login}
                disabled={loading}
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-teal-700 px-6 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-teal-100 transition hover:bg-teal-800 disabled:opacity-60"
              >
                <UserRound className="h-5 w-5" />
                Entrar com Google
              </button>
              <span className="inline-flex min-h-14 items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-5 text-sm font-bold text-amber-800">
                <CheckCircle2 className="h-5 w-5" />
                Acesso 100% gratuito
              </span>
            </div>
            <div className="grid max-w-xl grid-cols-3 gap-3">
              {["Gramática", "Redação ENEM", "Biblioteca"].map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <p className="text-sm font-extrabold text-slate-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden bg-amber-100 min-h-[420px] lg:block">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1400&q=80"
            alt="Biblioteca escolar moderna"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-transparent to-orange-300/30" />
          <div className="absolute bottom-10 left-10 right-10 rounded-lg bg-white/90 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">Sua rotina de estudo</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {["15 min leitura", "1 quiz diário", "1 texto por semana"].map((item) => (
                <div key={item} className="rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const { user, profile, logout, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(safeStorage.getItem("student-favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [quizIndex, setQuizIndex] = useState(storageNumber("student-quiz-index", 0));
  const [quizScore, setQuizScore] = useState(storageNumber("student-quiz-score", 0));
  const [answered, setAnswered] = useState<number | null>(null);
  const [dailyGoal, setDailyGoal] = useState(storageNumber("student-daily-goal", 35));
  const [darkReaderPreview, setDarkReaderPreview] = useState(false);
  const readerSlug = getReaderSlug(location.pathname);

  const libraryBooks = useMemo(() => EBOOKS.filter(isSchoolLibraryBook), []);
  const filteredBooks = useMemo(() => {
    const term = normalize(query);
    if (!term) return libraryBooks.slice(0, 18);
    return libraryBooks
      .filter((ebook) => normalize(`${ebook.title} ${ebook.author} ${ebook.tags.join(" ")} ${ebook.subcategory}`).includes(term))
      .slice(0, 24);
  }, [libraryBooks, query]);

  const routedReaderEbook = useMemo(
    () => readerSlug ? EBOOKS.find((ebook) => ebook.slug === readerSlug || ebook.id === readerSlug) || null : null,
    [readerSlug],
  );
  const readerEbook = routedReaderEbook || selectedEbook;
  const quizQuestion = quizQuestions[quizIndex % quizQuestions.length];
  const readingMinutes = Math.min(100, dailyGoal);
  const level = Math.max(1, Math.floor((quizScore + favorites.length * 2 + readingMinutes / 10) / 3));

  useEffect(() => {
    safeStorage.setItem("student-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    safeStorage.setItem("student-quiz-index", String(quizIndex));
    safeStorage.setItem("student-quiz-score", String(quizScore));
  }, [quizIndex, quizScore]);

  useEffect(() => {
    safeStorage.setItem("student-daily-goal", String(dailyGoal));
  }, [dailyGoal]);

  if (!user) return <LoginGate />;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const openReader = (ebook: Ebook) => {
    setSelectedEbook(ebook);
    safeStorage.setItem("last-read", JSON.stringify(ebook.id));
    navigate(getReaderPath(ebook));
  };

  const toggleFavorite = (ebook: Ebook) => {
    setFavorites((current) =>
      current.includes(ebook.id) ? current.filter((id) => id !== ebook.id) : [...current, ebook.id],
    );
  };

  const answerQuiz = (optionIndex: number) => {
    if (answered !== null) return;
    setAnswered(optionIndex);
    if (optionIndex === quizQuestion.answer) setQuizScore((score) => score + 1);
    window.setTimeout(() => {
      setAnswered(null);
      setQuizIndex((index) => index + 1);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#fffaf0] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-3">
            <img src="/logo.png" alt="Studio Logos" className="h-12 w-12 rounded-lg object-cover shadow-md shadow-amber-100" />
            <div className="text-left">
              <p className="text-base font-black leading-4 text-slate-950">Studio Logos</p>
              <p className="text-xs font-bold text-teal-700">Português e Literatura</p>
            </div>
          </button>
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="rounded-md px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-teal-50 hover:text-teal-700"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              {user.photoURL ? <img src={user.photoURL} alt="" className="h-7 w-7 rounded-full" /> : <UserRound className="h-5 w-5 text-slate-500" />}
              <span className="max-w-[130px] truncate text-sm font-bold text-slate-700">{profile?.nome || user.displayName || "Aluno"}</span>
            </div>
            <button onClick={logout} className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:bg-slate-100" aria-label="Sair" title="Sair">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 lg:hidden" aria-label="Abrir menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-slate-950/40 lg:hidden">
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="ml-auto h-full w-[86vw] max-w-sm bg-white p-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <p className="text-lg font-black">Menu</p>
                <button onClick={() => setMobileMenuOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200" aria-label="Fechar menu">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-6 grid gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.id} onClick={() => scrollTo(item.id)} className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-3 text-left font-bold text-slate-700">
                      <Icon className="h-5 w-5 text-teal-600" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section id="home" className="relative overflow-hidden bg-gradient-to-br from-white via-teal-50 to-amber-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-14">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-extrabold text-teal-700 shadow-sm">
                <Flame className="h-4 w-4 text-orange-500" />
                Sequência de estudo: 7 dias
              </div>
              <div className="space-y-5">
                <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-6xl">
                  Português, literatura e escrita para voltar melhor amanhã.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Leia clássicos, treine gramática, resolva quizzes e desenvolva redações com uma rotina escolar moderna, gratuita e gamificada.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button onClick={() => scrollTo("quizzes")} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-teal-600 px-6 text-sm font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-teal-200 hover:bg-teal-700">
                  <Play className="h-5 w-5" />
                  Começar desafio
                </button>
                <button onClick={() => scrollTo("biblioteca")} className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-6 text-sm font-black uppercase tracking-[0.16em] text-slate-700 shadow-sm hover:bg-slate-50">
                  <BookOpen className="h-5 w-5" />
                  Abrir biblioteca
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["6o ao 3o", "ano escolar"],
                  [libraryBooks.length.toString(), "obras no acervo"],
                  [quizScore.toString(), "acertos em quizzes"],
                  [`Nível ${level}`, "perfil do aluno"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-2xl font-black text-slate-950">{value}</p>
                    <p className="text-sm font-bold text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
                alt="Estudantes em ambiente escolar moderno"
                className="aspect-[4/3] w-full rounded-lg object-cover shadow-2xl shadow-teal-100"
              />
              <div className="absolute -bottom-5 left-4 right-4 rounded-lg bg-white p-5 shadow-xl sm:left-8 sm:right-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-slate-950">Meta diária</p>
                    <p className="text-sm text-slate-500">Leitura, quiz e escrita em uma trilha simples.</p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-lg font-black text-amber-700">{dailyGoal}%</div>
                </div>
                <div className="mt-4 h-3 rounded-full bg-slate-100">
                  <div className="h-3 rounded-full bg-gradient-to-r from-teal-500 to-amber-400" style={{ width: `${dailyGoal}%` }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="progresso" className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-4">
            {[
              { icon: Target, label: "Plano de hoje", value: "35 min", text: "Gramática + leitura" },
              { icon: Trophy, label: "Ranking", value: `Top ${Math.max(1, 30 - level)}%`, text: "turma Studio Logos" },
              { icon: BookMarked, label: "Favoritos", value: favorites.length.toString(), text: "obras salvas" },
              { icon: Award, label: "Medalhas", value: Math.max(1, Math.floor(quizScore / 2)).toString(), text: "conquistas liberadas" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <Icon className="h-6 w-6 text-teal-600" />
                  <p className="mt-4 text-sm font-black uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
                  <p className="mt-1 text-3xl font-black text-slate-950">{item.value}</p>
                  <p className="text-sm font-semibold text-slate-500">{item.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="px-4 pb-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 lg:grid-cols-3">
              {visualHighlights.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                  <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="gramatica" className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Área de Gramática" title="Módulos simples, práticos e com treino imediato." text="Cada trilha combina explicação curta, exemplos, exercícios e quizzes para o estudante aprender fazendo." />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {grammarModules.map((module) => (
                <article key={module.title} className="rounded-lg border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${module.color}`}>{module.level}</span>
                  <h3 className="mt-5 text-2xl font-black text-slate-950">{module.title}</h3>
                  <p className="mt-3 min-h-20 leading-7 text-slate-600">{module.description}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500">{module.lessons} aulas</span>
                    <button onClick={() => scrollTo("quizzes")} className="inline-flex items-center gap-2 text-sm font-black text-teal-700">
                      Praticar <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="literatura" className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Literatura escolar" title="Clássicos organizados por autor, período e dificuldade." text="O acervo muda de uma vitrine adulta para uma biblioteca escolar viva, com foco em obras integrais de domínio público." />
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {authorHighlights.map((author) => (
                <article key={author.name} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-600">{author.school}</p>
                  <h3 className="mt-3 text-xl font-black text-slate-950">{author.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{author.focus}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="redacao" className="bg-gradient-to-br from-teal-600 to-teal-800 px-4 py-14 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-200">Redação e escrita</p>
              <h2 className="mt-4 text-4xl font-black leading-tight text-white">Um laboratório para transformar estudantes em autores.</h2>
              <p className="mt-5 text-lg leading-8 text-teal-50">
                O aluno pode planejar textos, salvar redações, revisar argumentos, organizar repertório e publicar produções na área Autores em Destaque.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {writingTools.map((tool) => (
                <div key={tool} className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <PenLine className="h-5 w-5 text-amber-200" />
                  <p className="mt-4 font-black text-white">{tool}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="exercicios" className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <SectionTitle eyebrow="Exercícios guiados" title="Rotas semanais para gramática, interpretação e ENEM." text="A plataforma propõe missões curtas, revisões espaçadas e desafios por série escolar." />
              <div className="mt-8 grid gap-3">
                {["Ortografia em 10 minutos", "Interpretação com texto curto", "Figuras de linguagem no poema", "Crase em frases do cotidiano", "Tese e proposta de intervenção"].map((item, index) => (
                  <div key={item} className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 font-black text-teal-700">{index + 1}</div>
                    <p className="font-bold text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
              <CalendarDays className="h-8 w-8 text-amber-600" />
              <h3 className="mt-5 text-2xl font-black">Calendário de estudos</h3>
              <p className="mt-3 leading-7 text-slate-600">Segunda: gramática. Terça: leitura. Quarta: interpretação. Quinta: redação. Sexta: simulado rápido.</p>
              <label className="mt-6 block text-sm font-black text-slate-700" htmlFor="goal">Meta de hoje</label>
              <input id="goal" type="range" min="10" max="100" value={dailyGoal} onChange={(event) => setDailyGoal(Number(event.target.value))} className="mt-4 w-full accent-teal-600" />
            </div>
          </div>
        </section>

        <section id="quizzes" className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionTitle eyebrow="Quizzes gamificados" title="Treine como em um jogo, aprenda como em sala de aula." text="Pontuação, níveis, medalhas, sequência diária e feedback imediato para manter o estudante voltando." />
              <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">Seu placar</p>
                <p className="mt-2 text-5xl font-black text-teal-700">{quizScore}</p>
                <p className="text-sm font-bold text-slate-500">acertos acumulados</p>
              </div>
            </div>
            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-black text-teal-700">{quizQuestion.area}</span>
                <span className="text-sm font-bold text-slate-500">Questão {(quizIndex % quizQuestions.length) + 1} de {quizQuestions.length}</span>
              </div>
              <h3 className="mt-6 text-2xl font-black leading-snug text-slate-950">{quizQuestion.prompt}</h3>
              <div className="mt-6 grid gap-3">
                {quizQuestion.options.map((option, index) => {
                  const isCorrect = answered !== null && index === quizQuestion.answer;
                  const isWrong = answered === index && index !== quizQuestion.answer;
                  return (
                    <button
                      key={option}
                      onClick={() => answerQuiz(index)}
                      className={`rounded-lg border p-4 text-left font-bold transition ${
                        isCorrect ? "border-emerald-300 bg-emerald-50 text-emerald-800" :
                        isWrong ? "border-rose-300 bg-rose-50 text-rose-800" :
                        "border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-300 hover:bg-teal-50"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <p className="mt-5 rounded-lg bg-amber-50 p-4 text-sm font-semibold text-amber-800">
                Dica: {quizQuestion.hint}
              </p>
            </article>
          </div>
        </section>

        <section id="biblioteca" className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionTitle eyebrow="Biblioteca digital" title="Leitura integral, confortável e responsiva." text="Favoritos, progresso, fonte ajustável, modo noturno e leitura online no leitor premium já integrado à plataforma." />
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar autor, obra ou tema"
                  className="h-14 w-full rounded-lg border border-slate-200 bg-slate-50 pl-12 pr-4 font-semibold outline-none transition focus:border-teal-400 focus:bg-white"
                />
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((ebook) => (
                <article key={ebook.id} className="rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-teal-700">{ebook.subcategory || ebook.category}</p>
                      <h3 className="mt-2 text-xl font-black leading-snug text-slate-950">{ebook.title}</h3>
                      <p className="mt-1 text-sm font-bold text-slate-500">{ebook.author}</p>
                    </div>
                    <button onClick={() => toggleFavorite(ebook)} className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border ${favorites.includes(ebook.id) ? "border-amber-300 bg-amber-100 text-amber-700" : "border-slate-200 bg-white text-slate-400"}`} aria-label="Favoritar obra" title="Favoritar">
                      <BookMarked className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-4 line-clamp-3 min-h-20 leading-7 text-slate-600">{ebook.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-slate-500">{ebook.estimatedReadTime}</span>
                    <button onClick={() => openReader(ebook)} className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-4 py-2 text-sm font-black text-white hover:bg-teal-700">
                      Ler agora <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="enem" className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-lg bg-slate-950 p-8 text-white">
              <GraduationCap className="h-9 w-9 text-amber-300" />
              <h2 className="mt-5 text-4xl font-black text-white">Preparação ENEM sem perder a base escolar.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-200">Interpretação, repertório, literatura, gramática aplicada e redação em simulados progressivos.</p>
            </div>
            <div className="grid gap-3">
              {["Competência 1: norma padrão", "Competência 2: tema e repertório", "Competência 3: argumentação", "Competência 4: coesão", "Competência 5: intervenção"].map((item) => (
                <div key={item} className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  <p className="font-black text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="autores" className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="Autores em Destaque" title="A área que transforma estudantes em escritores." text="Poemas, contos, crônicas, redações e análises literárias podem virar publicações digitais internas, com perfil, avatar, medalhas e certificados." />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {["Poema da semana", "Crônica do mês", "Redação nota alta"].map((title, index) => (
                <article key={title} className="rounded-lg border border-slate-200 bg-gradient-to-br from-teal-50 to-white p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-teal-700 shadow-sm">
                    {index === 0 ? <Highlighter className="h-6 w-6" /> : index === 1 ? <PenLine className="h-6 w-6" /> : <Award className="h-6 w-6" />}
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-slate-950">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">Espaço editorial para reconhecer a produção dos alunos e incentivar escrita autoral.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionTitle eyebrow="SEO educacional" title="Páginas pensadas para dúvidas reais de português." text="A plataforma passa a falar com estudantes que pesquisam dúvidas objetivas, exercícios, autores e preparação para vestibulares." />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {seoTopics.map((topic) => (
                <article key={topic} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  <p className="mt-3 font-black text-slate-800">{topic}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-4 py-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-300">Studio Logos</p>
              <h2 className="mt-2 text-3xl font-black text-white">Uma biblioteca escolar viva para voltar todos os dias.</h2>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setDarkReaderPreview(false)} className={`inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 ${!darkReaderPreview ? "bg-white text-slate-950" : "text-white"}`} aria-label="Tema claro" title="Tema claro">
                <Sun className="h-5 w-5" />
              </button>
              <button onClick={() => setDarkReaderPreview(true)} className={`inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 ${darkReaderPreview ? "bg-white text-slate-950" : "text-white"}`} aria-label="Tema noturno" title="Tema noturno">
                <Moon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm font-semibold text-slate-500 md:flex-row md:items-center md:justify-between">
          <span>Studio Logos Educação - plataforma gratuita de português, literatura e escrita.</span>
          <span>Leitura, gramática, redação, ENEM e autores estudantes.</span>
        </div>
      </footer>

      <AnimatePresence>
        {readerEbook && (
          <Reader
            ebook={readerEbook}
            onClose={() => {
              setSelectedEbook(null);
              navigate("/");
            }}
            onRelatedRead={openReader}
            related={libraryBooks.filter((ebook) => ebook.category === readerEbook.category)}
            readerUrl={getReaderPath(readerEbook)}
          />
        )}
      </AnimatePresence>

      {loading && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white shadow-xl">
          Sincronizando conta Google...
        </div>
      )}
    </div>
  );
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-slate-600">{text}</p>
    </div>
  );
}


