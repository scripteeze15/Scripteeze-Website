/**
 * Contact Section - Premium contact form with validation
 * Sends enquiries via PHP backend to info@scripteeze.in
 */

import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import gsap from 'gsap';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { prefersReducedMotion, easings } from '../../utils/animations';
import './Contact.css';

interface FormData {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const { ref: triggerRef, isInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<FormStatus>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    // Animate on scroll
    useEffect(() => {
        if (!isInView || prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: easings.cinematic } });

            // Header animation
            tl.fromTo(
                '.contact__header',
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8 },
                0.2
            );

            // Form fields stagger
            tl.fromTo(
                '.contact__form-group',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
                0.4
            );

            // Submit button
            tl.fromTo(
                '.contact__submit',
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.5 },
                0.9
            );

            // Info cards
            tl.fromTo(
                '.contact__info-card',
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.6, stagger: 0.15 },
                0.5
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [isInView]);

    // Validate form
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error on change
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // Handle form submission using FormSubmit service
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            // Shake animation for invalid form
            if (formRef.current && !prefersReducedMotion()) {
                gsap.to(formRef.current, {
                    keyframes: [
                        { x: -10, duration: 0.07 },
                        { x: 10, duration: 0.07 },
                        { x: -8, duration: 0.07 },
                        { x: 8, duration: 0.07 },
                        { x: -5, duration: 0.07 },
                        { x: 5, duration: 0.07 },
                        { x: 0, duration: 0.08 },
                    ],
                    ease: 'power2.out',
                });
            }
            return;
        }

        setStatus('submitting');

        try {
            // PHP backend for Hostinger deployment
            const response = await fetch('/api/contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || 'Not provided',
                    service: formData.service || 'Not specified',
                    message: formData.message,
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setStatus('success');
                setStatusMessage('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');

                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: '',
                    message: '',
                });

                // Success animation
                if (formRef.current && !prefersReducedMotion()) {
                    gsap.fromTo(
                        '.contact__status--success',
                        { opacity: 0, y: 20, scale: 0.95 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
                    );
                }
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            setStatus('error');
            setStatusMessage(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong. Please try again or email us directly at info@scripteeze.in'
            );
        }
    };

    const services = [
        'Social Media Management',
        'Video Editing',
        'Script Writing',
        'Content Ideation',
        'Voice Acting',
        'Thumbnail Design',
        'Complete Package',
        'Other',
    ];

    return (
        <section id="contact" ref={sectionRef} className="contact section">
            {/* Background Elements */}
            <div className="contact__background">
                <div className="contact__gradient-1" />
                <div className="contact__gradient-2" />
                <div className="contact__grid-pattern" />
            </div>

            <div className="container">
                <div ref={triggerRef} className="contact__wrapper">
                    {/* Header */}
                    <div className="contact__header">
                        <span className="contact__label">Get in Touch</span>
                        <h2 className="contact__title">
                            Let's Start Your <span className="text-gradient">Success Story</span>
                        </h2>
                        <p className="contact__subtitle">
                            Ready to transform your content strategy? Fill out the form below and we'll get back to you within 24 hours.
                        </p>
                    </div>

                    <div className="contact__content">
                        {/* Form */}
                        <form
                            ref={formRef}
                            className="contact__form"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            {/* Name */}
                            <div className={`contact__form-group ${errors.name ? 'has-error' : ''}`}>
                                <label htmlFor="contact-name" className="contact__label-text">
                                    Your Name <span className="required">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="contact-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="contact__input"
                                    disabled={status === 'submitting'}
                                />
                                {errors.name && <span className="contact__error">{errors.name}</span>}
                            </div>

                            {/* Email */}
                            <div className={`contact__form-group ${errors.email ? 'has-error' : ''}`}>
                                <label htmlFor="contact-email" className="contact__label-text">
                                    Email Address <span className="required">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="contact-email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="contact__input"
                                    disabled={status === 'submitting'}
                                />
                                {errors.email && <span className="contact__error">{errors.email}</span>}
                            </div>

                            {/* Phone */}
                            <div className="contact__form-group">
                                <label htmlFor="contact-phone" className="contact__label-text">
                                    Phone Number <span className="optional">(Optional)</span>
                                </label>
                                <input
                                    type="tel"
                                    id="contact-phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91 98765 43210"
                                    className="contact__input"
                                    disabled={status === 'submitting'}
                                />
                            </div>

                            {/* Service */}
                            <div className="contact__form-group">
                                <label htmlFor="contact-service" className="contact__label-text">
                                    Service Interested In
                                </label>
                                <select
                                    id="contact-service"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="contact__select"
                                    disabled={status === 'submitting'}
                                >
                                    <option value="">Select a service...</option>
                                    {services.map(service => (
                                        <option key={service} value={service}>
                                            {service}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Message */}
                            <div className={`contact__form-group contact__form-group--full ${errors.message ? 'has-error' : ''}`}>
                                <label htmlFor="contact-message" className="contact__label-text">
                                    Your Message <span className="required">*</span>
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your project and goals..."
                                    rows={5}
                                    className="contact__textarea"
                                    disabled={status === 'submitting'}
                                />
                                {errors.message && <span className="contact__error">{errors.message}</span>}
                            </div>

                            {/* Status Message */}
                            {status !== 'idle' && status !== 'submitting' && (
                                <div className={`contact__status contact__status--${status}`}>
                                    {status === 'success' && (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                    )}
                                    {status === 'error' && (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="15" y1="9" x2="9" y2="15" />
                                            <line x1="9" y1="9" x2="15" y2="15" />
                                        </svg>
                                    )}
                                    <span>{statusMessage}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn btn-primary btn-glow contact__submit"
                                disabled={status === 'submitting'}
                            >
                                {status === 'submitting' ? (
                                    <>
                                        <span className="contact__spinner" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Contact Info */}
                        <div className="contact__info">
                            <div className="contact__info-card">
                                <div className="contact__info-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <div className="contact__info-content">
                                    <h4>Email Us</h4>
                                    <a href="mailto:info@scripteeze.in">info@scripteeze.in</a>
                                </div>
                            </div>

                            <div className="contact__info-card">
                                <div className="contact__info-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                </div>
                                <div className="contact__info-content">
                                    <h4>Follow Us</h4>
                                    <a href="https://instagram.com/scripteeze" target="_blank" rel="noopener noreferrer">
                                        @scripteeze
                                    </a>
                                </div>
                            </div>

                            <div className="contact__info-card">
                                <div className="contact__info-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                                <div className="contact__info-content">
                                    <h4>Response Time</h4>
                                    <span>Within 24 hours</span>
                                </div>
                            </div>

                            <div className="contact__promise">
                                <p>
                                    <strong>Our Promise:</strong> We value your time. Every enquiry receives a personalized response — no automated replies, no generic templates.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
