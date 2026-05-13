import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchHeaderProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  onSearch,
  placeholder = 'Buscar títulos, autores, categorias...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery('');
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-[#0F0F0F]/5 rounded-sm transition-colors"
        aria-label="Abrir busca"
      >
        <Search className="w-5 h-5 text-[#0F0F0F]" />
      </button>

      {/* Search Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClear}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-sm shadow-2xl z-50 border border-[#0F0F0F]/10"
            >
              <form onSubmit={handleSubmit} className="p-4">
                <div className="flex items-center gap-3 bg-[#F7F2E8] rounded-sm px-4 py-3">
                  <Search className="w-5 h-5 text-[#0F0F0F]/50" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    autoFocus
                    className="flex-1 bg-transparent outline-none text-[#0F0F0F] placeholder-[#1A1A1A]/50 font-medium"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="p-1 hover:bg-[#0F0F0F]/10 rounded-sm transition-colors"
                    >
                      <X className="w-4 h-4 text-[#0F0F0F]/60" />
                    </button>
                  )}
                </div>
                <div className="mt-3 text-xs text-[#1A1A1A]/60 font-medium">
                  Pressione Enter para buscar
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
