import { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import Cursor from './components/Cursor';
import BootSequence from './components/BootSequence';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AIAssistant from './components/AIAssistant';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
  const [booting, setBooting] = useState(true);

  // Prevent scrolling while booting
  useEffect(() => {
    if (booting) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
  }, [booting]);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      {booting && <BootSequence onComplete={() => setBooting(false)} />}
      
      {!booting && <Cursor />}
      
      <div className={`transition-opacity duration-1000 ${booting ? 'opacity-0' : 'opacity-100'}`}>
        {!booting && <Navbar />}
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        
        {!booting && <AIAssistant />}
      </div>
    </ReactLenis>
  );
}

export default App;
