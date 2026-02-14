import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MockDataService } from '../services/mockDataService';
import type { SkillCategory, Experience } from '../types';

const Skills = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [workExperiences, setWorkExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsData, expData] = await Promise.all([
          MockDataService.getSkills(),
          MockDataService.getExperiences()
        ]);
        setCategories(skillsData);
        setWorkExperiences(expData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="py-32 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[var(--accent)] border-t-transparent animate-spin" />
      </section>
    );
  }

  return (
    <section id="skills" className="py-32 section-veil">
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
            Expertise
          </h2>
          <div className="h-px w-32 bg-gradient-to-r from-[var(--accent)] to-transparent mb-8" />
          <p className="text-xl text-secondary max-w-2xl leading-relaxed">
            Technical skills and professional experience cultivated through years of development.
          </p>
        </motion.div>

        {/* Skills Grid - Show only first 4 categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32"
        >
          {categories.slice(0, 4).map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-6"
            >
              <h3 className="text-xl font-display font-medium text-primary">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.slice(0, 4).map((skill) => (
                  <div key={skill.name}>
                    <span className="text-base text-secondary">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience */}
        <div className="space-y-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-3xl font-display font-semibold text-primary"
          >
            Experience
          </motion.h3>

          {workExperiences.map((exp, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="refined-card p-8 md:p-12 space-y-6"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="space-y-2">
                  <h4 className="text-2xl md:text-3xl font-display font-semibold text-primary">
                    {exp.title}
                  </h4>
                  <p className="text-xl text-[var(--accent)]">{exp.company}</p>
                </div>
                <span className="text-sm text-secondary font-light tracking-wider uppercase">
                  {exp.period}
                </span>
              </div>

              <p className="text-lg text-secondary leading-relaxed">{exp.description}</p>

              <ul className="space-y-3 pt-4">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-[var(--accent)] mt-1.5 flex-shrink-0">—</span>
                    <span className="text-base text-secondary leading-relaxed">{achievement}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
