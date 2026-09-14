import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Tag, ArrowRight, BookOpen, TrendingUp, Zap } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  publishDate: string;
  image: string;
  featured: boolean;
}

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Training a 20M Hindi Story LLM From Scratch',
      excerpt: 'LLaMA-style decoder, 6.5M→10M→20M variants, an LR bug hunt, and publishing on Hugging Face.',
      content: `
        With a team, I built a 20M-parameter LLaMA-style decoder-only transformer on Hindi simple stories — from scratch in PyTorch — and published it on Hugging Face.

        ## What we did

        - Tokenisation + decoder-only transformer blocks
        - Trained 6.5M and 10M variants before the 20M run
        - Hit output degradation, traced it to a learning-rate misconfiguration, fixed it

        ## Why it matters

        Designed as an offline Hindi literacy and reading-practice tool — small models can still serve a real purpose.

        ## Takeaways

        - Scale gradually (6.5M → 10M → 20M) and compare
        - Log everything; LR schedules deserve suspicion first
        - Publish: HF + honest model card beats a private checkpoint
      `,
      category: 'AI / ML',
      tags: ['PyTorch', 'Transformers', 'Hugging Face', 'LLM'],
      readTime: '6 min read',
      publishDate: '2025-06-15',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
      featured: true
    },
    {
      id: '2',
      title: 'MediConnect: Remote Reports Without Hospital Visits',
      excerpt: 'React + Next.js + Python platform with CV-assisted report analysis and smooth onboarding.',
      content: `
        MediConnect bridges doctors and patients: check medical reports and treatment updates remotely instead of travelling for every follow-up.

        ## Build notes

        - React/Next.js front-end, Python-assisted analysis
        - Computer-vision techniques supporting report understanding
        - Registration flow optimised to reduce onboarding friction

        ## Lessons

        - Health UX must be calm, fast and obvious
        - Small onboarding wins compound (fewer fields, clearer states)
        - Full-stack + ML is a powerful combo for real problems
      `,
      category: 'Full Stack',
      tags: ['React', 'Next.js', 'Python', 'Computer Vision'],
      readTime: '5 min read',
      publishDate: '2025-05-10',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
      featured: true
    },
    {
      id: '3',
      title: 'Monitoring Farm AMU/MRL with FastAPI + Postgres',
      excerpt: 'JWT roles today, XGBoost AMR-risk prediction tomorrow — designing livestock compliance software.',
      content: `
        I am designing a platform to monitor Antimicrobial Usage (AMU) and Maximum Residue Limits (MRL) in livestock.

        ## Current design

        - React front-end, FastAPI + PostgreSQL backend
        - JWT authentication with role-based access control
        - Clean data models for usage and residue records

        ## Planned ML

        - AMR risk prediction with scikit-learn/XGBoost
        - Prescription anomaly detection
        - Dashboards a non-technical user can read

        Compliance software is unglamorous and genuinely useful — my favourite kind.
      `,
      category: 'Full Stack',
      tags: ['FastAPI', 'PostgreSQL', 'XGBoost', 'AMR'],
      readTime: '5 min read',
      publishDate: '2025-04-05',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
      featured: false
    },
    {
      id: '4',
      title: 'Hybrid Recommenders + Multi-Agent Specs',
      excerpt: 'Content + collaborative filtering for anime, and agents that turn rough ideas into buildable specs.',
      content: `
        Two AI experiments from opposite ends: classic recommenders and agentic workflows.

        ## Hybrid Anime Recommender (Python)

        - Content-based similarity + collaborative filtering
        - Ranked lists from pure-Python logic
        - Great fundamentals before deep models

        ## Multi-Agent Web App (Next.js + FastAPI + Redis + Postgres)

        - Agents convert rough ideas into structured product specs
        - Two-stage cost gate: free exploration, then paid human-reviewed refinement
        - Architecture thinking: queues, state, review loops

        Ship the small thing, then the ambitious thing.
      `,
      category: 'AI / ML',
      tags: ['Recommenders', 'Agents', 'Next.js', 'Redis'],
      readTime: '5 min read',
      publishDate: '2025-02-28',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop',
      featured: false
    }
  ];

  const categories = ['all', 'AI / ML', 'Full Stack'];

  const filteredPosts = blogPosts.filter(post => 
    selectedCategory === 'all' || post.category === selectedCategory
  );

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="py-20 px-6 bg-gradient-to-br from-slate-900 to-indigo-900">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl">
              <BookOpen size={32} className="text-orange-400" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Technical <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Blog</span>
            </h2>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Build notes on the Hindi LLM, MediConnect, farm-tech and recommender systems
          </p>
        </motion.div>

        {/* Featured Posts */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-3 mb-8">
            <TrendingUp className="text-orange-400" size={24} />
            <h3 className="text-2xl font-bold text-white">Featured Posts</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedPost(post)}
                whileHover={{ y: -8 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-orange-500/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-orange-400 text-sm font-medium">{post.category}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-300 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-orange-400 group-hover:text-orange-300 transition-colors">
                    <span className="text-sm font-medium">Read More</span>
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Tag className="text-slate-400 mr-2" size={20} />
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {category === 'all' ? 'All Posts' : category}
            </button>
          ))}
        </motion.div>

        {/* All Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group bg-slate-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedPost(post)}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                {post.featured && (
                  <div className="absolute top-2 right-2 bg-orange-500/20 backdrop-blur-sm p-1 rounded-full">
                    <Zap className="text-orange-400" size={16} />
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="text-orange-400 text-sm font-medium mb-2">{post.category}</div>
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-slate-300 mb-4 line-clamp-3 text-sm">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-orange-400 group-hover:text-orange-300 transition-colors">
                  <span className="text-sm font-medium">Read More</span>
                  <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Blog Post Modal */}
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="text-orange-400 text-sm font-medium mb-2">{selectedPost.category}</div>
                    <h1 className="text-3xl font-bold text-white mb-4">{selectedPost.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>{new Date(selectedPost.publishDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{selectedPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                
                <div className="prose prose-invert max-w-none">
                  <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {selectedPost.content}
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-700">
                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};