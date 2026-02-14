import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar } from 'lucide-react';
import { MockDataService } from '../services/mockDataService';
import type { Project } from '../types';

const Projects = () => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await MockDataService.getProjects();
        setProjectList(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <section className="py-32 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[var(--accent)] border-t-transparent animate-spin" />
      </section>
    );
  }

  return (
    <section id="projects" className="py-32 section-veil">
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
            Selected Work
          </h2>
          <div className="h-px w-32 bg-gradient-to-r from-[var(--accent)] to-transparent mb-8" />
          <p className="text-xl text-secondary max-w-2xl leading-relaxed">
            A curated collection of projects showcasing my approach to design and development.
          </p>
        </motion.div>

        {/* Projects Grid - Show only first 4 projects */}
        <div className="space-y-16">
          {projectList.slice(0, 4).map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="refined-card p-8 md:p-12 group"
            >
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Project Info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-secondary font-light tracking-wider uppercase">
                      {project.date}
                    </span>
                    <span className={`px-3 py-1 text-xs uppercase tracking-wider font-medium border ${
                      project.status === 'completed'
                        ? 'border-[var(--accent-2)] text-[var(--accent-2)]'
                        : 'border-[var(--accent)] text-[var(--accent)]'
                    }`}>
                      {project.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-display font-semibold text-primary group-hover:text-[var(--accent)] transition-colors duration-400">
                    {project.title}
                  </h3>

                  <p className="text-lg text-secondary leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm text-secondary font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Actions */}
                <div className="flex flex-col gap-4 md:items-end">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-primary hover:text-[var(--accent)] transition-colors duration-400 group/link"
                  >
                    <span className="text-lg font-medium">View Project</span>
                    <ExternalLink size={20} strokeWidth={1.5} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-400" />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-secondary hover:text-[var(--accent)] transition-colors duration-400 group/link"
                  >
                    <span className="text-base font-medium">Source Code</span>
                    <Github size={18} strokeWidth={1.5} className="group-hover/link:translate-x-1 transition-transform duration-400" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mt-24 text-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-primary hover:text-[var(--accent)] transition-colors duration-400 group"
          >
            <Github size={20} strokeWidth={1.5} />
            <span className="text-lg font-medium border-b border-transparent group-hover:border-[var(--accent)] transition-all duration-400">
              View All Projects
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;