import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PomodoroTimer from '../components/PomodoroTimer';

gsap.registerPlugin(ScrollTrigger);

export default function LighthouseVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const panel = panelRef.current;
    if (!section || !video || !panel) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    });

    tl.fromTo(video, { opacity: 0 }, { opacity: 1, duration: 1.5, ease: 'power2.out' });
    tl.fromTo(
      panel,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.7'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="lighthouse"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ width: '100vw', height: '100vh' }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: 'cover', opacity: 0 }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="videos/focus.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for better readability */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.4)' }}
      />

      {/* Liquid glass panel */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={panelRef}
          className="liquid-glass"
          style={{
            width: 'min(480px, 85vw)',
            padding: '3rem',
            opacity: 0,
          }}
        >
          <PomodoroTimer workMinutes={25} breakMinutes={5} />
        </div>
      </div>
    </section>
  );
}
