import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const MentorBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm your AI Mentor. Stuck on a bug or need a project idea? I'm here to help!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const botMsgId = (Date.now() + 1).toString();
    const botMsgPlaceholder: ChatMessage = {
        id: botMsgId,
        role: 'model',
        text: '',
        timestamp: new Date(),
        isThinking: true
    };
    
    setMessages(prev => [...prev, botMsgPlaceholder]);

    try {
      await sendMessageToGemini(userMsg.text, (partialText) => {
        setMessages((prev) => 
          prev.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, text: partialText, isThinking: false } 
              : msg
          )
        );
      });
    } catch (error) {
      setMessages((prev) => 
        prev.map(msg => 
            msg.id === botMsgId 
              ? { ...msg, text: "Sorry, I encountered an error. Try again.", isThinking: false } 
              : msg
          )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-500 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 z-50 flex items-center justify-center group"
      >
        <Bot size={32} />
        <span className="absolute right-full mr-3 bg-white text-dark-900 px-3 py-1 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ask AI Mentor
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-dark-800 border border-dark-700 shadow-2xl rounded-2xl flex flex-col z-50 transition-all duration-300 ${isExpanded ? 'w-[90vw] h-[80vh] md:w-[800px]' : 'w-[90vw] h-[600px] md:w-[400px]'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-primary-600 rounded-t-2xl">
        <div className="flex items-center space-x-2">
          <Bot className="text-white" />
          <h3 className="text-white font-bold">AI Mentor</h3>
        </div>
        <div className="flex space-x-2">
           <button onClick={() => setIsExpanded(!isExpanded)} className="text-white hover:text-gray-200">
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button onClick={toggleChat} className="text-white hover:text-gray-200">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-dark-900/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white rounded-br-none'
                  : 'bg-dark-700 text-gray-100 rounded-bl-none border border-dark-600'
              }`}
            >
               {msg.isThinking && !msg.text ? (
                 <div className="flex space-x-1 items-center h-5">
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                 </div>
               ) : (
                <div className="whitespace-pre-wrap">{msg.text}</div>
               )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-dark-700 bg-dark-800 rounded-b-2xl">
        <div className="flex items-center bg-dark-900 rounded-full px-4 py-2 border border-dark-600 focus-within:border-primary-500 transition-colors">
            <Sparkles size={16} className="text-primary-400 mr-2" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a coding question..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 outline-none text-sm"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className={`p-2 rounded-full transition-colors ${
              isLoading || !input.trim()
                ? 'text-gray-600 cursor-not-allowed'
                : 'text-primary-400 hover:text-white hover:bg-primary-600'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorBot;