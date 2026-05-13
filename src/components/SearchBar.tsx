import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suggestions?: string[];
  onSelectSuggestion?: (s: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar títulos, autores...',
  suggestions = [],
  onSelectSuggestion,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);

    // Debounce
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onChange(val);
    }, 300);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
      handleClear();
    }
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div
        className={`
          relative flex items-center bg-white border
          transition-all duration-300 rounded-sm overflow-hidden
          ${isFocused
            ? 'border-navy shadow-[0_0_0_3px_rgba(30,58,138,0.1)]'
            : 'border-gray-200 hover:border-gray-300'
          }
        `}
      >
        <Search className="w-5 h-5 text-[#0F0F0F]/50 ml-4" />

        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-4 py-3.5 text-[#0F0F0F] placeholder-[#1A1A1A]/50 bg-transparent outline-none font-medium"
        />

        <AnimatePresence>
          {localValue && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4 text-gray-400" />
            </motion.button>
          )}
        </AnimatePresence>

        {isFocused && (
          <Loader2 className="w-4 h-4 text-navy animate-spin mr-3" />
        )}
      </div>

      {/* Sugestões */}
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-sm shadow-xl z-50 max-h-60 overflow-y-auto"
          >
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => {
                  setLocalValue(s);
                  onChange(s);
                  onSelectSuggestion?.(s);
                }}
                className="w-full px-4 py-2 text-left hover:bg-[#0F0F0F]/5 transition-colors flex items-center space-x-2"
              >
                <Search className="w-3 h-3 text-[#0F0F0F]/40" />
                <span className="text-sm text-[#0F0F0F] font-medium">{s}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
