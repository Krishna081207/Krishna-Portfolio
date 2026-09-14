import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Play, Github, Linkedin, Mail, MapPin, Calendar, Award, ExternalLink } from 'lucide-react';

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const techStack = [
    'Python', 'C', 'C++', 'React', 'Next.js', 'FastAPI',
    'PyTorch', 'Transformers', 'Computer Vision', 'PostgreSQL', 'Hugging Face', 'Git'
  ];

  const achievements = [
    { icon: Award, text: 'B.Tech AI & DS, CGPA 8.95', count: 'USAR' },
    { icon: Calendar, text: 'Full-Stack + LLM Projects', count: '5+' },
    { icon: MapPin, text: 'Based in', count: 'India' }
  ];

  const handleVoiceIntro = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        "Hello! I'm Krishna Loshali, a B.Tech AI and Data Science student at USAR, GGSIPU. I build full-stack apps with React, Next.js and FastAPI, and machine-learning systems with PyTorch — including a Hindi story LLM trained from scratch. Welcome to my space!"
      );
      utterance.rate = 0.9;
      utterance.pitch = 1;
      setIsPlaying(true);

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/30 to-indigo-900/50"></div>
        
        {/* Parallax Elements */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        />
        
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.015,
            y: mousePosition.y * -0.015,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        />
      </div>

      <div className="container mx-auto px-6 py-20 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="flex items-center space-x-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    KL
                  </div>
                  <div>
                    <div className="text-xl text-slate-300">Krishna Loshali</div>
                  </div>
                </motion.div>

                <motion.h1 
                  className="text-4xl lg:text-6xl font-bold leading-tight mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  AI & Data Science Undergrad &{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Full-Stack + ML Builder
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Hi Navigators — welcome to my space. B.Tech AI & DS @ USAR, GGSIPU (CGPA 8.95). I ship full-stack platforms (React, Next.js, FastAPI, PostgreSQL) and ML systems (PyTorch, Transformers, computer vision) — from a doctor-patient platform to a 20M-parameter Hindi LLM.
                </motion.p>
                
                <motion.div
                  className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-2 text-slate-400">
                      <achievement.icon size={16} />
                      <span className="text-sm">{achievement.count} {achievement.text}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.button
                  onClick={scrollToContact}
                  className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail size={20} />
                  <span>Get In Touch</span>
                </motion.button>

                <motion.button
                  onClick={scrollToProjects}
                  className="flex items-center space-x-3 px-6 py-3 border-2 border-cyan-500 rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink size={20} />
                  <span>View Projects</span>
                </motion.button>

                <motion.button
                  onClick={handleVoiceIntro}
                  className="flex items-center space-x-3 px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isPlaying}
                >
                  <Play size={20} className={isPlaying ? 'animate-pulse' : ''} />
                  <span>{isPlaying ? 'Playing...' : 'Voice Intro'}</span>
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex space-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.a
                  href="https://github.com/krishna081207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all duration-300 hover:scale-110"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Github size={24} />
                </motion.a>
                
                <motion.a
                  href="https://www.linkedin.com/in/krishna-loshali-51847a372"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all duration-300 hover:scale-110"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Linkedin size={24} />
                </motion.a>
              </motion.div>
            </div>

            {/* Right Column - Visual Elements */}
            <div className="relative">
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* Professional Avatar/Visual */}
                <div className="relative mx-auto w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center backdrop-blur-sm border border-cyan-500/30">
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-6xl font-bold text-cyan-400">
                    KL
                  </div>
                  
                  {/* Floating Tech Icons */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-14 h-14 bg-slate-800/80 rounded-lg flex items-center justify-center backdrop-blur-sm border border-cyan-500/30"
                      style={{
                        top: `${20 + Math.sin(i * 0.785) * 140}px`,
                        left: `${160 + Math.cos(i * 0.785) * 140}px`,
                      }}
                      animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, delay: i * 0.3 },
                      }}
                    >
                      <span className="text-cyan-400 font-bold text-xs text-center leading-tight">
                        {techStack[i]?.includes(' ') ? 
                          techStack[i].split(' ').map(word => word.slice(0, 2)).join('') : 
                          techStack[i]?.slice(0, 3)
                        }
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-full text-sm text-slate-300 hover:text-white transition-all duration-300 cursor-pointer backdrop-blur-sm border border-slate-700/50"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <motion.div
          className="flex flex-col items-center space-y-2 text-slate-400"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </div>
  );
};