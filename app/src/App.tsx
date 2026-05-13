import { useState, useCallback } from 'react';
import { useLenis } from './hooks/useLenis';
import Navigation from './components/Navigation';
import FullScreenMenu from './components/FullScreenMenu';
import HeroRoomGallery from './sections/HeroRoomGallery';
import ParticleSculpture from './sections/ParticleSculpture';
import TaskPlanner from './sections/TaskPlanner';
import LighthouseVideo from './sections/LighthouseVideo';
import ImageGallery from './sections/ImageGallery';
import HabitTracker from './sections/HabitTracker';
import Dashboard from './sections/Dashboard';
import AIAssistant from './sections/AIAssistant';
import WavesVideo from './sections/WavesVideo';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import FooterTicker from './sections/FooterTicker';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const lenisRef = useLenis();

  const handleMenuOpen = useCallback(() => setMenuOpen(true), []);
  const handleMenuClose = useCallback(() => setMenuOpen(false), []);

  const handleNavigate = useCallback(
    (sectionId: string) => {
      const el = document.getElementById(sectionId);
      if (el && lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: 0 });
      } else if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [lenisRef]
  );

  return (
    <div className="relative">
      <Navigation onMenuOpen={handleMenuOpen} />
      <FullScreenMenu
        isOpen={menuOpen}
        onClose={handleMenuClose}
        onNavigate={handleNavigate}
      />

      <main>
        <HeroRoomGallery />
        <ParticleSculpture />
        <TaskPlanner />
        <LighthouseVideo />
        <ImageGallery />
        <HabitTracker />
        <Dashboard />
        <AIAssistant />
        <WavesVideo />
        <Pricing />
        <FAQ />
      </main>

      <FooterTicker />
    </div>
  );
}

export default App;
