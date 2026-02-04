import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { socialLinks } from '../constants/contact';
import { personalInfo } from '../constants/personal';
import { useSmoothScroll } from '../hooks';
import { fadeInUp } from '../constants/animations';

const Footer = () => {
  const { scrollToTop } = useSmoothScroll();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 section-veil border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold gradient-text mb-2" lang="ko">
              {personalInfo.name}
            </h3>
            <p className="text-slate-300 mb-4">{personalInfo.title}</p>
            <p className="text-slate-400 text-sm">{personalInfo.tagline}</p>
          </motion.div>

          {/* Social Links & Back to Top */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glass-effect rounded-lg hover:border-emerald-300/50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  aria-label={`Visit ${social.label}`}
                >
                  <div className="text-slate-400 group-hover:text-emerald-200 group-hover:scale-110 transition-all duration-200">
                    <social.icon size={20} />
                  </div>
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="p-3 glass-effect rounded-lg hover:border-emerald-300/50 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label="Scroll back to top"
            >
              <div className="text-slate-400 group-hover:text-emerald-200 group-hover:-translate-y-1 transition-all duration-200">
                <ArrowUp size={20} />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2 }}
          className="mt-12 pt-8 border-t border-white/10 text-center"
        >
          <p className="text-slate-400 text-sm">
            © {currentYear}{' '}
            <span lang="ko">{personalInfo.name}</span> ({personalInfo.nameEn}). All rights
            reserved.
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Built with React, TypeScript, Framer Motion & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
