import { useState, useCallback, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Trash2, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: string;
}

const CATEGORIES = ['Study', 'Work', 'Health', 'Creative'];
const PRIORITY_COLORS = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#22c55e',
};

export default function TaskPlanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Complete math assignment', completed: false, priority: 'high', category: 'Study' },
    { id: 2, text: 'Read 30 pages of philosophy', completed: true, priority: 'medium', category: 'Study' },
    { id: 3, text: 'Morning meditation', completed: true, priority: 'high', category: 'Health' },
    { id: 4, text: 'Design portfolio layout', completed: false, priority: 'medium', category: 'Creative' },
    { id: 5, text: 'Review project timeline', completed: false, priority: 'low', category: 'Work' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [selectedCategory, setSelectedCategory] = useState('Study');
  const nextId = useRef(6);

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

  const addTask = useCallback(() => {
    if (newTask.trim() === '') return;
    setTasks((prev) => [
      ...prev,
      {
        id: nextId.current++,
        text: newTask.trim(),
        completed: false,
        priority: selectedPriority,
        category: selectedCategory,
      },
    ]);
    setNewTask('');
  }, [newTask, selectedPriority, selectedCategory]);

  const toggleTask = useCallback((id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <section
      id="planner"
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
        {/* Left column */}
        <div ref={textRef} className="w-full lg:w-[40%]">
          <div className="section-label animate-in" style={{ marginBottom: '2rem', color: '#6366f1' }}>
            03 / SMART PLANNER
          </div>

          <h2
            className="animate-in"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '3rem',
            }}
          >
            Plan Your Day with Intention
          </h2>

          <p
            className="animate-in"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: '16px',
              color: '#b0b2b5',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            Organize your tasks by priority and category. FocusFlow helps you identify what matters most and tackle it with clarity.
          </p>

          {/* Progress */}
          <div className="animate-in" style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#7a7c7f', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Daily Progress
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#6366f1' }}>
                {completedCount}/{tasks.length}
              </span>
            </div>
            <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                  borderRadius: '2px',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
          </div>

          {/* Stats cards */}
          <div className="animate-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {CATEGORIES.map((cat) => {
              const catTasks = tasks.filter((t) => t.category === cat);
              const catDone = catTasks.filter((t) => t.completed).length;
              return (
                <div
                  key={cat}
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#7a7c7f', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                    {cat}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: '#ffffff' }}>
                    {catDone}/{catTasks.length}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column — Task list */}
        <div className="w-full lg:w-[60%]">
          {/* Add task */}
          <div
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                placeholder="Add a new task..."
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
                onClick={addTask}
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

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {(['high', 'medium', 'low'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPriority(p)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    border: `1px solid ${selectedPriority === p ? PRIORITY_COLORS[p] : 'rgba(255,255,255,0.1)'}`,
                    background: selectedPriority === p ? `${PRIORITY_COLORS[p]}20` : 'transparent',
                    color: selectedPriority === p ? PRIORITY_COLORS[p] : '#7a7c7f',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {p}
                </button>
              ))}

              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    border: `1px solid ${selectedCategory === cat ? '#6366f1' : 'rgba(255,255,255,0.1)'}`,
                    background: selectedCategory === cat ? 'rgba(99,102,241,0.15)' : 'transparent',
                    color: selectedCategory === cat ? '#818cf8' : '#7a7c7f',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Task list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: task.completed ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${task.completed ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  opacity: task.completed ? 0.6 : 1,
                }}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  style={{
                    background: 'none',
                    border: `2px solid ${task.completed ? '#22c55e' : 'rgba(255,255,255,0.2)'}`,
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {task.completed && <Check size={14} color="#22c55e" />}
                </button>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '14px',
                      fontWeight: 300,
                      color: task.completed ? '#7a7c7f' : '#ffffff',
                      textDecoration: task.completed ? 'line-through' : 'none',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {task.text}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: PRIORITY_COLORS[task.priority],
                      }}
                    >
                      {task.priority}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.1)' }}>·</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: '#7a7c7f',
                      }}
                    >
                      {task.category}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#7a7c7f',
                    padding: '4px',
                    transition: 'color 0.3s ease',
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
      </div>
    </section>
  );
}
