import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Code, Database, Cloud, Settings, Globe } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  description: string;
  experience: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  color: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  status: 'active' | 'expired';
}

export const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const skillCategories: SkillCategory[] = [
    {
      title: 'Languages',
      icon: <Code size={24} />,
      color: 'from-purple-500 to-pink-500',
      skills: [
        {
          name: 'Python',
          level: 85,
          icon: <Code size={20} />,
          description: 'Full-stack backends, ML systems, recommenders, CLI tools',
          experience: 'Daily driver'
        },
        {
          name: 'C / C++',
          level: 75,
          icon: <Code size={20} />,
          description: 'Strong foundations from coursework and problem solving',
          experience: 'Coursework'
        },
        {
          name: 'SQL',
          level: 70,
          icon: <Database size={20} />,
          description: 'PostgreSQL schemas, queries and app integration',
          experience: 'Projects'
        }
      ]
    },
    {
      title: 'Web / Full-Stack',
      icon: <Code size={24} />,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        {
          name: 'React / Next.js',
          level: 80,
          icon: <Code size={20} />,
          description: 'MediConnect, farm dashboard, multi-agent front-ends',
          experience: 'Projects'
        },
        {
          name: 'FastAPI',
          level: 80,
          icon: <Globe size={20} />,
          description: 'APIs with auth (JWT + roles) for full-stack apps',
          experience: 'Projects'
        },
        {
          name: 'PostgreSQL',
          level: 70,
          icon: <Database size={20} />,
          description: 'App databases, roles and data modelling',
          experience: 'Projects'
        },
        {
          name: 'Git & GitHub',
          level: 80,
          icon: <Code size={20} />,
          description: 'Version control, collaboration, Pages + Hugging Face ships',
          experience: 'Daily'
        }
      ]
    },
    {
      title: 'ML / DL',
      icon: <Cloud size={24} />,
      color: 'from-green-500 to-emerald-500',
      skills: [
        {
          name: 'PyTorch',
          level: 80,
          icon: <Settings size={20} />,
          description: 'Trained 6.5M/10M/20M transformers from scratch',
          experience: 'Projects'
        },
        {
          name: 'Transformers / LLM',
          level: 75,
          icon: <Settings size={20} />,
          description: 'LLaMA-style decoder, tokenisation, training + eval',
          experience: 'Hindi LLM'
        },
        {
          name: 'Computer Vision',
          level: 70,
          icon: <Settings size={20} />,
          description: 'AI-assisted analysis of patient reports (MediConnect)',
          experience: 'Projects'
        },
        {
          name: 'Recommenders / XGBoost',
          level: 65,
          icon: <Database size={20} />,
          description: 'Hybrid anime recommender; planned AMR risk models',
          experience: 'Projects'
        }
      ]
    },
    {
      title: 'Tools & Study',
      icon: <Database size={24} />,
      color: 'from-orange-500 to-red-500',
      skills: [
        {
          name: 'Hugging Face',
          level: 75,
          icon: <Database size={20} />,
          description: 'Published Hindi story LLM publicly',
          experience: 'Shipped'
        },
        {
          name: 'Redis / Docker',
          level: 60,
          icon: <Database size={20} />,
          description: 'Multi-agent pipeline infra; container basics',
          experience: 'Learning'
        },
        {
          name: 'Posters, Blogs & Notes',
          level: 75,
          icon: <Database size={20} />,
          description: 'Design + writing corner that keeps learning consistent',
          experience: 'Hobby'
        }
      ]
    }
  ];

  const certifications: Certification[] = [
    {
      name: 'B.Tech — AI & Data Science, CGPA 8.95',
      issuer: 'USAR, GGSIPU (2025 – 2029)',
      date: 'In progress',
      credentialId: 'Coursework',
      status: 'active'
    },
    {
      name: 'Class 12 — 90.2%',
      issuer: 'Bhartiyam International School (2025)',
      date: '2025',
      credentialId: 'Boards',
      status: 'active'
    },
    {
      name: 'Class 10 — 94.2%',
      issuer: 'Aryaman Vikram Birla Institute of Learning (2023)',
      date: '2023',
      credentialId: 'Boards',
      status: 'active'
    },
    {
      name: 'Hindi LLM on Hugging Face',
      issuer: 'Published model + training variants',
      date: '2025',
      credentialId: 'Live',
      status: 'active'
    }
  ];

  const architecturePatterns = [
    'React + FastAPI Full-Stack',
    'JWT + Role-Based Access',
    'PostgreSQL Modelling',
    'Decoder-Only Transformers',
    'Training & Eval Loops',
    'Computer Vision Pipelines',
    'Content + Collaborative Filtering',
    'XGBoost Risk Models',
    'Redis-Backed Pipelines',
    'Hugging Face Publishing'
  ];

  return (
    <div className="py-20 px-6 bg-gradient-to-br from-slate-900 to-slate-800">
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
            Technical <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            C/C++/Python, React/Next.js/FastAPI, PyTorch/Transformers — backed by a CGPA 8.95
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Skills Section */}
          <div className="lg:col-span-2">
            {/* Category Tabs */}
            <motion.div
              className="flex flex-wrap gap-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {skillCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(index)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                    selectedCategory === index
                      ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-lg'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
                  }`}
                >
                  {category.icon}
                  <span className="font-medium">{category.title}</span>
                </button>
              ))}
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              className="space-y-6"
              key={selectedCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {skillCategories[selectedCategory].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{skill.name}</h3>
                        <p className="text-sm text-slate-400">{skill.experience}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-semibold">{skill.level}%</div>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 mb-4">{skill.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skillCategories[selectedCategory].color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Certifications Section */}
            <motion.div
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
                  <Award size={24} className="text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Learning Milestones</h3>
              </div>
              <p className="text-slate-400 mb-6 text-sm">Coursework and projects so far — more to come</p>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.name}
                    className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h4 className="font-medium text-white text-sm mb-1">{cert.name}</h4>
                    <p className="text-slate-400 text-xs mb-2">{cert.issuer}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 text-xs">{cert.date}</span>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs ${
                        cert.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {cert.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Architecture Patterns */}
            <motion.div
              className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Practices & Interests</h4>
              <div className="space-y-3">
                {architecturePatterns.map((pattern, index) => (
                  <motion.div
                    key={pattern}
                    className="flex items-center space-x-3 text-slate-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm">{pattern}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Achievement Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { number: '8.95', label: 'CGPA @ USAR, GGSIPU', icon: <Award size={24} /> },
            { number: '5', label: 'Major Projects', icon: <Code size={24} /> },
            { number: '20M', label: 'Param LLM on Hugging Face', icon: <Cloud size={24} /> },
            { number: '90%+', label: 'Class 10 & 12 Boards', icon: <Settings size={24} /> }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-cyan-400 mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};