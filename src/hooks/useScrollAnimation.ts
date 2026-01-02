/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 */

import { useEffect, useRef, useState, useMemo, type RefObject } from 'react';

interface UseScrollAnimationOptions {
    threshold?: number | number[];
    rootMargin?: string;
    triggerOnce?: boolean;
}

interface UseScrollAnimationReturn<T extends HTMLElement> {
    ref: RefObject<T>;
    isInView: boolean;
}

/**
 * Check for reduced motion preference
 */
const getPrefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Hook to detect when an element is in viewport
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
    options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn<T> {
    const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;

    const ref = useRef<T>(null);

    // Initialize with true if reduced motion is preferred
    const prefersReducedMotion = useMemo(() => getPrefersReducedMotion(), []);
    const [isInView, setIsInView] = useState(prefersReducedMotion);

    useEffect(() => {
        const element = ref.current;
        if (!element || prefersReducedMotion) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        if (triggerOnce) {
                            observer.unobserve(entry.target);
                        }
                    } else if (!triggerOnce) {
                        setIsInView(false);
                    }
                });
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin, triggerOnce, prefersReducedMotion]);

    return { ref: ref as RefObject<T>, isInView };
}

/**
 * Hook for staggered animations on multiple elements
 */
export function useStaggerAnimation(
    itemCount: number,
    options: UseScrollAnimationOptions & { staggerDelay?: number } = {}
): { ref: RefObject<HTMLDivElement>; isInView: boolean; getDelay: (index: number) => number } {
    const { staggerDelay = 0.1, ...scrollOptions } = options;
    const { ref, isInView } = useScrollAnimation<HTMLDivElement>(scrollOptions);

    const getDelay = (index: number): number => {
        return index * staggerDelay;
    };

    // Use itemCount to avoid unused variable warning
    void itemCount;

    return { ref, isInView, getDelay };
}
