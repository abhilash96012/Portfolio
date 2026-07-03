import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    title: 'AI File Organizer',
    tech: ['React', 'Python', 'AI', 'Tailwind'],
    desc: 'An intelligent file management system that categorizes files automatically using AI.',
    features: ['Auto-categorization', 'Smart Search', 'Duplicate Detection'],
    github: '#',
    demo: '#',
    color: '#00f0ff'
  },
  {
    title: 'Passport Photo Printing App',
    tech: ['Java', 'Spring Boot', 'React'],
    desc: 'A full-stack application to automatically format and arrange passport photos for printing.',
    features: ['Auto-cropping', 'Layout Generation', 'Export to PDF'],
    github: '#',
    demo: '#',
    color: '#8a2be2'
  },
  {
    title: 'Expense Tracker',
    tech: ['React', 'Node.js', 'MongoDB'],
    desc: 'A comprehensive financial dashboard to track income, expenses, and visualize spending habits.',
    features: ['Data Visualization', 'Budget Alerts', 'Monthly Reports'],
    github: '#',
    demo: '#',
    color: '#ff00ff'
  },
  {
    title: 'Chat Application',
    tech: ['React', 'Firebase', 'Tailwind'],
    desc: 'Real-time messaging platform with group chats and media sharing capabilities.',
    features: ['Real-time Sync', 'Media Uploads', 'Read Receipts'],
    github: '#',
    demo: '#',
    color: '#00ffff'
  }
];

const ProjectCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="perspective-1000 w-full"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full glass-panel rounded-2xl p-6 md:p-8 cursor-none interactive relative group border border-white/10 overflow-hidden"
      >
        {/* Glow behind card */}
        <div 
          className="absolute -inset-1 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-2xl z-0" 
          style={{ backgroundColor: project.color }} 
        />
        
        <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <div className="flex gap-3">
              <a href={project.github} className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors interactive">
                <FiGithub size={20} className="text-gray-300 hover:text-white" />
              </a>
              <a href={project.demo} className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors interactive">
                <FiExternalLink size={20} className="text-gray-300 hover:text-white" />
              </a>
            </div>
          </div>
          
          <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
            {project.desc}
          </p>
          
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Key Features</h4>
            <ul className="list-none space-y-1">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.color }} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-auto" style={{ transform: "translateZ(20px)" }}>
            {project.tech.map((t, i) => (
              <span 
                key={i} 
                className="px-3 py-1 text-xs font-medium rounded-full bg-black/40 border border-white/10 text-gray-300 backdrop-blur-md"
                style={{ borderColor: `color-mix(in srgb, ${project.color} 30%, transparent)` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#8a2be2]">Holographic Archives</span>
          </h2>
          <p className="text-gray-400">Featured development projects</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 perspective-1000">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
