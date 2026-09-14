import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Mic, MicOff, Sparkles, Brain, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  typing?: boolean;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi Navigator! I'm Krishna's AI assistant. Ask me about his studies, skills (HTML, CSS, Python, C), projects, or how to contact him.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses: { [key: string]: string } = {
    'experience': "Krishna is a B.Tech AI & Data Science student at USAR, GGSIPU (2025–2029, CGPA 8.95) who builds full-stack apps (React, Next.js, FastAPI, PostgreSQL) and ML systems (PyTorch, Transformers, CV).",
    'skills': "Languages: C, C++, Python. Web: React, Next.js, FastAPI. ML/DL: PyTorch, Transformers, Computer Vision, Collaborative Filtering. Tools: Git, Hugging Face, PostgreSQL, SQL.",
    'projects': "Flagships: MediConnect (doctor-patient platform with CV), Simple-Stories-Hindi-20M (from-scratch LLM on Hugging Face), Farm Livestock/MRL platform (FastAPI+Postgres+XGBoost plans), Multi-Agent AI web app, and a Hybrid Anime Recommender.",
    'education': "USAR GGSIPU B.Tech AI & DS (CGPA 8.95); Class 12 90.2% (Bhartiyam International, 2025); Class 10 94.2% (Aryaman Vikram Birla, 2023).",
    'career': "Student builder trajectory: boards → full-stack projects → training transformers from scratch → shipping on GitHub and Hugging Face. Now seeking internships and hackathons.",
    'contact': "Reach Krishna via the contact form, email loshalikrishna120051@gmail.com, phone +91 9548606933, LinkedIn, or GitHub @krishna081207.",
    'llm': "With a team he built a 20M-parameter LLaMA-style decoder-only transformer on Hindi stories, plus 6.5M/10M variants — fixing an LR-misconfig output bug — and published it on Hugging Face as an offline literacy tool.",
    'mediconnect': "MediConnect lets patients check reports and treatment updates remotely, uses computer vision to assist report analysis, and has a streamlined registration flow (React, Next.js, Python).",
    'recommender': "The Hybrid Anime Recommender mixes content-based and collaborative filtering in Python.",
    'farm': "The farm project monitors livestock AMU/MRL with JWT + role-based access (React, FastAPI, PostgreSQL), with planned XGBoost/AMR risk modules.",
    'resume': "Use the Resume button in the nav to download Krishna_Loshali_Resume.docx directly.",
    'hobbies': "Reading, coding, cricket, and poster/graphic design."
  };

  const quickQuestions = [
    "What are your skills?",
    "Tell me about the Hindi LLM",
    "What is MediConnect?",
    "What are you studying?",
    "How can I contact you?"
  ];

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific keywords
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Default responses based on common patterns
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('navigator')) {
      return "Hi Navigator! Ask me about Krishna's studies, skills, projects, hobbies, or how to reach him.";
    }
    
    if (lowerMessage.includes('what') || lowerMessage.includes('how')) {
      return "Great question! Krishna does full-stack (React/Next.js/FastAPI/Postgres) and ML (PyTorch transformers, CV, recommenders). Want the Hindi LLM story or the MediConnect details?";
    }
    
    if (lowerMessage.includes('hire') || lowerMessage.includes('available') || lowerMessage.includes('intern')) {
      return "Krishna is open to internships, hackathons and collaborations across full-stack and ML! Use the contact form or email loshalikrishna120051@gmail.com.";
    }
    
    return "Happy to help! Ask me about Krishna's studies, skills, projects, hobbies, or contact details.";
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = (text ?? inputValue).trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(messageText),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question: string) => {
    void handleSendMessage(question);
  };

  const toggleVoiceInput = () => {
    const SpeechRecognition =
      (window as unknown as { webkitSpeechRecognition?: new () => any; SpeechRecognition?: new () => any })
        .webkitSpeechRecognition ??
      (window as unknown as { SpeechRecognition?: new () => any }).SpeechRecognition;

    if (!SpeechRecognition) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'Voice input is not supported in this browser. Please type your question instead.',
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
      return;
    }

    if (isListening) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div className="py-20 px-6 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
              <Brain size={32} className="text-purple-400" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold">
              AI <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Assistant</span>
            </h2>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Ask me anything about Krishna's studies, skills, projects, or hobbies
          </p>
        </motion.div>

        {/* Chat Interface */}
        <motion.div
          className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Quick Questions */}
          <div className="p-6 border-b border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Sparkles className="mr-2 text-purple-400" size={20} />
              Quick Questions
            </h3>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm text-slate-300 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`flex space-x-3 max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : 'bg-slate-700/50 text-slate-100'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-slate-700/50 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-slate-700/50">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && void handleSendMessage()}
                  placeholder="Ask me anything about Krishna..."
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  onClick={toggleVoiceInput}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200 ${
                    isListening 
                      ? 'bg-red-500 text-white' 
                      : 'bg-slate-600/50 hover:bg-slate-500/50 text-slate-300'
                  }`}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
              </div>
              <motion.button
                onClick={() => void handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mt-12 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: <MessageCircle size={24} />,
              title: 'Natural Conversations',
              description: 'Ask questions in natural language about experience, skills, and projects'
            },
            {
              icon: <Mic size={24} />,
              title: 'Voice Input',
              description: 'Use voice commands to interact with the AI assistant'
            },
            {
              icon: <Sparkles size={24} />,
              title: 'Quick Questions',
              description: 'Get instant answers about certifications, tech stack, and career highlights'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-slate-800/20 backdrop-blur-sm rounded-xl border border-slate-700/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-purple-400 mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};