import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillsData = [
  { name: 'Java', color: '#f89820' },
  { name: 'Spring Boot', color: '#6db33f' },
  { name: 'React', color: '#61dafb' },
  { name: 'MySQL', color: '#00758f' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'Git', color: '#f05032' },
  { name: 'REST API', color: '#00f0ff' },
  { name: 'HTML', color: '#e34f26' },
  { name: 'CSS', color: '#1572b6' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Tailwind', color: '#38b2ac' },
];

const SkillRing = ({ skill, index }: { skill: typeof skillsData[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col items-center justify-center m-4 cursor-none interactive"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-dashed opacity-30"
          style={{ borderColor: skill.color }}
        />
        
        {/* Inner Ring - Pulses on Hover */}
        <motion.div
          animate={isHovered ? { 
            scale: [1, 1.1, 1],
            boxShadow: `0 0 20px ${skill.color}, inset 0 0 10px ${skill.color}`
          } : {
            scale: 1,
            boxShadow: `0 0 0px ${skill.color}`
          }}
          transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
          className="absolute inset-2 rounded-full border border-solid opacity-50"
          style={{ borderColor: skill.color }}
        />
        
        {/* Core */}
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          className="w-20 h-20 rounded-full glass-panel flex items-center justify-center z-10"
        >
          <span className="font-bold text-sm text-center px-2" style={{ color: isHovered ? skill.color : '#e2e8f0', textShadow: isHovered ? `0 0 10px ${skill.color}` : 'none' }}>
            {skill.name}
          </span>
        </motion.div>

        {/* Particles */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full top-1/2 left-1/2"
                  style={{ backgroundColor: skill.color }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    opacity: 0,
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00f0ff]/5 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#8a2be2]">Technical Matrix</span>
          </h2>
          <p className="text-gray-400">Hover over modules to activate energy cores</p>
        </motion.div>

        <div className="flex flex-wrap justify-center max-w-4xl mx-auto gap-2 md:gap-6">
          {skillsData.map((skill, index) => (
            <SkillRing key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
