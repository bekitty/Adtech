import React, { useState } from 'react';
import { Send, Smile, Users, Settings } from 'lucide-react';
import { MOCK_CHAT_MESSAGES } from '../constants/mockData';
import { ChatMessage } from '../types';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
      message: inputValue,
      timestamp: Date.now(),
      color: '#7c3aed',
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-jaco-card rounded-xl border border-jaco-muted">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-jaco-muted">
        <h3 className="font-semibold text-white">Stream Chat</h3>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-jaco-hover rounded-lg transition-colors">
            <Users className="w-4 h-4 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-jaco-hover rounded-lg transition-colors">
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-jaco-hover scrollbar-track-transparent">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-2 animate-fadeIn">
            <img
              src={msg.avatar}
              alt={msg.username}
              className="w-6 h-6 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Badges */}
                {msg.badges?.map((badge) => (
                  <span
                    key={badge}
                    className={`px-1 py-0.5 text-[10px] font-bold rounded ${
                      badge === 'moderator'
                        ? 'bg-green-500 text-white'
                        : badge === 'vip'
                        ? 'bg-jaco-pink text-white'
                        : badge === 'subscriber'
                        ? 'bg-jaco-primary text-white'
                        : 'bg-jaco-accent text-jaco-dark'
                    }`}
                  >
                    {badge.toUpperCase()}
                  </span>
                ))}
                <span
                  className="font-semibold text-sm"
                  style={{ color: msg.color || '#fff' }}
                >
                  {msg.username}
                </span>
              </div>
              <p className="text-sm text-gray-300 break-words">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-jaco-muted">
        {/* Points Display */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Channel Points: 1,250</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Send a message..."
              className="w-full px-4 py-2.5 bg-jaco-dark border border-jaco-muted rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-jaco-primary/50 transition-colors"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-jaco-accent transition-colors">
              <Smile className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-2.5 bg-jaco-primary hover:bg-jaco-primary/90 disabled:bg-jaco-muted disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
