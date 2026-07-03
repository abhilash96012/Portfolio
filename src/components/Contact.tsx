import { useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { FiMail, FiSend, FiTerminal, FiLinkedin, FiGithub } from 'react-icons/fi';

const MagneticButton = ({ children, className = '', onClick }: any) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      className={`interactive ${className}`}
    >
      {children}
    </motion.button>
  );
};

const Terminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    { type: 'system', text: 'Terminal ready. Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'user', text: `> ${cmd}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({ type: 'system', text: 'Commands: about, skills, projects, resume, contact, clear, hire me' });
        break;
      case 'about':
        newHistory.push({ type: 'system', text: 'Abhilash: Java Full Stack Developer from India.' });
        break;
      case 'skills':
        newHistory.push({ type: 'system', text: 'Java, Spring Boot, React, MySQL, MongoDB, Tailwind...' });
        break;
      case 'hire me':
        newHistory.push({ type: 'success', text: 'INITIATING RECRUITMENT PROTOCOL... CONTACTING ABHILASH IMMEDIATELY!' });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        newHistory.push({ type: 'error', text: `Command not found: ${cmd}` });
    }

    setHistory(newHistory);
    setInput('');
    setTimeout(() => {
      if (inputRef.current) inputRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="w-full mt-12">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00f0ff] transition-colors mx-auto interactive mb-4"
      >
        <FiTerminal /> {isOpen ? 'Close Terminal' : 'Open Command Terminal'}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="w-full max-w-2xl mx-auto bg-black/80 border border-[#00f0ff]/30 rounded-lg p-4 font-mono text-sm shadow-[0_0_20px_rgba(0,240,255,0.1)] text-left"
        >
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          
          <div className="h-48 overflow-y-auto mb-2 space-y-1">
            {history.map((h, i) => (
              <div key={i} className={
                h.type === 'user' ? 'text-white' : 
                h.type === 'error' ? 'text-red-400' : 
                h.type === 'success' ? 'text-green-400 font-bold animate-pulse' : 
                'text-[#00f0ff]'
              }>
                {h.text}
              </div>
            ))}
            <div ref={inputRef} />
          </div>
          
          <form onSubmit={handleCommand} className="flex gap-2 text-[#00f0ff]">
            <span>$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white interactive"
              autoFocus
            />
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative z-10 overflow-hidden">
      {/* Abstract Map Background Simulation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#8a2be2]">Establish Connection</span>
          </h2>
          <p className="text-gray-400">Initiate secure communication channel</p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 rounded-3xl neon-border flex flex-col gap-6 max-w-2xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-[#00f0ff] font-mono ml-2">ID_STRING // NAME</label>
              <input type="text" placeholder="Enter your name" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00f0ff] transition-colors interactive" />
            </div>
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm text-[#00f0ff] font-mono ml-2">COMM_LINK // EMAIL</label>
              <input type="email" placeholder="Enter your email" className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00f0ff] transition-colors interactive" />
            </div>
          </div>
          
          <div className="flex flex-col gap-2 text-left">
            <label className="text-sm text-[#00f0ff] font-mono ml-2">PAYLOAD // MESSAGE</label>
            <textarea rows={4} placeholder="Transmit your message..." className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00f0ff] transition-colors resize-none interactive" />
          </div>
          
          <MagneticButton className="mt-4 bg-[#00f0ff] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white transition-colors group w-full">
            TRANSMIT <FiSend className="group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
        </motion.form>

        <div className="mt-12 flex justify-center gap-6">
          <a href="#" className="p-4 rounded-full glass-panel hover:bg-white/10 hover:text-[#00f0ff] transition-all interactive text-gray-400">
            <FiGithub size={24} />
          </a>
          <a href="#" className="p-4 rounded-full glass-panel hover:bg-white/10 hover:text-[#00f0ff] transition-all interactive text-gray-400">
            <FiLinkedin size={24} />
          </a>
          <a href="#" className="p-4 rounded-full glass-panel hover:bg-white/10 hover:text-[#00f0ff] transition-all interactive text-gray-400">
            <FiMail size={24} />
          </a>
        </div>

        <Terminal />
      </div>
    </section>
  );
}
