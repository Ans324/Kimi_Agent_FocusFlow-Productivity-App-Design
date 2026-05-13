import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Plus, Trash2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Habit {
  id: number;
  name: string;
  streak: number;
  completed: boolean;
  color: string;
  history: boolean[];
}

const INITIAL_HABITS: Habit[] = [
  {
    id: 1,
    name: 'Morning Meditation',
    streak: 12,
    completed: true,
    color: '#6366f1',
    history: [true, true, true, true, false, true, true],
  },
  {
    id: 2,
    name: 'Deep Work Session',
    streak: 8,
    completed: true,
    color: '#8b5cf6',
    history: [true, true, false, true, true, true, true],
  },
  {
    id: 3,
    name: 'Read 30 Pages',
    streak: 5,
    completed: false,
    color: '#06b6d4',
    history: [true, false, true, true, true, false, false],
  },
  {
    id: 4,
    name: 'Exercise',
    streak: 15,
    completed: true,
    color: '#22c55e',
    history: [true, true, true, true, true, true, true],
  },
  {
    id: 5,
    name: 'Journal Entry',
    streak: 3,
    completed: false,
    color: '#f59e0b',
    history: [false, true, false, true, false, false, false],
  },
  {
    id: 6,
    name: 'No Social Media',
    streak: 7,
    completed: true,
    color: '#ef4444',
    history: [true, true, true, false, true, true, true],
  },
];

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function HabitTracker() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [newHabit, setNewHabit] = useState('');
  const nextId = useRef(7);

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

    const cards = section.querySelectorAll('.habit-card');
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      }
    );
  }, []);

  const toggleHabit = useCallback((id: number) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;
        const newCompleted = !h.completed;
        return {
          ...h,
          completed: newCompleted,
          streak: newCompleted ? h.streak + 1 : Math.max(0, h.streak - 1),
          history: [...h.history.slice(1), newCompleted],
        };
      })
    );
  }, []);

  const addHabit = useCallback(() => {
    if (newHabit.trim() === '') return;
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444'];
    setHabits((prev) => [
      ...prev,
      {
        id: nextId.current++,
        name: newHabit.trim(),
        streak: 0,
        completed: false,
        color: colors[prev.length % colors.length],
        history: [false, false, false, false, false, false, false],
      },
    ]);
    setNewHabit('');
  }, [newHabit]);

  const deleteHabit = useCallback((id: number) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
  const completedToday = habits.filter((h) => h.completed).length;

  return (
    <section
      id="habits"
      ref={sectionRef}
      style={{
        background: '#0a0a0b',
        minHeight: '100vh',
        padding: '12rem var(--page-padding)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        <div ref={textRef} style={{ marginBottom: '4rem' }}>
          <div className="section-label animate-in" style={{ marginBottom: '2rem', color: '#6366f1' }}>
            07 / HABIT TRACKER
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
            Build Consistency, One Day at a Time
          </h2>

          <p
            className="animate-in"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: '16px',
              color: '#b0b2b5',
              lineHeight: 1.7,
              maxWidth: '600px',
              marginBottom: '3rem',
            }}
          >
            Small actions compound into extraordinary results. Track your daily habits, maintain streaks, and watch your consistency transform your life.
          </p>

          {/* Summary stats */}
          <div className="animate-in" style={{ display: 'flex', gap: '3rem' }}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '48px',
                  color: '#6366f1',
                  lineHeight: 1,
                }}
              >
                {completedToday}/{habits.length}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#7a7c7f',
                  marginTop: '0.5rem',
                }}
              >
                Completed Today
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '48px',
                  color: '#8b5cf6',
                  lineHeight: 1,
                }}
              >
                {totalStreak}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#7a7c7f',
                  marginTop: '0.5rem',
                }}
              >
                Total Streak Days
              </div>
            </div>
          </div>
        </div>

        {/* Add habit */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '2rem',
            maxWidth: '500px',
          }}
        >
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addHabit()}
            placeholder="Add a new habit..."
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: '#ffffff',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 300,
              outline: 'none',
            }}
          />
          <button
            onClick={addHabit}
            style={{
              background: '#6366f1',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.25rem',
              cursor: 'pointer',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 500,
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#818cf8';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = '#6366f1';
            }}
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        {/* Habit cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="habit-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                padding: '1.25rem 1.5rem',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${habit.completed ? `${habit.color}30` : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Toggle button */}
              <button
                onClick={() => toggleHabit(habit.id)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: habit.completed ? habit.color : 'rgba(255,255,255,0.05)',
                  border: `2px solid ${habit.completed ? habit.color : 'rgba(255,255,255,0.15)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                }}
              >
                {habit.completed && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>

              {/* Habit info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: habit.completed ? '#ffffff' : '#b0b2b5',
                    marginBottom: '0.25rem',
                  }}
                >
                  {habit.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Flame size={14} color={habit.color} />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      color: habit.color,
                    }}
                  >
                    {habit.streak} day{habit.streak !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Weekly history */}
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {habit.history.map((done, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        background: done ? habit.color : 'rgba(255,255,255,0.05)',
                        border: `1px solid ${done ? habit.color : 'rgba(255,255,255,0.08)'}`,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: '#7a7c7f',
                      }}
                    >
                      {DAYS[i]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteHabit(habit.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#7a7c7f',
                  padding: '4px',
                  transition: 'color 0.3s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = '#ef4444';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = '#7a7c7f';
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
