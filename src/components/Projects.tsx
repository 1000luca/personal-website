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
              className="glass-effect rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden h-48 bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    project.status === 'completed' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                  }`}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-slate-300">
                  <Calendar size={14} />
                  <span className="text-sm">{project.date}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-200/90 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-emerald-500/15 text-emerald-200 text-xs rounded-md border border-emerald-300/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-600/20 text-slate-400 text-xs rounded-md">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-emerald-400 to-amber-300 text-slate-900 text-sm rounded-md hover:shadow-lg transition-all duration-200"
                  >
                    <ExternalLink size={14} />
                    Live
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 glass-effect text-slate-100 text-sm rounded-md hover:border-emerald-300/50 transition-all duration-200"
                  >
                    <Github size={14} />
                    Code
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
