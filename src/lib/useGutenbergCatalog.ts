/**
 * Hook para buscar e exibir obras de domínio público do Gutenberg
 * no catálogo do Studio Logos.
 *
 * Uso:
 *   const { books, loading, error, search } = useGutenbergCatalog('philosophy');
 */
import { useState, useCallback } from 'react';
import {
  searchGutendex,
  formatGutenbergAsMetadata,
  GutenbergBook,
} from './gutenbergApi';

export interface GutenbergCatalogItem {
  gutenbergId: number;
  title: string;
  author: string;
  deathYear: number | null;
  isPublicDomain: boolean;
  languages: string[];
  subjects: string[];
  textUrl: string | null;
}

export function useGutenbergCatalog() {
  const [results, setResults] = useState<GutenbergCatalogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const search = useCallback(async (params: {
    query?: string;
    topic?: string;
    languages?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchGutendex({
        search: params.query,
        topic: params.topic,
        languages: params.languages,
      });
      setTotal(data.count);
      setResults(data.results.map(formatGutenbergAsMetadata));
    } catch (e: any) {
      setError(e.message || 'Erro ao buscar obras');
    } finally {
      setLoading(false);
    }
  }, []);

  const publicDomainOnly = results.filter(r => r.isPublicDomain);
  const protectedWorks = results.filter(r => !r.isPublicDomain);

  return { results, publicDomainOnly, protectedWorks, loading, error, total, search };
}
