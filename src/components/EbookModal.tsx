import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Heart, Clock } from 'lucide-react';
import { Ebook } from '../types';

interface EbookModalProps {
  ebook: Ebook;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onRead: () => void;
}

export const EbookModal: React.FC<EbookModalProps> = ({
  ebook,
  onClose,
  isFavorite,
  onToggleFavorite,
  onRead,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-serif text-2xl text-navy">{ebook.title}</h2>
              <button
onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onClose();
            }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">{ebook.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {ebook.readingTime}
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded">{ebook.category}</span>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={onRead}
                className="flex items-center space-x-2 bg-navy text-white px-6 py-2 rounded-sm hover:bg-navy/90"
              >
                <BookOpen className="w-4 h-4" />
                <span>ESTUDAR AGORA</span>
              </button>
              
              <button
                onClick={onToggleFavorite}
                className={`p-2 rounded-sm border ${
                  isFavorite 
                    ? 'border-red-500 text-red-500' 
                    : 'border-gray-300 text-gray-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};