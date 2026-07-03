import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Welcome. I am your AI guide. Ask me anything about Abhilash.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');

    // Simulate AI response based on keywords
    setTimeout(() => {
      let aiResponse = "I'm not sure about that. Try asking about his skills, projects, or resume.";
      const lowerInput = userMsg.toLowerCase();

      if (lowerInput.includes('skill')) {
        aiResponse = "Abhilash is highly skilled in Java, Spring Boot, React, and MySQL. He is a Full Stack Developer!";
      } else if (lowerInput.includes('project')) {
        aiResponse = "He has built some impressive projects, including an AI File Organizer and an Expense Tracker. Scroll down to see them!";
      } else if (lowerInput.includes('resume')) {
        aiResponse = "You can download his resume from the top navigation bar or the Hero section.";
      } else if (lowerInput.includes('contact') || lowerInput.includes('hire')) {
        aiResponse = "Great! You can reach out to him via the Contact section at the bottom of the page.";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        aiResponse = "Hello! Ready to explore the portfolio?";
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    }, 600);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[90]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#00f0ff] text-black flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] interactive"
        >
          {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[400px] glass-panel rounded-2xl border border-[#00f0ff]/30 z-[90] flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[#00f0ff]/20 bg-black/50 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
              <h3 className="font-mono text-[#00f0ff] text-sm">System Assistant</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-[#00f0ff]/20 text-[#00f0ff] rounded-tr-none border border-[#00f0ff]/30'
                        : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-[#00f0ff]/20 bg-black/50 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 px-2 interactive"
              />
              <button
                type="submit"
                className="p-2 text-[#00f0ff] hover:bg-[#00f0ff]/10 rounded-full transition-colors interactive"
              >
                <FiSend size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
