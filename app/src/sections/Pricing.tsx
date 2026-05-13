import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Zap, Crown, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    icon: Star,
    color: '#7a7c7f',
    features: [
      '3 focus sessions per day',
      'Basic task planner',
      'Daily habit tracker',
      'Weekly analytics',
      'Community support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'For serious productivity',
    icon: Zap,
    color: '#6366f1',
    features: [
      'Unlimited focus sessions',
      'Advanced task planner',
      'Full habit tracker',
      'Daily & weekly analytics',
      'AI assistant (50 msg/mo)',
      'Priority support',
      'Custom themes',
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: '/month',
    description: 'For teams & organizations',
    icon: Crown,
    color: '#8b5cf6',
    features: [
      'Everything in Pro',
      'Collaborative rooms',
      'Team analytics dashboard',
      'AI assistant (unlimited)',
      'Admin controls',
      'SSO integration',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const elements = text.querySelectorAll('.animate-in');
    gsap.fromTo(
      elements,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
        },
      }
    );

    const cards = section.querySelectorAll('.pricing-card');
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      style={{
        background: '#0a0a0b',
        minHeight: '100vh',
        padding: '12rem var(--page-padding)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <div ref={textRef} style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="section-label animate-in" style={{ marginBottom: '2rem', color: '#6366f1' }}>
            09 / PRICING
          </div>

          <h2
            className="animate-in"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}
          >
            Choose Your Focus Level
          </h2>

          <p
            className="animate-in"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: '16px',
              color: '#b0b2b5',
              lineHeight: 1.7,
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            Start free and upgrade when you're ready to unlock your full potential.
          </p>
        </div>

        {/* Pricing cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            alignItems: 'start',
          }}
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className="pricing-card"
                style={{
                  padding: '2.5rem 2rem',
                  background: plan.highlighted ? 'rgba(99,102,241,0.05)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${plan.highlighted ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '16px',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                }}
              >
                {plan.highlighted && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-1px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      padding: '0.4rem 1rem',
                      borderRadius: '0 0 8px 8px',
                    }}
                  >
                    Most Popular
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `${plan.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={20} color={plan.color} />
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '18px',
                      fontWeight: 500,
                      color: '#ffffff',
                    }}
                  >
                    {plan.name}
                  </div>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '48px',
                      color: '#ffffff',
                      lineHeight: 1,
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      color: '#7a7c7f',
                    }}
                  >
                    {plan.period}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    color: '#b0b2b5',
                    marginBottom: '2rem',
                  }}
                >
                  {plan.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                  {plan.features.map((feature) => (
                    <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Check size={16} color={plan.color} />
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '14px',
                          fontWeight: 300,
                          color: '#e6e7e9',
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  style={{
                    width: '100%',
                    padding: '0.875rem',
                    borderRadius: '10px',
                    border: plan.highlighted ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    background: plan.highlighted ? 'linear-gradient(90deg, #6366f1, #8b5cf6)' : 'transparent',
                    color: '#ffffff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (plan.highlighted) {
                      (e.currentTarget as HTMLButtonElement).style.opacity = '0.9';
                    } else {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#6366f1';
                      (e.currentTarget as HTMLButtonElement).style.color = '#6366f1';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.highlighted) {
                      (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                    } else {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)';
                      (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                    }
                  }}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
