import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Mic, Send, Sparkles, MessageSquare, Zap, Shield, ArrowRight, Menu, X } from 'lucide-react';
import './App.css';

// Landing Page Component
const LandingPage = ({ onEnterChat }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Get instant responses powered by advanced AI technology"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your conversations are encrypted and protected"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Natural Conversation",
      description: "Speak naturally with voice input and audio responses"
    }
  ];

  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>

      {/* Navigation */}
      <nav className="nav-bar">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="nav-logo"
        >
          <Sparkles className="w-8 h-8" style={{ color: '#c084fc' }} />
          <span className="nav-logo-text">Sanjay's Bot</span>
        </motion.div>

        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="nav-menu"
        >
          <a href="#features" className="nav-link">Features</a>
          <a href="#about" className="nav-link">About</a>
          <button onClick={onEnterChat} className="nav-button">
            Get Started
          </button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            <span className="hero-gradient-text">AI-Powered</span>
            <br />
            Conversations
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-subtitle"
        >
          Experience the future of communication with voice-enabled AI that understands you naturally
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={onEnterChat}
          className="hero-cta"
        >
          Start Voice Chat
          <ArrowRight className="w-6 h-6" />
        </motion.button>

        {/* Chat Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="chat-preview"
        >
          <div className="preview-window">
            <div className="window-controls">
              <div className="window-control control-red"></div>
              <div className="window-control control-yellow"></div>
              <div className="window-control control-green"></div>
            </div>
            <div className="preview-messages">
              <div className="preview-message">
                <div className="preview-avatar avatar-bot">
                  <Bot size={20} />
                </div>
                <div className="preview-bubble bubble-bot">
                  <p style={{ fontSize: '0.875rem' }}>Hello! I'm your AI assistant. How can I help you today?</p>
                </div>
              </div>
              <div className="preview-message user">
                <div className="preview-avatar avatar-user">
                  <User size={20} />
                </div>
                <div className="preview-bubble bubble-user">
                  <p style={{ fontSize: '0.875rem' }}>Tell me about quantum computing</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <div id="features" className="features-section">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="features-title"
          >
            Why Choose Sanjay Bot?
          </motion.h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="feature-card"
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat Interface Component
const ChatInterface = ({ onBackToHome }) => {
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [inputText, setInputText] = useState('');
  const recognitionRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.lang = 'en-US';
      recognitionInstance.interimResults = false;
      recognitionInstance.maxAlternatives = 1;
      
      recognitionInstance.onstart = () => setIsListening(true);
      recognitionInstance.onend = () => setIsListening(false);
      recognitionInstance.onerror = (event) => console.error("Speech recognition error:", event.error);
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        sendQuery(transcript);
      };

      recognitionRef.current = recognitionInstance;
    }
  }, []);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const sendQuery = async (query) => {
    if (!query.trim()) return;
    setConversation(prev => [...prev, { sender: 'user', text: query }]);
    setInputText('');
    setIsThinking(true);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, { query });
      const botResponse = res.data.response;
      setConversation(prev => [...prev, { sender: 'bot', text: botResponse }]);
      speak(botResponse);
    } catch (error) {
      const errorMsg = "Sorry, an error occurred. Please try again.";
      setConversation(prev => [...prev, { sender: 'bot', text: errorMsg }]);
      speak(errorMsg);
    } finally {
      setIsThinking(false);
    }
  };

  const handleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      sendQuery(inputText);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };


  const suggestedPrompts = [
  "What's your #1 superpower?",
  "What should we know about your life story in a few sentences?",
  "What are the top 3 areas you'd like to grow in?",
  "What misconception do your coworkers have about you?",
  "How do you push your boundaries and limits?",
  "Tell me about your experience with AI and GenAI",
  "What projects are you most proud of?",
  "What's your technical background?",
  "How did you get into full-stack development?",
  "What AI technologies do you work with?",
  
  "Tell me a joke",
  "What's the difference between React and Vue?",
  "Explain LangChain in simple terms",
  "How does RAG architecture work?",
  "Explain vector databases",
  "What are the benefits of using Socket.io?",
  "How does Redux Toolkit improve state management?"
];


  return (
    <div className="chat-interface">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-content">
          <div className="chat-title">
            <div className="status-dot"></div>
            <Sparkles className="w-6 h-6" style={{ color: '#c084fc' }} />
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'Black' }}>Sanjay Bot</h1>
          </div>
          <button onClick={onBackToHome} className="back-button">
            Back to Home
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-content">
        <div className="chat-messages">
          {conversation.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="welcome-screen"
            >
              <div className="welcome-avatar">
                <Bot size={40} style={{ color: 'white' }} />
              </div>
              <h2 className="welcome-title">Start a Conversation</h2>
              <p className="welcome-subtitle">Use voice input or try one of these prompts</p>
              <div className="prompts-grid">
                {suggestedPrompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => sendQuery(prompt)}
                    className="prompt-button"
                  >
                    {prompt}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <AnimatePresence>
              {conversation.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`message-row ${msg.sender === 'user' ? 'user' : ''}`}
                >
                  <div className={`message-avatar ${msg.sender === 'bot' ? 'avatar-bot' : 'avatar-user'}`}>
                    {msg.sender === 'bot' ? <Bot size={20} style={{ color: 'white' }} /> : <User size={20} style={{ color: 'white' }} />}
                  </div>
                  <div className={`message-bubble ${msg.sender}`}>
                    <p>{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="message-row"
            >
              <div className="message-avatar avatar-bot">
                <Bot size={20} style={{ color: 'white' }} />
              </div>
              <div className="message-bubble bot">
                <div className="thinking-indicator">
                  <div className="thinking-dot"></div>
                  <div className="thinking-dot"></div>
                  <div className="thinking-dot"></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={scrollRef}></div>
        </div>
      </div>

      {/* Input Area */}
      <div className="input-container">
        <div className="input-wrapper">
          <button
            onClick={handleListen}
            disabled={isThinking}
            className={`mic-button ${isListening ? 'listening' : ''}`}
          >
            <Mic size={20} />
          </button>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message or use voice input..."
            disabled={isThinking}
            className="message-input"
          />
          
          <button
            onClick={handleSendMessage}
            disabled={isThinking || !inputText.trim()}
            className="send-button"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <AnimatePresence mode="wait">
      {currentPage === 'landing' ? (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage onEnterChat={() => setCurrentPage('chat')} />
        </motion.div>
      ) : (
        <motion.div
          key="chat"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ChatInterface onBackToHome={() => setCurrentPage('landing')} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;