import React from 'react';
import { Filter, ChevronDown, ChevronUp, X, Calendar, User, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookFilters } from '../types';

interface EbookFiltersProps {
  filters: BookFilters;
  onFilterChange: (filters: BookFilters) => void;
  onClearFilters: () => void;
}

export const EbookFilters: React.FC<EbookFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const hasActiveFilters =
    filters.search ||
    filters.language ||
    filters.author ||
    filters.yearFrom ||
    filters.yearTo ||
    filters.category !== 'Todos';

  const updateFilter = <K extends keyof BookFilters>(
    key: K,
    value: BookFilters[K]
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearAll = () => {
    onClearFilters();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm p-4 shadow-sm">
      {/* Filtros principais */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Categoria */}
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value as any)}
            className="appearance-none bg-gray-50 border border-gray-200 rounded-sm px-4 py-2 pr-10 text-sm text-navy focus:outline-none focus:border-navy transition-colors"
          >
            <option value="Todos">Todas Categorias</option>
            <option value="Teologia">Teologia</option>
            <option value="Filosofia">Filosofia</option>
            <option value="Psicanálise">Psicanálise</option>
            <option value="Literatura">Literatura</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Ordenação */}
        <div className="relative">
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value as any)}
            className="appearance-none bg-gray-50 border border-gray-200 rounded-sm px-4 py-2 pr-10 text-sm text-navy focus:outline-none focus:border-navy transition-colors"
          >
            <option value="relevance">Relevância</option>
            <option value="title">Título (A-Z)</option>
            <option value="author">Autor (A-Z)</option>
            <option value="year">Ano</option>
            <option value="downloads">Popularidade</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Domínio público */}
        <label className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-sm border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
          <input
            type="checkbox"
            checked={filters.onlyFree}
            onChange={(e) => updateFilter('onlyFree', e.target.checked)}
            className="w-4 h-4 text-navy rounded border-gray-300 focus:ring-navy"
          />
          <span className="text-sm text-gray-700">Domínio público</span>
        </label>

        {/* Expandir filtros avançados */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-navy hover:text-navy/80 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filtros avançados</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        {/* Limpar filtros */}
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-sm transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Limpar</span>
          </button>
        )}
      </div>

      {/* Filtros expandidos */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 mt-4 border-t border-gray-200">
              {/* Autor */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  <User className="w-3 h-3 inline mr-1" />
                  Autor
                </label>
                <input
                  type="text"
                  value={filters.author}
                  onChange={(e) => updateFilter('author', e.target.value)}
                  placeholder="Nome do autor"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-navy"
                />
              </div>

              {/* Idioma */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  <Globe className="w-3 h-3 inline mr-1" />
                  Idioma
                </label>
                <select
                  value={filters.language}
                  onChange={(e) => updateFilter('language', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-navy bg-white"
                >
                  <option value="">Todos idiomas</option>
                  <option value="en">Inglês</option>
                  <option value="pt">Português</option>
                  <option value="fr">Francês</option>
                  <option value="de">Alemão</option>
                  <option value="es">Espanhol</option>
                  <option value="la">Latim</option>
                </select>
              </div>

              {/* Ano de */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Ano (de)
                </label>
                <input
                  type="number"
                  value={filters.yearFrom || ''}
                  onChange={(e) => updateFilter('yearFrom', e.target.value ? Number(e.target.value) : null)}
                  placeholder="Ex: 1900"
                  min="0"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-navy"
                />
              </div>

              {/* Ano até */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  <Calendar className="w-3 h-3 inline mr-1" />
                  Ano (até)
                </label>
                <input
                  type="number"
                  value={filters.yearTo || ''}
                  onChange={(e) => updateFilter('yearTo', e.target.value ? Number(e.target.value) : null)}
                  placeholder="Ex: 2000"
                  min="0"
                  max={new Date().getFullYear()}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-sm focus:outline-none focus:border-navy"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tags ativas */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3">
          {filters.search && (
            <span className="inline-flex items-center px-2 py-1 bg-navy/10 text-navy text-xs rounded-sm">
              🔍 {filters.search}
              <button onClick={() => updateFilter('search', '')} className="ml-1 hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.author && (
            <span className="inline-flex items-center px-2 py-1 bg-navy/10 text-navy text-xs rounded-sm">
              Autor: {filters.author}
              <button onClick={() => updateFilter('author', '')} className="ml-1 hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.onlyFree && (
            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs rounded-sm">
              Domínio público
              <button onClick={() => updateFilter('onlyFree', false)} className="ml-1 hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
