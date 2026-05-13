import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What is FocusFlow and how does it work?',
    answer: 'FocusFlow is a comprehensive productivity platform designed to help students and young professionals build better work habits. It combines a Pomodoro timer, task planner, habit tracker, AI assistant, and detailed analytics — all in one beautifully designed interface. Simply create an account, set up your tasks and habits, and let FocusFlow guide you toward peak productivity.',
  },
  {
    question: 'Is FocusFlow free to use?',
    answer: 'Yes! FocusFlow offers a generous free tier with 3 focus sessions per day, basic task planning, habit tracking, and weekly analytics. For unlimited sessions, advanced AI features, and team collaboration, you can upgrade to Pro ($9/month) or Team ($29/month).',
  },
  {
    question: 'How does the AI assistant help with productivity?',
    answer: 'The FocusFlow AI analyzes your work patterns, focus scores, and task completion rates to provide personalized recommendations. It can suggest optimal study schedules, help prioritize tasks, provide motivation when you need it, and even reorganize your workload to prevent burnout.',
  },
  {
    question: 'Can I use FocusFlow on my phone?',
    answer: 'Absolutely! FocusFlow is fully responsive and works seamlessly on desktop, tablet, and mobile devices. Your data syncs across all devices in real-time, so you can track your habits and manage tasks from anywhere.',
  },
  {
    question: 'How does the Pomodoro timer work?',
    answer: 'Our Pomodoro timer follows the proven 25-minute work / 5-minute break cycle, but it\'s fully customizable. You can adjust work and break durations, track session streaks, and view your focus level over time. The timer integrates with our distraction shield to block notifications during deep work.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Security is our top priority. All data is encrypted in transit and at rest using industry-standard AES-256 encryption. We never sell your data to third parties, and you can export or delete your account data at any time. FocusFlow is GDPR compliant.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

    const items = section.querySelectorAll('.faq-item');
    gsap.fromTo(
      items,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{
        background: '#0a0a0b',
        padding: '12rem var(--page-padding)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '800px' }}>
        <div ref={textRef} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label animate-in" style={{ marginBottom: '2rem', color: '#6366f1' }}>
            10 / FAQ
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
            Questions & Answers
          </h2>

          <p
            className="animate-in"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: '16px',
              color: '#b0b2b5',
              lineHeight: 1.7,
            }}
          >
            Everything you need to know about FocusFlow.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-item"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  fontWeight: 400,
                  textAlign: 'left',
                }}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={18}
                  color="#7a7c7f"
                  style={{
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    flexShrink: 0,
                    marginLeft: '1rem',
                  }}
                />
              </button>

              <div
                style={{
                  maxHeight: openIndex === i ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.4s ease, padding 0.3s ease',
                  padding: openIndex === i ? '0 1.5rem 1.25rem' : '0 1.5rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#b0b2b5',
                    lineHeight: 1.7,
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
