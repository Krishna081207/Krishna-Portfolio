import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Award, Filter, Search, Star } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  metrics: {
    users?: string;
    performance?: string;
    uptime?: string;
    requests?: string;
    latency?: string;
    availability?: string;
    environments?: string;
    deployment?: string;
    costSaving?: string;
    services?: string;
    throughput?: string;
    response?: string;
  };
  achievements: string[];
  timeline: string;
  status: 'completed' | 'in-progress' | 'archived';
  featured: boolean;
}

export const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 'mediconnect',
      title: 'MediConnect — Doctor-Patient Platform',
      description: 'Full-stack platform for remote medical reports and treatment updates, reducing in-person hospital visits.',
      longDescription: 'Built a full-stack platform enabling patients to check medical reports and receive treatment updates remotely. Applied computer-vision techniques to assist AI-driven analysis of patient reports, with a fast streamlined registration flow to cut onboarding friction.',
      technologies: ['React', 'Next.js', 'Python', 'Computer Vision'],
      category: 'Full Stack',
      githubUrl: 'https://github.com/krishna081207',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
      metrics: {
        users: 'Patients',
        performance: 'Remote',
        uptime: 'Reports'
      },
      achievements: [
        'Remote reports + treatment updates',
        'CV-assisted report analysis',
        'Frictionless registration flow',
        'Full-stack React/Next.js + Python'
      ],
      timeline: '2025 - Present',
      status: 'in-progress',
      featured: true
    },
    {
      id: 'hindi-llm',
      title: 'Simple-Stories-Hindi-20M — From-Scratch LLM',
      description: '20M-parameter LLaMA-style decoder-only transformer trained on Hindi stories, published on Hugging Face.',
      longDescription: 'Built a 20M-parameter LLaMA-style decoder-only transformer from scratch with a team, trained on Hindi simple stories and published publicly on Hugging Face. Trained and evaluated 6.5M/10M variants, diagnosing output degradation traced to a learning-rate misconfiguration. Designed as an offline Hindi literacy tool.',
      technologies: ['PyTorch', 'Transformers', 'Hugging Face', 'Python'],
      category: 'AI / ML',
      githubUrl: 'https://github.com/krishna081207',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      metrics: {
        requests: '20M params',
        latency: 'Offline',
        availability: 'Open'
      },
      achievements: [
        'Transformer built from scratch',
        'Published on Hugging Face',
        'Fixed LR-misconfig degradation',
        'Offline Hindi literacy tool'
      ],
      timeline: '2025',
      status: 'completed',
      featured: true
    },
    {
      id: 'farm-mrl',
      title: 'Digital Farm Livestock & MRL Management',
      description: 'Full-stack AMU/MRL monitoring for livestock with JWT auth, roles, and planned XGBoost risk models.',
      longDescription: 'Designing a full-stack platform for monitoring Antimicrobial Usage (AMU) and Maximum Residue Limits (MRL) in livestock, with JWT + role-based access control. Planning ML modules for AMR risk prediction and prescription anomaly detection with scikit-learn/XGBoost.',
      technologies: ['React', 'FastAPI', 'PostgreSQL', 'XGBoost'],
      category: 'Full Stack',
      githubUrl: 'https://github.com/krishna081207',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
      metrics: {
        environments: 'Farm',
        deployment: 'Roles',
        costSaving: 'JWT'
      },
      achievements: [
        'AMU/MRL livestock monitoring',
        'JWT + role-based access',
        'Planned AMR risk prediction',
        'React + FastAPI + Postgres'
      ],
      timeline: '2025 - Present',
      status: 'in-progress',
      featured: false
    },
    {
      id: 'multi-agent',
      title: 'Multi-Agent AI Web App',
      description: 'Multi-agent system turning rough ideas into structured, buildable product specs with cost-gated pipeline.',
      longDescription: 'Architecting a multi-agent system that converts rough ideas into structured, buildable product specs. Designed a two-stage cost-gated pipeline: free-tier exploration followed by paid, human-reviewed refinement.',
      technologies: ['Next.js', 'FastAPI', 'Redis', 'Postgres'],
      category: 'AI / ML',
      githubUrl: 'https://github.com/krishna081207',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop',
      metrics: {
        services: 'Agents',
        throughput: 'Specs',
        response: 'Gated'
      },
      achievements: [
        'Idea-to-spec agent pipeline',
        'Free-tier + paid refinement',
        'Human-reviewed outputs',
        'Next.js + FastAPI + Redis'
      ],
      timeline: '2025 - Present',
      status: 'in-progress',
      featured: false
    },
    {
      id: 'anime-recommender',
      title: 'Hybrid Anime Recommender',
      description: 'Recommendation engine combining content-based and collaborative filtering in Python.',
      longDescription: 'Built a recommendation engine combining content-based and collaborative filtering approaches — a hands-on dive into classic recommender techniques in Python.',
      technologies: ['Python', 'Collaborative Filtering', 'Content-Based'],
      category: 'AI / ML',
      githubUrl: 'https://github.com/krishna081207',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=400&fit=crop',
      metrics: {
        services: 'Hybrid',
        throughput: 'Python',
        response: 'Ranked'
      },
      achievements: [
        'Content + collaborative hybrid',
        'Similarity + ranking logic',
        'Pure-Python implementation',
        'Recommender fundamentals'
      ],
      timeline: '2024 - 2025',
      status: 'completed',
      featured: false
    }
  ];

  const categories = ['all', 'Full Stack', 'AI / ML'];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedFilter === 'all' || project.category === selectedFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="py-20 px-6 bg-slate-900/50">
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
            Featured <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Full-stack platforms and ML systems — from MediConnect to a from-scratch Hindi LLM
          </p>
        </motion.div>

        {/* Featured Projects Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative bg-slate-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -8 }}
              >
                {/* Featured Badge */}
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-500/30">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400" size={14} />
                    <span className="text-yellow-400 text-sm font-medium">Featured</span>
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-sm text-slate-400">{project.timeline}</span>
                  </div>
                  
                  <p className="text-slate-300 mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-400">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-cyan-400 font-semibold">{value}</div>
                        <div className="text-xs text-slate-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-3">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={16} />
                        <span className="text-sm">Code</span>
                      </motion.a>
                    )}
                    
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">Live Demo</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="text-slate-400 mr-2" size={20} />
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                  selectedFilter === category
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                {category === 'all' ? 'All Projects' : category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative bg-slate-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {project.status.replace('-', ' ')}
                  </div>

                  {project.featured && (
                    <div className="absolute top-3 left-3 bg-yellow-500/20 backdrop-blur-sm p-1 rounded-full">
                      <Star className="text-yellow-400" size={16} />
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-300 mb-4 line-clamp-2 text-sm">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map(tech => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-400">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-cyan-400 text-sm font-semibold">{value}</div>
                        <div className="text-xs text-slate-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub Link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://github.com/krishna081207"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            <span>View All Projects on GitHub</span>
            <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                      <p className="text-slate-400">{selectedProject.timeline}</p>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  
                  <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map(tech => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-slate-700 rounded-full text-sm text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-4">Key Achievements</h4>
                      <ul className="space-y-2">
                        {selectedProject.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Award className="text-cyan-400 mt-1 flex-shrink-0" size={16} />
                            <span className="text-slate-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Project Metrics */}
                  <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-4 bg-slate-700/30 rounded-lg">
                        <div className="text-cyan-400 text-lg font-semibold">{value}</div>
                        <div className="text-slate-400 text-sm capitalize">{key}</div>
                      </div>
                    ))}
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