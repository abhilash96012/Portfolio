import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const bootText = [
    "INITIALIZING AI SYSTEM...",
    "Establishing secure connection to server...",
    "Loading Developer Profile: Abhilash...",
    "Compiling Java modules...",
    "Mounting React frontend...",
    "Injecting Cyberpunk aesthetics...",
    "Loading Projects...",
    "Loading Skills...",
    "Access Granted."
  ];

  useEffect(() => {
    let delay = 0;
    bootText.forEach((text, index) => {
      delay += Math.random() * 300 + 200; // Random delay between 200ms and 500ms
      setTimeout(() => {
        setLines(prev => [...prev, text]);
        if (index === bootText.length - 1) {
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 800); // Wait for fade out animation
          }, 1000);
        }
      }, delay);
    });
  }, []);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col justify-end p-8 bg-[#030014] text-[#00f0ff] font-mono text-sm md:text-base overflow-hidden"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
          </div>
          
          <div className="w-full max-w-3xl mx-auto space-y-2 z-10 glitch-wrapper mb-20">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={i === bootText.length - 1 ? "text-green-400 font-bold mt-4" : ""}
              >
                <span className="opacity-50 mr-2">{`>`}</span> {line}
              </motion.div>
            ))}
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-3 h-5 bg-[#00f0ff] ml-1 align-middle"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
