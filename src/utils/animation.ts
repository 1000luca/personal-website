/**
 * Animation Helper Functions
 * Utilities for working with Framer Motion animations
 */

import type { Variants } from 'framer-motion';

/**
 * Creates a stagger container variant with custom timing
 */
export const createStaggerContainer = (
  delayChildren = 0.3,
  staggerChildren = 0.1
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren,
      staggerChildren,
    },
  },
});

/**
 * Creates a fade-in variant with custom direction and duration
 */
export const createFadeIn = (
  direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'up',
  distance = 30,
  duration = 0.6
): Variants => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return {
    hidden: { opacity: 0, ...directionMap[direction] },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration },
    },
  };
};

/**
 * Creates a scale animation variant
 */
export const createScale = (
  initialScale = 0.8,
  finalScale = 1,
  duration = 0.5
): Variants => ({
  hidden: { opacity: 0, scale: initialScale },
  visible: {
    opacity: 1,
    scale: finalScale,
    transition: { duration },
  },
});

/**
 * Creates a slide animation variant
 */
export const createSlide = (
  direction: 'left' | 'right' | 'up' | 'down',
  distance = 100,
  duration = 0.6
): Variants => {
  const directionMap = {
    left: { x: -distance },
    right: { x: distance },
    up: { y: -distance },
    down: { y: distance },
  };

  return {
    hidden: { ...directionMap[direction], opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration },
    },
  };
};

/**
 * Animation presets for common use cases
 */
export const animationPresets = {
  // Quick fade in
  quickFade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  },

  // Smooth entrance
  smoothEntrance: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },

  // Bounce in
  bounceIn: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.68, -0.55, 0.265, 1.55],
      },
    },
  },

  // Gentle float
  gentleFloat: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
};

/**
 * Viewport configuration for scroll-triggered animations
 */
export const defaultViewport = {
  once: true,
  amount: 0.3,
};

/**
 * Transition presets
 */
export const transitionPresets = {
  spring: {
    type: 'spring',
    stiffness: 100,
    damping: 10,
  },
  smooth: {
    duration: 0.5,
    ease: 'easeInOut',
  },
  snappy: {
    duration: 0.2,
    ease: 'easeOut',
  },
};
