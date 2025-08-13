import React, { useEffect, useRef } from 'react';
import { Message } from '../types';
import { User, Bot, Link } from 'lucide-react';

interface ChatLogProps {
  messages: Message[];
  isResponding: boolean;
}

export const ChatLog: React.FC<ChatLogProps> = ({ messages, isResponding }) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const renderMessage = (msg: Message, index: number) => {
    const isUser = msg.role === 'user';
    const isLastMessage = index === messages.length - 1;

    return (
      <div
        key={index}
        className={`flex items-start gap-3 sm:gap-4 p-4 my-3 rounded-lg max-w-2xl transition-all duration-300 animate-fade-in ${
          isUser
            ? 'ml-auto bg-gray-800/60'
            : 'mr-auto bg-gradient-to-br from-jarvis-dark-blue/60 to-jarvis-gray/40'
        }`}
      >
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? 'bg-gray-600' : 'bg-jarvis-blue'
          }`}
        >
          {isUser ? <User size={18} /> : <Bot size={18} className="text-jarvis-bg" />}
        </div>
        <div className="flex-grow pt-1 text-gray-200">
          <p className="whitespace-pre-wrap text-base sm:text-lg leading-relaxed">
            {msg.text}
            {isLastMessage && isResponding && !msg.text && (
                <span className="inline-block w-2 h-5 ml-1 bg-jarvis-blue animate-pulse" />
            )}
          </p>
          {msg.sources && msg.sources.length > 0 && (
            <div className="mt-4 border-t border-jarvis-blue/20 pt-3">
              <h4 className="text-xs text-jarvis-blue/80 font-bold mb-2 uppercase tracking-wider">Fontes</h4>
              <ul className="space-y-1.5">
                {msg.sources.map((source, i) =>
                  source.web?.uri ? (
                    <li key={i} className="text-xs group">
                      <a
                        href={source.web.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-jarvis-blue transition-colors flex items-center gap-2"
                        title={source.web.uri}
                      >
                        <Link size={12} className="flex-shrink-0" />
                        <span className="truncate group-hover:underline">{source.web.title || source.web.uri}</span>
                      </a>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="space-y-2 sm:space-y-4 p-2 sm:p-4">
      {messages.map(renderMessage)}
      <div ref={endOfMessagesRef} />
    </div>
  );
};