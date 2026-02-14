import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MockDataService } from '../services/mockDataService';
import { useSmoothScroll } from '../hooks';

const Hero = () => {
  const { scrollToSection } = useSmoothScroll();
  const navigate = useNavigate();
  const [personal, setPersonal] = useState<any>(null);

  useEffect(() => {
    const fetchPersonal = async () => {
      const data = await MockDataService.getPersonalInfo();
      setPersonal(data);
    };
    fetchPersonal();
  }, []);

  const handleDownloadCV = () => {
    if (personal) {
      window.open(personal.cvUrl, '_blank');
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/contact');
  };

  if (!personal) return null;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Subtle decorative element */}
      <div className="absolute top-32 right-12 w-px h-32 bg-gradient-to-b from-transparent via-[var(--stroke)] to-transparent opacity-40" aria-hidden="true" />
      <div className="absolute bottom-32 left-12 w-px h-32 bg-gradient-to-b from-transparent via-[var(--stroke)] to-transparent opacity-40" aria-hidden="true" />

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-8 py-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-16"
        >
          {/* Introduction */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="text-lg text-secondary font-light tracking-wide uppercase"
            >
              Portfolio 2024
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-6xl md:text-7xl lg:text-8xl font-display font-semibold text-primary leading-[0.95]"
            >
              {personal.name}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="h-px w-48 bg-gradient-to-r from-[var(--accent)] to-transparent origin-left"
            />
          </div>

          {/* Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8 max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-display font-medium text-primary">
              {personal.title}
            </h2>

            <p className="text-xl text-secondary leading-relaxed">
              {personal.tagline}
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button
              onClick={handleContactClick}
              className="btn-primary"
              aria-label="Navigate to contact section"
            >
              Get In Touch
            </button>

            <button
              onClick={handleDownloadCV}
              className="btn-secondary flex items-center gap-3"
              aria-label="Download CV"
            >
              <Download size={18} />
              Download CV
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection('#about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-secondary hover:text-accent transition-colors duration-400 cursor-pointer"
        aria-label="Scroll to about section"
      >
        <ArrowDown size={20} strokeWidth={1.5} />
      </motion.button>
    </section>
  );
};

export default Hero;
