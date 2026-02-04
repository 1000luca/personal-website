import { motion } from 'framer-motion';
import { User, MapPin, Mail, Phone } from 'lucide-react';
import { containerVariants, itemVariants } from '../constants/animations';
import { personalInfo, aboutMe, education, interests } from '../constants/personal';

const About = () => {
  return (
    <section id="about" className="py-24 section-veil">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-4 text-slate-100"
          >
            <span className="gradient-text">About Me</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-300 text-lg max-w-2xl mx-auto"
          >
            Get to know more about my background, skills, and what drives me as a developer.
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            {/* Who I Am */}
            <div className="glass-effect p-8 rounded-2xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4 gradient-text">
                {aboutMe.whoIAm.title}
              </h3>
              {aboutMe.whoIAm.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-slate-200/90 leading-relaxed ${
                    index < aboutMe.whoIAm.paragraphs.length - 1 ? 'mb-4' : ''
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Personal Info */}
            <div className="glass-effect p-8 rounded-2xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4 gradient-text">Personal Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-200/90">
                  <User size={20} className="text-emerald-300" aria-hidden="true" />
                  <span>
                    <span lang="ko">{personalInfo.name}</span> ({personalInfo.nameEn})
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-200/90">
                  <MapPin size={20} className="text-emerald-300" aria-hidden="true" />
                  <span>{personalInfo.location}</span>
                </div>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-slate-200/90 hover:text-emerald-300 transition-colors group"
                >
                  <Mail size={20} className="text-emerald-300 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <span>{personalInfo.email}</span>
                </a>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-slate-200/90 hover:text-emerald-300 transition-colors group"
                >
                  <Phone size={20} className="text-emerald-300 group-hover:scale-110 transition-transform" aria-hidden="true" />
                  <span>{personalInfo.phone}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            {/* Education */}
            <div className="glass-effect p-8 rounded-2xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4 gradient-text">Education</h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-emerald-400/30 pl-4">
                    <h4 className="text-lg font-semibold text-white">{edu.degree}</h4>
                    <p className="text-slate-300">{edu.institution}</p>
                    <p className="text-slate-400 text-sm">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="glass-effect p-8 rounded-2xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4 gradient-text">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <motion.span
                    key={interest}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-gradient-to-r from-emerald-500/15 to-amber-500/15 border border-emerald-300/30 rounded-full text-sm text-slate-200/90 hover:border-emerald-300/50 transition-colors cursor-default"
                  >
                    {interest}
                  </motion.span>
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
