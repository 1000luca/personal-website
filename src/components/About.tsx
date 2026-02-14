import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import { MockDataService } from '../services/mockDataService';

const About = () => {
  const [personal, setPersonal] = useState<any>(null);
  const [about, setAbout] = useState<any>(null);
  const [edu, setEdu] = useState<any[]>([]);
  const [hobbies, setHobbies] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [p, a, e, h] = await Promise.all([
        MockDataService.getPersonalInfo(),
        MockDataService.getAboutMe(),
        MockDataService.getEducation(),
        MockDataService.getInterests()
      ]);
      setPersonal(p);
      setAbout(a);
      setEdu(e);
      setHobbies(h);
    };
    fetchData();
  }, []);

  if (!personal || !about) return null;

  return (
    <section id="about" className="py-32 section-alt">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-display font-semibold text-primary mb-6">
            About
          </h2>
          <div className="h-px w-32 bg-gradient-to-r from-[var(--accent)] to-transparent mb-8" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-3 space-y-12"
          >
            {/* Who I Am */}
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-medium text-primary">
                {about.whoIAm.title}
              </h3>
              <p className="text-lg text-secondary leading-relaxed">
                {about.whoIAm.paragraphs[0]}
              </p>
            </div>

            {/* Education */}
            <div className="space-y-6 pt-8 border-t border-[var(--border-light)]">
              <h3 className="text-2xl font-display font-medium text-primary">Education</h3>
              <div className="space-y-6">
                {edu.map((e, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-xl font-display font-medium text-primary">{e.degree}</h4>
                    <p className="text-lg text-[var(--accent)]">{e.institution}</p>
                    <p className="text-base text-secondary">{e.period}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="lg:col-span-2 space-y-12"
          >
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-display font-medium text-primary">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={18} strokeWidth={1.5} className="text-[var(--accent)] mt-1 flex-shrink-0" />
                  <span className="text-base text-secondary">{personal.location}</span>
                </div>
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-start gap-3 text-secondary hover:text-[var(--accent)] transition-colors duration-400 group"
                >
                  <Mail size={18} strokeWidth={1.5} className="text-[var(--accent)] mt-1 flex-shrink-0" />
                  <span className="text-base border-b border-transparent group-hover:border-[var(--accent)] transition-all duration-400">
                    {personal.email}
                  </span>
                </a>
                <a
                  href={`tel:${personal.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-3 text-secondary hover:text-[var(--accent)] transition-colors duration-400 group"
                >
                  <Phone size={18} strokeWidth={1.5} className="text-[var(--accent)] mt-1 flex-shrink-0" />
                  <span className="text-base border-b border-transparent group-hover:border-[var(--accent)] transition-all duration-400">
                    {personal.phone}
                  </span>
                </a>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-6">
              <h3 className="text-xl font-display font-medium text-primary">Interests</h3>
              <div className="flex flex-wrap gap-3">
                {hobbies.map((interest) => (
                  <span
                    key={interest}
                    className="text-sm text-secondary"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;