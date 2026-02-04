import { motion } from 'framer-motion';
import { User, MapPin, Mail, Phone, Calendar } from 'lucide-react';
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
              <h3 className="text-2xl font-semibold mb-6 gradient-text flex items-center gap-2">
                Education
              </h3>
              <div className="space-y-0">
                {education.map((edu, index) => (
                  <div key={index} className="relative border-l border-emerald-500/20 pl-8 pb-8 last:pb-0 last:border-l-0">
                    {/* Connecting line fix for last item if we want it to stop exactly at the dot, but typically border-l on container works. 
                        Actually, 'last:border-l-0' removes the line for the last item content, but we need the line leading TO it.
                        Better: border-l on the parent container or keep it on the item but handle the last one carefully.
                        Let's use a simpler approach: relative container for the dot.
                    */}
                    <div className={`absolute left-0 top-0 bottom-0 w-px bg-emerald-500/20 ${index === education.length - 1 ? 'h-3' : ''}`}></div>
                    
                    <div className="absolute left-[-4px] top-2 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/10 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                    
                    <div className="relative -top-1">
                      <h4 className="text-lg font-bold text-slate-100">{edu.degree}</h4>
                      <p className="text-emerald-300/90 font-medium mb-1">{edu.institution}</p>
                      <p className="text-slate-400 text-sm flex items-center gap-1.5">
                        <Calendar size={12} />
                        {edu.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="glass-effect p-8 rounded-2xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Interests</h3>
              <div className="flex flex-wrap gap-2.5">
                {interests.map((interest) => (
                  <motion.span
                    key={interest}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 bg-slate-800/40 text-slate-200 text-sm font-medium rounded-full border border-white/5 hover:border-emerald-500/30 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all cursor-default shadow-sm"
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
