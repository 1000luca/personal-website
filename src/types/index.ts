/**
 * Type Definitions
 * Centralized TypeScript types and interfaces for the application
 */

import type { ReactNode } from 'react';

// Project Types
export interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  status: 'completed' | 'in-progress';
  date: string;
}

// Skill Types
export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ size?: number }>;
  skills: Skill[];
}

// Experience Types
export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

// Contact Types
export interface ContactInfo {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  value: string;
  href: string;
}

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Social Links
export interface SocialLink {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  href: string;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
}

// Animation Variants
export interface AnimationVariant {
  hidden: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration?: number;
      delay?: number;
      delayChildren?: number;
      staggerChildren?: number;
      ease?: string | number[];
    };
  };
}

// Theme Types
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Toast Types
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  type: ToastType;
  message: string;
  duration?: number;
}

// Hook Return Types
export interface UseScrollPosition {
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
}

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

export interface UseMediaQueryResult {
  matches: boolean;
}

// Component Props
export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

// Auth Types
export type AuthProvider = 'google' | 'apple' | 'kakao';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  provider: AuthProvider;
  emailVerified: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

export interface AuthContextType extends AuthState {
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithKakao: () => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
  refreshToken: () => Promise<void>;
}

export interface JWTTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface TokenStorage {
  getTokens: () => JWTTokens | null;
  setTokens: (tokens: JWTTokens) => void;
  clearTokens: () => void;
  isTokenExpired: () => boolean;
}
