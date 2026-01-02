/**
 * GSAP Animation Utilities for SCRIPTEEZE
 * Reusable animation functions with performance optimizations
 */

import gsap from 'gsap';

// Check for reduced motion preference
export const prefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Default animation config
const defaultConfig = {
    duration: 0.8,
    ease: 'power3.out',
};

// Cubic bezier easings for premium motion
export const easings = {
    smooth: 'power2.out',
    snappy: 'power3.out',
    elastic: 'elastic.out(1, 0.5)',
    bounce: 'bounce.out',
    expo: 'expo.out',
    cinematic: 'power4.out',
};

/**
 * Fade in animation with optional upward motion
 */
export const fadeIn = (
    element: gsap.TweenTarget,
    options: {
        y?: number;
        x?: number;
        duration?: number;
        delay?: number;
        ease?: string;
    } = {}
): gsap.core.Tween | null => {
    if (prefersReducedMotion()) {
        gsap.set(element, { opacity: 1, y: 0, x: 0 });
        return null;
    }

    const { y = 30, x = 0, duration = defaultConfig.duration, delay = 0, ease = defaultConfig.ease } = options;

    return gsap.fromTo(
        element,
        { opacity: 0, y, x },
        { opacity: 1, y: 0, x: 0, duration, delay, ease }
    );
};

/**
 * Fade out animation
 */
export const fadeOut = (
    element: gsap.TweenTarget,
    options: {
        y?: number;
        duration?: number;
        delay?: number;
        ease?: string;
    } = {}
): gsap.core.Tween | null => {
    if (prefersReducedMotion()) {
        gsap.set(element, { opacity: 0 });
        return null;
    }

    const { y = -30, duration = defaultConfig.duration, delay = 0, ease = defaultConfig.ease } = options;

    return gsap.to(element, { opacity: 0, y, duration, delay, ease });
};

/**
 * Staggered fade-in for multiple elements
 */
export const staggerFadeIn = (
    elements: gsap.TweenTarget,
    options: {
        y?: number;
        duration?: number;
        delay?: number;
        stagger?: number;
        ease?: string;
    } = {}
): gsap.core.Tween | null => {
    if (prefersReducedMotion()) {
        gsap.set(elements, { opacity: 1, y: 0 });
        return null;
    }

    const {
        y = 40,
        duration = defaultConfig.duration,
        delay = 0,
        stagger = 0.1,
        ease = easings.cinematic,
    } = options;

    return gsap.fromTo(
        elements,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration, delay, stagger, ease }
    );
};

/**
 * Text reveal animation (word by word)
 */
export const revealText = (
    container: HTMLElement,
    options: {
        duration?: number;
        stagger?: number;
        delay?: number;
        y?: number;
    } = {}
): gsap.core.Timeline | null => {
    if (prefersReducedMotion()) {
        return null;
    }

    const { duration = 0.6, stagger = 0.08, delay = 0, y = 50 } = options;

    const words = container.querySelectorAll('.word');
    if (!words.length) return null;

    const tl = gsap.timeline({ delay });

    tl.fromTo(
        words,
        { y, opacity: 0, rotateX: -20 },
        {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration,
            stagger,
            ease: easings.cinematic,
        }
    );

    return tl;
};

/**
 * Split text into words for animation
 */
export const splitTextIntoWords = (text: string): string[] => {
    return text.split(' ').filter(word => word.length > 0);
};

/**
 * Scale and fade animation
 */
export const scaleFadeIn = (
    element: gsap.TweenTarget,
    options: {
        scale?: number;
        duration?: number;
        delay?: number;
        ease?: string;
    } = {}
): gsap.core.Tween | null => {
    if (prefersReducedMotion()) {
        gsap.set(element, { opacity: 1, scale: 1 });
        return null;
    }

    const { scale = 0.9, duration = defaultConfig.duration, delay = 0, ease = easings.smooth } = options;

    return gsap.fromTo(
        element,
        { opacity: 0, scale },
        { opacity: 1, scale: 1, duration, delay, ease }
    );
};

/**
 * Slide in from direction
 */
export const slideIn = (
    element: gsap.TweenTarget,
    direction: 'left' | 'right' | 'up' | 'down' = 'up',
    options: {
        distance?: number;
        duration?: number;
        delay?: number;
        ease?: string;
    } = {}
): gsap.core.Tween | null => {
    if (prefersReducedMotion()) {
        gsap.set(element, { opacity: 1, x: 0, y: 0 });
        return null;
    }

    const { distance = 80, duration = defaultConfig.duration, delay = 0, ease = easings.cinematic } = options;

    const from: gsap.TweenVars = { opacity: 0 };

    switch (direction) {
        case 'left':
            from.x = -distance;
            break;
        case 'right':
            from.x = distance;
            break;
        case 'up':
            from.y = distance;
            break;
        case 'down':
            from.y = -distance;
            break;
    }

    return gsap.fromTo(element, from, { opacity: 1, x: 0, y: 0, duration, delay, ease });
};

/**
 * Create parallax effect
 */
export const parallax = (
    element: gsap.TweenTarget,
    scrollTrigger: gsap.plugins.ScrollTriggerInstanceVars,
    options: {
        yPercent?: number;
        ease?: string;
    } = {}
): gsap.core.Tween => {
    const { yPercent = -20, ease = 'none' } = options;

    return gsap.to(element, {
        yPercent,
        ease,
        scrollTrigger: {
            trigger: element as gsap.DOMTarget,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            ...scrollTrigger,
        },
    });
};

/**
 * Line/divider draw animation
 */
export const drawLine = (
    element: gsap.TweenTarget,
    options: {
        duration?: number;
        delay?: number;
        ease?: string;
    } = {}
): gsap.core.Tween | null => {
    if (prefersReducedMotion()) {
        gsap.set(element, { scaleX: 1 });
        return null;
    }

    const { duration = 1, delay = 0, ease = easings.smooth } = options;

    return gsap.fromTo(
        element,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration, delay, ease }
    );
};

/**
 * Glow pulse animation
 */
export const glowPulse = (
    element: gsap.TweenTarget,
    options: {
        intensity?: number;
        duration?: number;
    } = {}
): gsap.core.Timeline | null => {
    if (prefersReducedMotion()) return null;

    const { intensity = 1.2, duration = 2 } = options;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(element, {
        boxShadow: `0 0 ${60 * intensity}px rgba(245, 166, 35, ${0.3 * intensity})`,
        duration,
        ease: 'power1.inOut',
    });

    return tl;
};

/**
 * Counter animation for numbers
 */
export const animateCounter = (
    element: HTMLElement,
    endValue: number,
    options: {
        duration?: number;
        delay?: number;
        suffix?: string;
        prefix?: string;
    } = {}
): gsap.core.Tween | null => {
    if (prefersReducedMotion()) {
        element.textContent = `${options.prefix || ''}${endValue}${options.suffix || ''}`;
        return null;
    }

    const { duration = 2, delay = 0, suffix = '', prefix = '' } = options;

    const obj = { value: 0 };

    return gsap.to(obj, {
        value: endValue,
        duration,
        delay,
        ease: 'power2.out',
        onUpdate: () => {
            element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
        },
    });
};
