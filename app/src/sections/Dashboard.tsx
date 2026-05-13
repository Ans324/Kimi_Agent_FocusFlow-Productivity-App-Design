import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from 'recharts';
import { TrendingUp, Clock, Target, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const weeklyData = [
  { day: 'Mon', hours: 4.5, score: 78 },
  { day: 'Tue', hours: 6.2, score: 92 },
  { day: 'Wed', hours: 5.8, score: 85 },
  { day: 'Thu', hours: 7.1, score: 96 },
  { day: 'Fri', hours: 3.9, score: 70 },
  { day: 'Sat', hours: 8.3, score: 98 },
  { day: 'Sun', hours: 5.5, score: 88 },
];

const categoryData = [
  { name: 'Study', value: 35, color: '#6366f1' },
  { name: 'Work', value: 28, color: '#8b5cf6' },
  { name: 'Creative', value: 22, color: '#06b6d4' },
  { name: 'Health', value: 15, color: '#22c55e' },
];

const hourlyData = [
  { hour: '6AM', focus: 65 },
  { hour: '8AM', focus: 88 },
  { hour: '10AM', focus: 95 },
  { hour: '12PM', focus: 72 },
  { hour: '2PM', focus: 85 },
  { hour: '4PM', focus: 78 },
  { hour: '6PM', focus: 60 },
  { hour: '8PM', focus: 82 },
  { hour: '10PM', focus: 45 },
];

const stats = [
  { label: 'Focus Score', value: '94%', change: '+12%', icon: Target, color: '#6366f1' },
  { label: 'Hours Today', value: '6.8h', change: '+1.2h', icon: Clock, color: '#8b5cf6' },
  { label: 'Streak', value: '12 days', change: '+3', icon: Zap, color: '#06b6d4' },
  { label: 'Efficiency', value: '87%', change: '+5%', icon: TrendingUp, color: '#22c55e' },
];

export default function Dashboard() {
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

    const cards = section.querySelectorAll('.stat-card, .chart-card');
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
        },
      }
    );
  }, []);

  return (
    <section
      id="dashboard"
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
            06 / DASHBOARD
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
            Your Productivity Analytics
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
            }}
          >
            Track your focus patterns, identify peak performance hours, and watch your productivity compound over time.
          </p>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem',
          }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="stat-card"
                style={{
                  padding: '1.5rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: `${stat.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={18} color={stat.color} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#7a7c7f',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '32px',
                    color: '#ffffff',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}
                >
                  {stat.value}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    color: '#22c55e',
                  }}
                >
                  {stat.change} this week
                </span>
              </div>
            );
          })}
        </div>

        {/* Charts grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {/* Weekly hours chart */}
          <div
            className="chart-card"
            style={{
              padding: '2rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#7a7c7f',
                marginBottom: '1.5rem',
              }}
            >
              Weekly Focus Hours
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="hoursGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: '#7a7c7f', fontSize: 11, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#7a7c7f', fontSize: 11, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="hours" stroke="#6366f1" fill="url(#hoursGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Focus score chart */}
          <div
            className="chart-card"
            style={{
              padding: '2rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#7a7c7f',
                marginBottom: '1.5rem',
              }}
            >
              Focus Score Trend
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: '#7a7c7f', fontSize: 11, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fill: '#7a7c7f', fontSize: 11, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                  }}
                />
                <Area type="monotone" dataKey="score" stroke="#8b5cf6" fill="url(#scoreGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Category breakdown */}
          <div
            className="chart-card"
            style={{
              padding: '2rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#7a7c7f',
                marginBottom: '1.5rem',
              }}
            >
              Category Distribution
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {categoryData.map((cat) => (
                  <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: cat.color }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#b0b2b5' }}>
                      {cat.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#7a7c7f', marginLeft: 'auto' }}>
                      {cat.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hourly focus heatmap */}
          <div
            className="chart-card"
            style={{
              padding: '2rem',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#7a7c7f',
                marginBottom: '1.5rem',
              }}
            >
              Peak Focus Hours
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="hour" tick={{ fill: '#7a7c7f', fontSize: 10, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#7a7c7f', fontSize: 11, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="focus" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
