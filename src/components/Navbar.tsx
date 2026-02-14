import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useScrollPosition, useSmoothScroll } from '../hooks';
import ThemeToggle from './ThemeToggle';
import { navItems } from '../constants/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScrollPosition();
  const { scrollToSection } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';
  const scrolled = scrollY > 50;

  // Track active section
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('contact');
      return;
    }

    const sections = navItems
      .filter(item => item.href.startsWith('#'))
      .map(item => item.href.replace('#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-90px 0px 0px 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isHomePage]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    if (href === '#contact') {
      navigate('/contact');
      setIsOpen(false);
      return;
    }

    if (isHomePage) {
      scrollToSection(href);
    } else {
      navigate('/');
      setTimeout(() => {
        scrollToSection(href);
      }, 100);
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-400 ${
        scrolled
          ? 'refined-card border-b border-[var(--border-medium)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              onClick={() => isHomePage && scrollToSection('#home')}
              className="text-2xl font-display font-semibold text-primary hover:text-[var(--accent)] transition-colors duration-400"
              aria-label="Go to home"
            >
              천현재
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-12">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '') ||
                                (item.href === '#contact' && location.pathname === '/contact');
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className={`text-sm font-medium transition-colors duration-400 relative ${
                      isActive
                        ? 'text-primary'
                        : 'text-secondary hover:text-primary'
                    }`}
                    aria-label={`Navigate to ${item.label}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--accent)]"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Social Links & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-[var(--accent)] transition-colors duration-400"
              aria-label="Visit GitHub profile"
            >
              <Github size={18} strokeWidth={1.5} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-[var(--accent)] transition-colors duration-400"
              aria-label="Visit LinkedIn profile"
            >
              <Linkedin size={18} strokeWidth={1.5} />
            </a>
            <a
              href="mailto:cheon@example.com"
              className="text-secondary hover:text-[var(--accent)] transition-colors duration-400"
              aria-label="Send email"
            >
              <Mail size={18} strokeWidth={1.5} />
            </a>
            <div className="border-l border-[var(--stroke)] h-4" />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-6">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary hover:text-primary transition-colors duration-400"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
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
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden refined-card border-t border-[var(--border-light)] overflow-hidden"
          >
            <div className="px-8 py-6 space-y-6">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '') ||
                                (item.href === '#contact' && location.pathname === '/contact');
                return (
                  <motion.button
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
                    onClick={() => handleNavClick(item.href)}
                    className={`w-full text-left text-lg font-medium transition-colors duration-400 ${
                      isActive
                        ? 'text-primary'
                        : 'text-secondary hover:text-primary'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </motion.button>
                );
              })}

              {/* Mobile Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="flex items-center space-x-8 pt-6 border-t border-[var(--border-light)]"
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-[var(--accent)] transition-colors duration-400"
                  aria-label="Visit GitHub profile"
                >
                  <Github size={20} strokeWidth={1.5} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-[var(--accent)] transition-colors duration-400"
                  aria-label="Visit LinkedIn profile"
                >
                  <Linkedin size={20} strokeWidth={1.5} />
                </a>
                <a
                  href="mailto:cheon@example.com"
                  className="text-secondary hover:text-[var(--accent)] transition-colors duration-400"
                  aria-label="Send email"
                >
                  <Mail size={20} strokeWidth={1.5} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
