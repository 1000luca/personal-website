/**
 * Skills and Experience Data
 * Technical skills and work experience information
 */

import { Code, Database, Palette, Server, Smartphone, Cloud } from 'lucide-react';
import type { SkillCategory, Experience } from '../types';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Palette({ size: 24 }),
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Vue.js', level: 75 },
    ],
  },
  {
    title: 'Backend',
    icon: Server({ size: 24 }),
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Express.js', level: 82 },
      { name: 'FastAPI', level: 75 },
      { name: 'GraphQL', level: 70 },
    ],
  },
  {
    title: 'Database',
    icon: Database({ size: 24 }),
    skills: [
      { name: 'PostgreSQL', level: 80 },
      { name: 'MongoDB', level: 85 },
      { name: 'Redis', level: 75 },
      { name: 'MySQL', level: 78 },
      { name: 'Prisma', level: 82 },
    ],
  },
  {
    title: 'Mobile',
    icon: Smartphone({ size: 24 }),
    skills: [
      { name: 'React Native', level: 75 },
      { name: 'Flutter', level: 70 },
      { name: 'iOS Swift', level: 65 },
      { name: 'Android Kotlin', level: 60 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud({ size: 24 }),
    skills: [
      { name: 'AWS', level: 78 },
      { name: 'Docker', level: 75 },
      { name: 'Kubernetes', level: 70 },
      { name: 'CI/CD', level: 82 },
      { name: 'Vercel', level: 85 },
    ],
  },
  {
    title: 'Tools & Others',
    icon: Code({ size: 24 }),
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Figma', level: 75 },
      { name: 'Jest', level: 80 },
      { name: 'Webpack', level: 70 },
      { name: 'Linux', level: 75 },
    ],
  },
];

export const experiences: Experience[] = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovation Lab',
    period: '2023 - Present',
    description: 'Leading development of scalable web applications and mentoring junior developers.',
    achievements: [
      'Architected microservices infrastructure reducing latency by 40%',
      'Implemented CI/CD pipelines improving deployment efficiency by 60%',
      'Led team of 5 developers in successful product launches',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'Digital Solutions Co.',
    period: '2022 - 2023',
    description: 'Developed and maintained multiple client projects using modern web technologies.',
    achievements: [
      'Built responsive web applications serving 10K+ daily users',
      'Optimized database queries improving performance by 35%',
      'Collaborated with UX team to implement pixel-perfect designs',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'Creative Agency',
    period: '2021 - 2022',
    description: 'Focused on creating engaging user interfaces and interactive web experiences.',
    achievements: [
      'Developed 15+ responsive websites for diverse clients',
      'Improved page load speeds by 50% through optimization',
      'Received 95% client satisfaction rate',
    ],
  },
];
