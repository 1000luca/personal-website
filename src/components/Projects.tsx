import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { containerVariants, itemVariants } from '../constants/animations';
import { projects } from '../constants/projects';

const Projects = () => {
  return (
    <section id="projects" className="py-24 section-veil">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="gradient-text">Featured Projects</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-slate-300 text-lg max-w-2xl mx-auto"
          >
            Explore my recent work and side projects that showcase my skills and passion for development.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="glass-effect rounded-xl overflow-hidden hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] transition-all duration-500 group border border-white/5 hover:border-emerald-500/30 flex flex-col h-full"
            >
              <div className="relative overflow-hidden h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black transform group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <span className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full backdrop-blur-md shadow-lg ${
                    project.status === 'completed' 
                      ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/50'
                      : 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/50'
                  }`}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-slate-300 z-10 backdrop-blur-sm px-2 py-1 rounded bg-black/20">
                  <Calendar size={14} />
                  <span className="text-xs font-medium">{project.date}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-slate-300/90 text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-slate-800/50 text-emerald-200/90 text-xs font-medium rounded-md ring-1 ring-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2.5 py-1 bg-slate-800/50 text-slate-400 text-xs font-medium rounded-md ring-1 ring-white/10">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-900 text-sm font-bold rounded-lg shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 glass-effect text-slate-200 text-sm font-semibold rounded-lg hover:bg-white/5 hover:text-white hover:border-emerald-500/30 transition-all duration-200"
                  >
                    <Github size={16} />
                    Source
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass-effect text-slate-100 rounded-full font-semibold hover:border-emerald-300/50 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Github size={20} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
