import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Briefcase, GraduationCap, MapPin, Calendar, Play, Pause, RotateCcw } from 'lucide-react';

interface RoadmapItem {
  id: string;
  year: string;
  title: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'education' | 'work' | 'certification' | 'project';
  icon: React.ReactNode;
}

export const Roadmap = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RoadmapItem | null>(null);

  const roadmapItems: RoadmapItem[] = [
    {
      id: 'school',
      year: '2023 – 2025',
      title: 'Class 10 & 12 — 94.2% / 90.2%',
      company: 'Aryaman Vikram Birla / Bhartiyam International',
      location: 'India',
      description: 'Strong school foundations with 94.2% (Class 10) and 90.2% (Class 12) while starting to code.',
      achievements: [
        'Class 10: 94.2%',
        'Class 12: 90.2%',
        'Started C/Python alongside boards'
      ],
      technologies: ['C', 'Python', 'HTML', 'CSS'],
      type: 'education',
      icon: <GraduationCap size={20} />
    },
    {
      id: 'usar',
      year: '2025 – 2029',
      title: 'B.Tech AI & Data Science — CGPA 8.95',
      company: 'USAR, GGSIPU',
      location: 'New Delhi, India',
      description: 'Undergrad in Artificial Intelligence & Data Science; learning full-stack + ML by shipping.',
      achievements: [
        'CGPA 8.95 and counting',
        'React/Next.js + FastAPI + Postgres',
        'PyTorch transformers from scratch'
      ],
      technologies: ['Python', 'React', 'PyTorch', 'PostgreSQL'],
      type: 'education',
      icon: <GraduationCap size={20} />
    },
    {
      id: 'mediconnect',
      year: '2025',
      title: 'MediConnect Platform',
      company: 'Doctor-Patient Bridging',
      location: 'India',
      description: 'Full-stack remote-care platform with CV-assisted report analysis and smooth onboarding.',
      achievements: [
        'Remote reports + updates',
        'CV-assisted analysis',
        'Streamlined registration'
      ],
      technologies: ['React', 'Next.js', 'Python', 'Computer Vision'],
      type: 'project',
      icon: <Briefcase size={20} />
    },
    {
      id: 'hindi-llm',
      year: '2025',
      title: 'Hindi Story LLM (20M) on Hugging Face',
      company: 'Team build, from scratch',
      location: 'Online',
      description: 'LLaMA-style decoder trained on Hindi stories; fixed LR bug across 6.5M/10M/20M variants.',
      achievements: [
        '20M params, public on HF',
        'Diagnosed LR misconfiguration',
        'Offline literacy tool'
      ],
      technologies: ['PyTorch', 'Transformers', 'Hugging Face'],
      type: 'project',
      icon: <Award size={20} />
    },
    {
      id: 'farm',
      year: '2025 – Present',
      title: 'Farm Livestock & MRL Platform',
      company: 'AMU/MRL Monitoring',
      location: 'India',
      description: 'Full-stack livestock monitoring with JWT roles; XGBoost risk models in planning.',
      achievements: [
        'JWT + role-based access',
        'AMU/MRL tracking design',
        'Planned AMR prediction'
      ],
      technologies: ['React', 'FastAPI', 'PostgreSQL', 'XGBoost'],
      type: 'project',
      icon: <Briefcase size={20} />
    },
    {
      id: 'agents-recommender',
      year: '2025 – Present',
      title: 'Multi-Agent App + Anime Recommender',
      company: 'AI Experiments',
      location: 'India',
      description: 'Idea-to-spec agent pipeline plus a hybrid content/collaborative anime recommender.',
      achievements: [
        'Cost-gated agent pipeline',
        'Hybrid recommender in Python',
        'Shipping + documenting'
      ],
      technologies: ['Next.js', 'FastAPI', 'Redis', 'Python'],
      type: 'project',
      icon: <Briefcase size={20} />
    },
    {
      id: 'now',
      year: 'Now',
      title: 'Open to Internships & Collabs',
      company: 'Student Builder',
      location: 'New Delhi, India',
      description: 'Looking for internships, hackathons and team builds across full-stack and ML.',
      achievements: [
        'Open to internships',
        'Loves hackathons',
        'Shares on GitHub + HF'
      ],
      technologies: ['React', 'FastAPI', 'PyTorch', 'PostgreSQL'],
      type: 'work',
      icon: <Briefcase size={20} />
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roadmapItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlay, roadmapItems.length]);

  const handleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsAutoPlay(false);
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'from-blue-500 to-cyan-500';
      case 'work':
        return 'from-purple-500 to-pink-500';
      case 'certification':
        return 'from-yellow-500 to-orange-500';
      case 'project':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="py-20 px-6 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Career <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Roadmap</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            94/90% boards → CGPA 8.95 → MediConnect, a from-scratch Hindi LLM, and more
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          className="flex justify-center items-center space-x-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={handleAutoPlay}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              isAutoPlay 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoPlay ? <Pause size={16} /> : <Play size={16} />}
            <span>{isAutoPlay ? 'Stop Tour' : 'Start Tour'}</span>
          </motion.button>

          <motion.button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </motion.button>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 rounded-full"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${getItemColor(item.type)} flex items-center justify-center border-4 border-slate-900 cursor-pointer`}
                    whileHover={{ scale: 1.2 }}
                    animate={currentIndex === index ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                    onClick={() => setCurrentIndex(index)}
                  >
                    {item.icon}
                  </motion.div>
                </div>

                {/* Content Card */}
                <motion.div
                  className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className={`bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer ${
                    currentIndex === index ? 'ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-500/20' : ''
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getItemColor(item.type)} text-white`}>
                        {item.year}
                      </span>
                      <div className="flex items-center space-x-2 text-slate-400 text-sm">
                        <MapPin size={14} />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-cyan-400 mb-3">{item.company}</p>
                    <p className="text-slate-300 mb-4">{item.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.technologies.slice(0, 4).map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-400">
                          +{item.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Key Achievement */}
                    <div className="flex items-start space-x-2">
                      <Award className="text-yellow-400 mt-1 flex-shrink-0" size={16} />
                      <span className="text-slate-400 text-sm">{item.achievements[0]}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex space-x-2">
            {roadmapItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-cyan-500' : 'bg-slate-600'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Detailed Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                      <p className="text-cyan-400 mb-1">{selectedItem.company}</p>
                      <div className="flex items-center space-x-4 text-slate-400 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{selectedItem.year}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{selectedItem.location}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-slate-300 mb-6 leading-relaxed">{selectedItem.description}</p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {selectedItem.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Award className="text-yellow-400 mt-1 flex-shrink-0" size={16} />
                            <span className="text-slate-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.technologies.map(tech => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};