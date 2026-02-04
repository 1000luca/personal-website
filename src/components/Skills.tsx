import { motion } from 'framer-motion';
import { containerVariants, itemVariantsFast } from '../constants/animations';
import { skillCategories, experiences } from '../constants/skills';
import { useIntersectionObserver } from '../hooks';

const Skills = () => {

  return (
    <section id="skills" className="py-24 section-alt">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariantsFast}
            className="text-4xl md:text-5xl font-bold mb-4 text-slate-100"
          >
            <span className="gradient-text">Skills & Experience</span>
          </motion.h2>
          <motion.p
            variants={itemVariantsFast}
            className="text-slate-300 text-lg max-w-2xl mx-auto"
          >
            My technical expertise and professional journey in web development.
          </motion.p>
        </motion.div>

        <div className="mb-20">
          <motion.h3
            variants={itemVariantsFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-2xl font-semibold mb-8 text-center text-slate-100"
          >
            Technical Skills
          </motion.h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((category, categoryIndex) => (
              <SkillCategoryCard
                key={category.title}
                category={category}
                index={categoryIndex}
              />
            ))}
          </motion.div>
        </div>

        <div>
          <motion.h3
            variants={itemVariantsFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-2xl font-semibold mb-8 text-center text-slate-100"
          >
            Work Experience
          </motion.h3>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariantsFast}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="glass-effect p-8 rounded-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">{exp.title}</h4>
                    <p className="text-emerald-300 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-slate-400 text-sm mt-2 md:mt-0 flex items-center gap-1">
                    📅 {exp.period}
                  </span>
                </div>
                <p className="text-slate-200/90 mb-4">{exp.description}</p>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-300 mt-1 flex-shrink-0">✓</span>
                      <span className="text-slate-200/90 text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Skill Category Card Component
const SkillCategoryCard = ({ category, index }: { category: typeof skillCategories[0]; index: number }) => {
  const { targetRef, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <motion.div
      ref={targetRef as React.RefObject<HTMLDivElement>}
      variants={itemVariantsFast}
      className="glass-effect p-6 rounded-xl hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-emerald-400 to-amber-300 rounded-lg text-slate-900">
          <category.icon size={24} />
        </div>
        <h4 className="text-xl font-semibold">{category.title}</h4>
      </div>
      <div className="space-y-3">
        {category.skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-slate-200/90 font-medium">{skill.name}</span>
              <span className="text-sm text-slate-400 tabular-nums">{skill.level}%</span>
            </div>
            <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={hasIntersected ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                className="bg-gradient-to-r from-emerald-400 to-amber-400 h-2 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Skills;
