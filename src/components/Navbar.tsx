import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { navItems } from '../constants/navigation';
import { useScrollPosition, useSmoothScroll } from '../hooks';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScrollPosition();
  const { scrollToSection } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState('home');

  const scrolled = scrollY > 50;

  // Track active section
  useEffect(() => {
    const sections = navItems.map(item => item.href.replace('#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-effect shadow-[0_12px_32px_rgba(2,6,23,0.6)] border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('#home')}
              className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
              aria-label="Go to home"
            >
              천현재
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                      isActive
                        ? 'text-emerald-300'
                        : 'text-slate-200/80 hover:text-emerald-300'
                    }`}
                    aria-label={`Navigate to ${item.label}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-emerald-300 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label="Visit GitHub profile"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-emerald-300 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label="Visit LinkedIn profile"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:cheon@example.com"
              className="text-slate-300 hover:text-emerald-300 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label="Send email"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-200/80 hover:text-emerald-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-effect border-t border-white/10 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'text-emerald-300 bg-emerald-500/10'
                        : 'text-slate-200/80 hover:text-emerald-300 hover:bg-slate-800/50'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Mobile Social Links */}
              <div className="flex items-center justify-center space-x-6 pt-4 pb-2 border-t border-white/10 mt-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-emerald-300 transition-colors"
                  aria-label="Visit GitHub profile"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-emerald-300 transition-colors"
                  aria-label="Visit LinkedIn profile"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  href="mailto:cheon@example.com"
                  className="text-slate-300 hover:text-emerald-300 transition-colors"
                  aria-label="Send email"
                >
                  <Mail size={22} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
