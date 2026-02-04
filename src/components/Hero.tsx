import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { containerVariants, itemVariants } from '../constants/animations';
import { personalInfo } from '../constants/personal';
import { useSmoothScroll } from '../hooks';

const Hero = () => {
  const { scrollToSection } = useSmoothScroll();

  const handleDownloadCV = () => {
    // Open CV in new tab or trigger download
    window.open(personalInfo.cvUrl, '_blank');
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('#contact');
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center hero-aurora relative overflow-hidden"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute top-16 right-[-6rem] h-80 w-80 rounded-full bg-amber-400/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-[-10rem] left-1/3 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center z-10 px-4 max-w-4xl mx-auto"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05]"
        >
          Hi, I'm{' '}
          <span className="gradient-text" lang="ko">
            {personalInfo.name}
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-slate-200/90 mb-8 leading-relaxed"
        >
          {personalInfo.title}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-slate-300 mb-4 max-w-2xl mx-auto"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-base text-slate-400 mb-12 max-w-2xl mx-auto"
        >
          {personalInfo.description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={handleContactClick}
            className="px-8 py-3 bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300 text-slate-900 rounded-full font-semibold shadow-[0_12px_30px_rgba(16,185,129,0.35)] hover:shadow-[0_16px_40px_rgba(245,158,11,0.35)] transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Navigate to contact section"
          >
            Get In Touch
          </button>

          <button
            onClick={handleDownloadCV}
            className="px-8 py-3 glass-effect text-slate-100 rounded-full font-semibold hover:border-emerald-300/50 hover:text-emerald-200 transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Download CV"
          >
            <Download size={18} />
            Download CV
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection('#about')}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-200/80 hover:text-emerald-300 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded p-2"
        aria-label="Scroll to about section"
      >
        <ArrowDown size={24} />
      </motion.button>
    </section>
  );
};

export default Hero;
