import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { Mentor, ChatMessage } from '../types';

interface MentorChatProps {
  mentor: Mentor;
  onClose: () => void;
}

const MentorChat: React.FC<MentorChatProps> = ({ mentor, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting from the mentor
    setMessages([
      {
        id: 'init-1',
        role: 'model',
        text: `Hi there! I'm ${mentor.name}. Thanks for reaching out. How can I help you with your tech journey today?`,
        timestamp: new Date(),
      }
    ]);
  }, [mentor]);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simulate mentor reply
    setTimeout(() => {
        const reply: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: "Thanks for your message! I'm currently checking some code, but I'll get back to you with a detailed answer soon. Feel free to leave more details about your challenge.",
            timestamp: new Date()
        };
        setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-dark-800 border border-dark-700 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-dark-700 flex justify-between items-center bg-dark-900">
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <img src={mentor.avatarUrl} alt={mentor.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-dark-700" />
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-dark-900 ${mentor.available ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                </div>
                <div>
                    <h3 className="font-bold text-white leading-tight">{mentor.name}</h3>
                    <p className="text-xs text-primary-400">{mentor.role} @ {mentor.company}</p>
                </div>
            </div>
            <button 
                onClick={onClose} 
                className="p-2 text-slate-400 hover:text-white hover:bg-dark-700 rounded-full transition-colors"
                aria-label="Close chat"
            >
                <X size={20} />
            </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-800/50" ref={scrollRef}>
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                            ? 'bg-primary-600 text-white rounded-br-none' 
                            : 'bg-dark-700 text-slate-200 rounded-bl-none border border-dark-600'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-dark-700 bg-dark-900">
            <div className="flex items-center space-x-2 bg-dark-800 rounded-full px-4 py-2 border border-dark-700 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all">
                <input 
                    type="text" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder={`Message ${mentor.name}...`}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 text-sm"
                    autoFocus
                />
                <button 
                    onClick={handleSend} 
                    disabled={!input.trim()}
                    className={`p-2 rounded-full transition-colors ${
                        input.trim() 
                        ? 'text-primary-400 hover:text-white hover:bg-primary-600' 
                        : 'text-dark-600 cursor-not-allowed'
                    }`}
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MentorChat;
