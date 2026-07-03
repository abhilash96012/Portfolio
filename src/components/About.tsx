import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiMapPin, FiAward, FiBook, FiTarget } from 'react-icons/fi';

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={containerRef} className="py-24 relative overflow-hidden flex flex-col items-center">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#00f0ff]/5 to-[#8a2be2]/5 blur-3xl -z-10 pointer-events-none" />

      <motion.div style={{ y, opacity }} className="max-w-6xl w-full px-6 flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Column - Image & Quick Info */}
        <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start gap-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00f0ff] to-[#8a2be2] rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
            <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-2xl overflow-hidden neon-border z-10 glass-panel">
              <img src={`${import.meta.env.BASE_URL}profile.jpg`} alt="Abhilash" className="w-full h-full object-cover relative z-20 grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
          </motion.div>

          <div className="flex flex-col gap-4 w-full">
            <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
              <FiMapPin className="text-[#00f0ff] text-2xl" />
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="font-semibold">India</p>
              </div>
            </div>
            <div className="glass-panel p-4 rounded-xl flex items-center gap-4">
              <FiAward className="text-[#8a2be2] text-2xl" />
              <div>
                <p className="text-sm text-gray-400">CGPA</p>
                <p className="font-semibold text-glow text-[#8a2be2]">Excellent Academic Record</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Timeline & Mission */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#8a2be2]">Developer Profile</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I am a passionate Java Full Stack Developer with a strong foundation in Data Structures, Algorithms, and modern web technologies. I build scalable backend systems and immersive frontend experiences.
            </p>
            
            <div className="glass-panel p-6 rounded-2xl neon-border-purple relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">
                <FiTarget />
              </div>
              <h3 className="text-xl font-bold text-[#8a2be2] mb-2 flex items-center gap-2">
                <FiTarget /> Mission Statement
              </h3>
              <p className="text-gray-300 relative z-10">
                "To engineer high-performance software solutions that seamlessly bridge complex logic with intuitive design, ultimately shaping the next generation of digital experiences."
              </p>
            </div>
          </motion.div>

          {/* Mini Timeline */}
          <div className="flex flex-col gap-4 mt-4">
            <h3 className="text-xl font-bold text-gray-200 mb-2 flex items-center gap-2">
              <FiBook className="text-[#00f0ff]" /> The Journey
            </h3>
            
            {[
              { year: "Phase 1", title: "Started Programming & Algorithms", desc: "Mastered core Java and built a strong DSA foundation." },
              { year: "Phase 2", title: "Full Stack Development", desc: "Learned Spring Boot, React, and built enterprise-level apps." },
              { year: "Present", title: "Software Engineer", desc: "Preparing and aiming for top-tier software engineering roles." }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 interactive"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${index === 2 ? 'bg-[#00f0ff] text-glow' : 'bg-gray-600'} mt-1.5`} />
                  {index < 2 && <div className="w-0.5 h-full bg-gray-800 mt-2" />}
                </div>
                <div className="pb-6">
                  <span className="text-xs font-mono text-[#8a2be2]">{item.year}</span>
                  <h4 className="text-lg font-bold text-gray-200">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
}
