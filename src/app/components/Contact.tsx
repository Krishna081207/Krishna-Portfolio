import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Send, CheckCircle, Github, Linkedin, Calendar } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      title: 'Email',
      value: 'loshalikrishna120051@gmail.com',
      action: 'mailto:loshalikrishna120051@gmail.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Linkedin size={20} />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/krishna-loshali',
      action: 'https://www.linkedin.com/in/krishna-loshali-51847a372',
      color: 'from-blue-600 to-blue-400'
    },
    {
      icon: <Github size={20} />,
      title: 'GitHub',
      value: 'github.com/krishna081207',
      action: 'https://github.com/krishna081207',
      color: 'from-gray-600 to-gray-400'
    },
    {
      icon: <MapPin size={20} />,
      title: 'Location',
      value: 'New Delhi, India',
      action: '#',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const quickConnectOptions = [
    {
      title: 'Send Email',
      action: 'mailto:loshalikrishna120051@gmail.com',
      icon: <Mail size={20} />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Connect on LinkedIn',
      action: 'https://www.linkedin.com/in/krishna-loshali-51847a372',
      icon: <Linkedin size={20} />,
      color: 'from-blue-600 to-blue-400'
    },
    {
      title: 'Call Me',
      action: 'tel:+919548606933',
      icon: <Calendar size={20} />,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
            Let's <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Internships, hackathons or a good ML discussion? My inbox is open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Current Availability */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">Current Availability</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium">Student — open to internships</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Timezone</span>
                  <span className="text-slate-400">IST (UTC+5:30)</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Response Time</span>
                  <span className="text-slate-400">Within 1–2 days</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Preferred Contact</span>
                  <span className="text-slate-400">Email or LinkedIn</span>
                </div>
              </div>
            </div>

            {/* Get In Touch */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-6">Get In Touch</h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className={`p-3 bg-gradient-to-r ${info.color} rounded-lg group-hover:scale-110 transition-transform`}>
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white mb-1">{info.title}</h4>
                      <p className="text-slate-300 text-sm group-hover:text-white transition-colors">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Connect */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-6">Quick Connect</h3>
              
              <div className="space-y-3">
                {quickConnectOptions.map((option, index) => (
                  <motion.a
                    key={index}
                    href={option.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-3 w-full p-3 bg-gradient-to-r ${option.color} rounded-lg hover:opacity-90 transition-all duration-300 text-white`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option.icon}
                    <span className="font-medium">{option.title}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Expertise Areas */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">How I Can Help</h3>
              <div className="space-y-3">
                {[
                  'Full-Stack Apps (React/Next.js/FastAPI)',
                  'ML Systems (PyTorch, Transformers, CV)',
                  'Recommenders & Data Apps',
                  'PostgreSQL + API Design',
                  'Hugging Face Model Releases',
                  'Hackathons & Team Builds'
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 text-slate-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm">{service}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full name"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What would you like to discuss?"
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project, opportunity, or question..."
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-300 mb-4">
                  Thanks for reaching out. I'll get back within 1–2 days.
                </p>
                <p className="text-sm text-slate-400">
                  Meanwhile, check my projects on GitHub or connect on LinkedIn.
                </p>
              </motion.div>
            )}

            {!isSubmitted && (
              <p className="text-slate-400 text-sm mt-4 text-center">
                I reply within 1–2 days. For anything urgent, call +91 9548606933.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};