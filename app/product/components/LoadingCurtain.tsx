"use client"
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingCurtain = ({ isLoading }: { isLoading: boolean, text?: string }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          className="fixed inset-0 z-9999 flex overflow-hidden pointer-events-none"
          exit={{ transition: { staggerChildren: 0.1 } }}
        >
          {/* Cánh rèm bên trái - Màu Primary Dark */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
            className="flex-1 bg-[#E8EFFF] flex items-center justify-end"
          >
          </motion.div>

          {/* Cánh rèm bên phải - Màu Brand Blue */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
            className="flex-1 bg-[#E8EFFF] flex items-center justify-start"
          >
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};