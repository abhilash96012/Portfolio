import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('home');

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const links = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    setActive(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full glass-panel flex items-center gap-8 interactive"
    >
      <div className="text-xl font-bold tracking-tighter text-glow interactive" style={{ color: 'var(--color-neon-blue)' }}>
        A.
      </div>
      <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
        {links.map((link) => (
          <li key={link.id} className="relative">
            <button
              onClick={() => scrollTo(link.id)}
              className={`hover:text-white transition-colors interactive ${active === link.id ? 'text-white' : 'text-gray-400'}`}
            >
              {link.name}
            </button>
            {active === link.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[#00f0ff] text-glow rounded-full"
              />
            )}
          </li>
        ))}
      </ul>
      <a
        href="/resume.pdf"
        target="_blank"
        className="hidden md:block px-4 py-2 text-xs font-semibold uppercase tracking-widest border border-[#00f0ff] rounded-full text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all interactive neon-border"
      >
        Resume
      </a>
    </motion.nav>
  );
}
