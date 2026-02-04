/**
 * useIntersectionObserver Hook
 * Detects when an element enters/exits the viewport
 */

import { useEffect, useRef, useState } from 'react';
import type { UseIntersectionObserverOptions } from '../types';

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const { threshold = 0.1, root = null, rootMargin = '0px' } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);

        // Track if element has ever intersected (for one-time animations)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [threshold, root, rootMargin, hasIntersected]);

  return { targetRef, isIntersecting, hasIntersected };
};
