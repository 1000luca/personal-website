/**
 * useSmoothScroll Hook
 * Provides smooth scroll to anchor functionality
 */

import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId: string, offset = 80) => {
    const element = document.getElementById(elementId);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const scrollToSection = useCallback(
    (href: string) => {
      // Remove the '#' from href
      const sectionId = href.replace('#', '');

      if (sectionId === 'home') {
        scrollToTop();
      } else {
        scrollToElement(sectionId);
      }
    },
    [scrollToElement, scrollToTop]
  );

  return {
    scrollToElement,
    scrollToTop,
    scrollToSection,
  };
};
