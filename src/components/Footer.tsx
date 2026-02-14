import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { MockDataService } from '../services/mockDataService';
import { useSmoothScroll } from '../hooks';

const Footer = () => {
  const { scrollToTop } = useSmoothScroll();
  const currentYear = new Date().getFullYear();
  const [personal, setPersonal] = useState<any>(null);
  const [socials, setSocials] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [p, s] = await Promise.all([
        MockDataService.getPersonalInfo(),
        MockDataService.getSocialLinks()
      ]);
      setPersonal(p);
      setSocials(s);
    };
    fetchData();
  }, []);

  if (!personal) return null;

  return (
    <footer className="py-16 section-veil border-t border-[var(--border-light)]">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-2"
          >
            <h3 className="text-2xl font-display font-semibold text-primary" lang="ko">
              {personal.name}
            </h3>
            <p className="text-base text-secondary">{personal.title}</p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="flex items-center gap-8"
          >
            <div className="flex gap-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-[var(--accent)] transition-colors duration-400"
                  aria-label={`Visit ${social.label}`}
                >
                  <social.icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            <div className="border-l border-[var(--stroke)] h-5" />

            <button
              onClick={scrollToTop}
              className="text-secondary hover:text-[var(--accent)] transition-all duration-400 group"
              aria-label="Scroll back to top"
            >
              <ArrowUp size={20} strokeWidth={1.5} className="group-hover:-translate-y-1 transition-transform duration-400" />
            </button>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="mt-16 pt-8 border-t border-[var(--border-light)]"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-secondary">
            <p>
              © {currentYear} <span lang="ko">{personal.name}</span> · All rights reserved
            </p>
            <p className="text-xs">
              React · TypeScript · Tailwind CSS · Framer Motion
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
