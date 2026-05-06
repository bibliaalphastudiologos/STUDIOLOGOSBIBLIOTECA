import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, Loader2 } from 'lucide-react';
import { DEMO_EBOOKS } from '../data/ebooks';
import { Ebook } from '../types';

export const OnlineReader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = DEMO_EBOOKS.find(e => e.id === id);
    if (found) {
      setEbook(found);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!ebook) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Ebook não encontrado</h2>
          <button
            onClick={() => navigate('/')}
            className="text-navy underline"
          >
            Voltar à biblioteca
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-navy hover:text-gold"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          <h1 className="font-serif text-xl text-navy truncate">{ebook.title}</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-sm shadow-lg p-8 mb-6">
          <h2 className="font-serif text-3xl text-navy mb-2">{ebook.title}</h2>
          <p className="text-gray-600 mb-4">Por {ebook.authorReference}</p>
          <p className="text-lg leading-relaxed mb-6">{ebook.description}</p>
          
          {ebook.isFromGutendex && ebook.downloadUrl ? (
            <iframe
              src={ebook.downloadUrl.replace('.epub', '.html')}
              className="w-full h-[600px] border border-gray-200 rounded"
              title={ebook.title}
            />
          ) : (
            <div className="prose max-w-none">
              <p className="text-gray-500 italic">
                Conteúdo completo disponível após login e aprovação.
              </p>
              {ebook.chapters && ebook.chapters.length > 0 ? (
                <ul className="list-disc list-inside mt-4">
                  {ebook.chapters.map(ch => (
                    <li key={ch.id}>{ch.title}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
