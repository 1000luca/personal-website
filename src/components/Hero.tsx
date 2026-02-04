import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { containerVariants, itemVariants } from '../constants/animations';
import { personalInfo } from '../constants/personal';
import { useSmoothScroll } from '../hooks';

const Hero = () => {
  const { scrollToSection } = useSmoothScroll();
  const navigate = useNavigate();

  const handleDownloadCV = () => {
    // Open CV in new tab or trigger download
    window.open(personalInfo.cvUrl, '_blank');
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/contact');
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
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-emerald-500/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.35, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute top-16 right-[-6rem] h-80 w-80 rounded-full bg-amber-500/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-[-10rem] left-1/3 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl"
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
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight"
        >
          Hi, I'm{' '}
          <span className="gradient-text relative inline-block" lang="ko">
            {personalInfo.name}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: "circOut" }}
              className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-amber-300 rounded-full origin-left opacity-60"
            />
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-slate-200/90 mb-8 leading-relaxed font-light"
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
            className="group relative px-8 py-3 bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300 text-slate-900 rounded-full font-bold shadow-[0_12px_30px_rgba(16,185,129,0.35)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.45)] transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900 overflow-hidden"
            aria-label="Navigate to contact section"
          >
            <span className="relative z-10">Get In Touch</span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/20" />
            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
          </button>

          <button
            onClick={handleDownloadCV}
            className="group px-8 py-3 glass-effect text-slate-100 rounded-full font-semibold hover:bg-white/5 hover:border-emerald-300/50 hover:text-emerald-200 transition-all duration-200 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Download CV"
          >
            <Download size={18} className="group-hover:animate-bounce" />
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
