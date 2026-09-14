import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, Menu, X, Sun, Moon, Download, Briefcase } from 'lucide-react';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Roadmap } from './components/Roadmap';
import { AIChat } from './components/AIChat';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHireMe = () => {
    scrollToSection('contact');
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}Krishna_Loshali_Resume.docx`;
    link.download = 'Krishna_Loshali_Resume.docx';
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'ai-chat', label: 'AI Chat' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  // Stable floating-dot positions so they don't jump on every re-render (e.g. scroll).
  const floatingDots = useMemo(
    () =>
      [...Array(6)].map((_, i) => ({
        id: i,
        left: `${(i * 17 + 8) % 100}%`,
        top: `${(i * 29 + 12) % 100}%`,
        duration: 8 + (i % 4) * 1.5,
      })),
    []
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white'
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-slate-900'
      }`}
    >
      {/* Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 
            ? 'bg-slate-900/80 backdrop-blur-md shadow-xl' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              KL
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-3 py-2 text-slate-300 hover:text-white transition-colors duration-200 group"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </motion.button>
              ))}
            </div>

            {/* Action Buttons & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Resume Button */}
              <motion.button
                onClick={handleDownloadResume}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
                <span className="text-sm">Resume</span>
              </motion.button>

              {/* Hire Me Button */}
              <motion.button
                onClick={handleHireMe}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Briefcase size={16} />
                <span className="text-sm">Hire Me</span>
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-700"
            >
              <div className="container mx-auto px-6 py-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-3 text-slate-300 hover:text-white transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                {/* Mobile Action Buttons */}
                <div className="pt-4 border-t border-slate-700/50 mt-4 space-y-2">
                  <motion.button
                    onClick={handleDownloadResume}
                    className="flex items-center space-x-2 w-full px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                  >
                    <Download size={16} />
                    <span>Download Resume</span>
                  </motion.button>
                  
                  <motion.button
                    onClick={handleHireMe}
                    className="flex items-center space-x-2 w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navItems.length + 1) * 0.1 }}
                  >
                    <Briefcase size={16} />
                    <span>Hire Me</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main>
        <section id="hero" className="scroll-mt-24">
          <Hero />
        </section>
        
        <section id="projects" className="scroll-mt-24">
          <Projects />
        </section>
        
        <section id="skills" className="scroll-mt-24">
          <Skills />
        </section>
        
        <section id="roadmap" className="scroll-mt-24">
          <Roadmap />
        </section>
        
        <section id="ai-chat" className="scroll-mt-24">
          <AIChat />
        </section>

        <section id="blog" className="scroll-mt-24">
          <Blog />
        </section>
        
        <section id="contact" className="scroll-mt-24">
          <Contact />
        </section>
      </main>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {floatingDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
            style={{ left: dot.left, top: dot.top }}
            animate={{
              y: [-20, 20, -20],
              x: [20, -20, 20],
            }}
            transition={{
              duration: dot.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-700/50 py-8 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-slate-400 mb-2">
              Built with React, TypeScript, and Tailwind CSS
            </p>
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Krishna Loshali. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}