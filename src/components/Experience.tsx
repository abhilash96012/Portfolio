import { motion } from 'framer-motion';
import { FiGithub, FiCode, FiTrendingUp, FiActivity } from 'react-icons/fi';

export default function Experience() {
  const stats = [
    { label: 'GitHub Contributions', value: '1,240+', icon: <FiGithub />, color: '#00f0ff' },
    { label: 'Repositories', value: '35+', icon: <FiCode />, color: '#8a2be2' },
    { label: 'LeetCode Problems', value: '450+', icon: <FiActivity />, color: '#ff00ff' },
    { label: 'Current Streak', value: '42 Days', icon: <FiTrendingUp />, color: '#00ffff' },
  ];

  const experience = [
    {
      role: "Java Full Stack Trainee",
      company: "Tech Academy",
      period: "2023 - Present",
      desc: "Developing enterprise-level applications using Spring Boot and React. Mastering advanced Data Structures and Algorithms.",
      tech: ["Java", "Spring Boot", "React", "MySQL"]
    },
    {
      role: "Web Development Intern",
      company: "StartUp Inc.",
      period: "Summer 2023",
      desc: "Built responsive frontend interfaces and optimized database queries reducing load time by 30%.",
      tech: ["HTML/CSS", "JavaScript", "MongoDB"]
    }
  ];

  return (
    <section id="experience" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Coding Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#8a2be2]">Live Telemetry</span>
            </h2>
            <p className="text-gray-400">Real-time coding statistics and metrics</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group interactive"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                  style={{ backgroundColor: stat.color }} 
                />
                <div className="text-3xl mb-3" style={{ color: stat.color }}>{stat.icon}</div>
                <h4 className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tighter font-mono text-glow" style={{ textShadow: `0 0 10px ${stat.color}` }}>
                  {stat.value}
                </h4>
                <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8a2be2] to-[#ff00ff]">Experience Logs</span>
            </h2>
            <p className="text-gray-400">Professional timeline and roles</p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                className="glass-panel p-6 md:p-8 rounded-2xl border-l-4 neon-border hover:bg-white/5 transition-colors interactive"
                style={{ borderLeftColor: i % 2 === 0 ? '#00f0ff' : '#8a2be2' }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <p className="text-lg text-gray-300">{exp.company}</p>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm font-mono text-[#00f0ff] border border-[#00f0ff]/30 w-fit">
                    {exp.period}
                  </div>
                </div>
                
                <p className="text-gray-400 mb-6 leading-relaxed">{exp.desc}</p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t, j) => (
                    <span key={j} className="px-3 py-1 text-xs rounded-md bg-black/50 text-gray-300 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
