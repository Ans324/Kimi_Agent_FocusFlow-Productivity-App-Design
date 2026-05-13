import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Sparkles, User, Bot, Lightbulb, Clock, BookOpen, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AI_SUGGESTIONS = [
  { icon: Lightbulb, text: 'Plan my most productive day', prompt: 'Plan my most productive day' },
  { icon: Clock, text: 'Best study times today', prompt: 'Best study times today' },
  { icon: BookOpen, text: 'Help me stay motivated', prompt: 'Help me stay motivated' },
  { icon: Zap, text: 'Optimize my task list', prompt: 'Optimize my task list' },
];

const RESPONSES: Record<string, string> = {
  'Plan my most productive day':
    "Based on your analytics, your peak focus window is 10AM-12PM. Here is an optimized schedule:\n\n6:30 AM - Wake up, light exercise\n7:00 AM - Morning meditation (15 min)\n7:30 AM - Breakfast + light reading\n8:30 AM - Review tasks, set priorities\n10:00 AM - Deep Work Block #1 (90 min)\n11:45 AM - Short break, hydrate\n12:00 PM - Deep Work Block #2 (90 min)\n2:00 PM - Lunch + rest\n3:00 PM - Lighter tasks, emails\n4:30 PM - Creative work block\n6:00 PM - Exercise\n7:30 PM - Dinner + wind down\n9:00 PM - Journal + plan tomorrow",
  'Best study times today':
    "Your data shows you are most focused between 10 AM and 12 PM, with a secondary peak at 4 PM to 6 PM.\n\nToday's prediction:\n- 9-11 AM: High focus (92%) - Best for complex problem-solving\n- 2-4 PM: Moderate focus (78%) - Good for routine tasks\n- 7-9 PM: Creative peak (85%) - Ideal for writing, designing\n\nTip: Schedule your hardest task for your 10 AM window!",
  'Help me stay motivated':
    "You have maintained a 12-day streak -- that puts you in the top 5% of FocusFlow users!\n\nRemember: Every session you complete is not just one more checkmark. It is a vote for the person you are becoming.\n\nThe person who moves a mountain begins by carrying away small stones.\n\nYour mountain is getting smaller every day. Just one more session. You have got this!",
  'Optimize my task list':
    "Here is my AI-powered prioritization for today:\n\n[DO FIRST] High Impact:\n1. Complete math assignment -- due soon, high cognitive load\n2. Design portfolio layout -- creative work needs your morning energy\n\n[SCHEDULE] Important:\n3. Review project timeline -- mid-day when analytical skills peak\n\n[DEFER] Lower Priority:\n4. Morning meditation -- already done!\n\nTip: Start with the hardest task. Your willpower is highest in the morning!",
};

const WELCOME = "Hello! I am your FocusFlow AI assistant. I can help you plan your day, suggest optimal study times, keep you motivated, and reorganize your tasks.\n\nWhat would you like help with today?";

export default function AIAssistant() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: WELCOME, sender: 'ai', timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const nextId = useRef(2);

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
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = useCallback((text: string) => {
    if (text.trim() === '') return;

    const userMsg: Message = {
      id: nextId.current++,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = RESPONSES[text.trim()] ||
        "I would be happy to help with that! Based on your current focus patterns and task list, I recommend scheduling deep work sessions during your peak hours (10 AM - 12 PM).\n\nWould you like me to create a more detailed plan for you?";

      const aiMsg: Message = {
        id: nextId.current++,
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  }, []);

  const handleSubmit = useCallback(() => {
    sendMessage(input);
  }, [input, sendMessage]);

  return (
    <section
      id="ai"
      ref={sectionRef}
      style={{
        background: '#0a0a0b',
        minHeight: '100vh',
        padding: '12rem var(--page-padding)',
      }}
    >
      <div
        className="mx-auto flex flex-col lg:flex-row gap-16"
        style={{ maxWidth: '1400px' }}
      >
        <div ref={textRef} className="w-full lg:w-[40%]">
          <div className="section-label animate-in" style={{ marginBottom: '2rem', color: '#6366f1' }}>
            08 / AI ASSISTANT
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
            Your Personal Productivity Coach
          </h2>

          <p
            className="animate-in"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: '16px',
              color: '#b0b2b5',
              lineHeight: 1.7,
              marginBottom: '3rem',
            }}
          >
            Let AI help you plan smarter, study better, and stay motivated. Get personalized recommendations based on your unique focus patterns and goals.
          </p>

          <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#7a7c7f',
                marginBottom: '0.5rem',
              }}
            >
              Quick Actions
            </div>
            {AI_SUGGESTIONS.map((suggestion, i) => {
              const Icon = suggestion.icon;
              return (
                <button
                  key={i}
                  onClick={() => sendMessage(suggestion.prompt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 1.25rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    color: '#b0b2b5',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 300,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(99,102,241,0.08)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(99,102,241,0.3)';
                    (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.03)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLButtonElement).style.color = '#b0b2b5';
                  }}
                >
                  <Icon size={18} color="#6366f1" />
                  {suggestion.text}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full lg:w-[60%]">
          <div
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '600px',
            }}
          >
            <div
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={18} color="#ffffff" />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#ffffff',
                  }}
                >
                  FocusFlow AI
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    color: '#22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                  Online
                </div>
              </div>
            </div>

            <div
              style={{
                flex: 1,
                overflow: 'auto',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                    flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: msg.sender === 'ai' ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {msg.sender === 'ai' ? <Bot size={16} color="#ffffff" /> : <User size={16} color="#ffffff" />}
                  </div>

                  <div
                    style={{
                      maxWidth: '75%',
                      padding: '1rem 1.25rem',
                      background: msg.sender === 'ai' ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      border: `1px solid ${msg.sender === 'ai' ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.08)'}`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '14px',
                        fontWeight: 300,
                        color: '#e6e7e9',
                        lineHeight: 1.7,
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {msg.text}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: '#7a7c7f',
                        marginTop: '0.5rem',
                      }}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Bot size={16} color="#ffffff" />
                  </div>
                  <div
                    style={{
                      padding: '1rem 1.25rem',
                      background: 'rgba(99,102,241,0.08)',
                      borderRadius: '12px',
                      border: '1px solid rgba(99,102,241,0.15)',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', animation: 'pulse 1.5s infinite' }} />
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', animation: 'pulse 1.5s infinite 0.2s' }} />
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', animation: 'pulse 1.5s infinite 0.4s' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            <div
              style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                gap: '0.75rem',
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Ask your AI assistant..."
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  color: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 300,
                  outline: 'none',
                }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  background: '#6366f1',
                  border: 'none',
                  borderRadius: '10px',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                }}
              >
                <Send size={18} color="#ffffff" />
              </button>
            </div>
          </div>

          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 0.4; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.2); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
