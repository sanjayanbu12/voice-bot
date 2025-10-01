import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import MicIcon from './MicIcon'; // <-- 1. Import the new component

function App() {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState('Click the button and start speaking.');
  const [conversation, setConversation] = useState([]);
  const statusRef = useRef(status);

  // ... (the rest of your functions like speak, handleListen, sendQuery remain the same)
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setStatus('Click the button and start speaking.');
    };
    window.speechSynthesis.speak(utterance);
  };

  const handleListen = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  const sendQuery = async (query) => {
    setStatus('Thinking...');
    try {
      setConversation(prev => [...prev, { sender: 'user', text: query }]);
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, { query });
      const botResponse = res.data.response;
      setConversation(prev => [...prev, { sender: 'bot', text: botResponse }]);
      speak(botResponse);
    } catch (error) {
      console.error("API Error:", error);
      const errorMsg = "Sorry, I couldn't connect to my brain. Please try again.";
      setStatus(errorMsg);
      setConversation(prev => [...prev, { sender: 'bot', text: errorMsg }]);
      speak(errorMsg);
    }
  };
  
  // This useEffect block also remains the same
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setStatus('Listening...');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendQuery(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setStatus('Sorry, I did not catch that. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
      if (statusRef.current === 'Listening...') {
        setStatus('Click the button and start speaking.');
      }
    };
    
    // Make recognition available to handleListen
    window.recognition = recognition;

    return () => { window.recognition.abort(); };
  }, []);
  
  useEffect(() => { statusRef.current = status; }, [status]);

  return (
    <div className="app-container">
      <h1>Gemini Voice Bot</h1>
      <p>Ask me about my "life", my "superpowers", or how I "push my limits".</p>
      
      <div className="status-box">{status}</div>

      <button onClick={handleListen} className={`mic-button ${isListening ? 'is-listening' : ''}`}>
        {/* ▼ 2. Replace the <img> tag with the MicIcon component ▼ */}
        <MicIcon className="mic-icon" />
      </button>

      <div className="conversation-box">
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}-message`}>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;