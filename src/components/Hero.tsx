import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const generateSphere = (numParticles: number, radius: number) => {
  const positions = new Float32Array(numParticles * 3);
  for (let i = 0; i < numParticles; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
};

const ParticleBackground = () => {
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = useState(() => generateSphere(5000, 1.5));

  useFrame((_state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#00f0ff" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
};

const roles = ["Java Full Stack Developer", "Problem Solver", "Software Engineer"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#00f0ff] font-mono mb-4 text-sm md:text-base tracking-widest uppercase"
        >
          System Ready
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#8a2be2] text-glow">Abhilash</span>
        </motion.h1>

        <div className="h-[40px] md:h-[60px] overflow-hidden flex items-center justify-center mb-10">
          <AnimatePresence mode="wait">
            <motion.h2
              key={roleIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
              className="text-2xl md:text-4xl text-gray-300 font-light"
            >
              {roles[roleIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-[#00f0ff] text-black font-semibold hover:bg-white hover:shadow-[0_0_20px_#00f0ff] transition-all interactive"
          >
            Explore Portfolio
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            className="px-8 py-3 rounded-full border border-gray-600 hover:border-[#8a2be2] hover:bg-[rgba(138,43,226,0.1)] transition-all interactive flex items-center justify-center gap-2"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full glass hover:border-[#00f0ff] transition-all interactive"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Gradient overlay for blending */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#030014] to-transparent z-[5]" />
    </section>
  );
}
