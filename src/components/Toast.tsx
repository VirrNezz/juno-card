import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#36001a]/95 text-rose-100 border border-[#fa0079]/50 shadow-[0_0_25px_rgba(250,0,121,0.4)] backdrop-blur-md text-sm font-medium">
            <div className="w-5 h-5 rounded-full bg-[#fa0079] flex items-center justify-center text-white">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>{message}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#fa0079] animate-pulse" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
