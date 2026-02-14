import { projects } from '../constants/projects';
import { skillCategories, experiences } from '../constants/skills';
import { personalInfo, aboutMe, education, interests } from '../constants/personal';
import { navItems } from '../constants/navigation';
import { socialLinks, contactInfo } from '../constants/contact';
import type { Project, SkillCategory, Experience, NavItem, SocialLink, ContactInfo } from '../types';

/**
 * Service to simulate fetching data from a backend or CMS.
 * In a real application, this would use fetch() or axios to get data from an API.
 */
export const MockDataService = {
  getProjects: async (): Promise<Project[]> => {
    return projects;
  },

  getSkills: async (): Promise<SkillCategory[]> => {
    return skillCategories;
  },

  getExperiences: async (): Promise<Experience[]> => {
    return experiences;
  },

  getPersonalInfo: async () => {
    return personalInfo;
  },
  
  getAboutMe: async () => {
    return aboutMe;
  },

  getEducation: async () => {
    return education;
  },

  getInterests: async () => {
    return interests;
  },

  getNavItems: async (): Promise<NavItem[]> => {
    return navItems;
  },

  getSocialLinks: async (): Promise<SocialLink[]> => {
    return socialLinks;
  },

  getContactInfo: async (): Promise<ContactInfo[]> => {
    return contactInfo;
  }
};