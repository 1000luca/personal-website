/**
 * Loading Component
 * Reusable loading spinner with different sizes
 */

import { motion } from 'framer-motion';
import type { LoadingProps } from '../types';

const Loading = ({ size = 'md', className = '' }: LoadingProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-label="Loading">
      <motion.div
        className={`${sizeClasses[size]} border-2 border-emerald-400 border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// Fullscreen loading overlay
export const LoadingOverlay = ({ message = 'Loading...' }: { message?: string }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-effect p-8 rounded-2xl flex flex-col items-center gap-4">
        <Loading size="lg" />
        <p className="text-slate-200 text-lg">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
