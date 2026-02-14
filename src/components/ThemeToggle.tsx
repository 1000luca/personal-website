import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/10 bg-slate-200/50 dark:bg-slate-800/50 transition-colors border border-slate-300 dark:border-white/10"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Moon size={20} className="text-emerald-400" />
        ) : (
          <Sun size={20} className="text-amber-500" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
