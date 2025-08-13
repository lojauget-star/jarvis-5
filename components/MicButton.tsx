import React from 'react';
import { Mic, Square } from 'lucide-react';
import { JarvisStatus } from '../types';

interface MicButtonProps {
  jarvisStatus: JarvisStatus;
  onClick: () => void;
  disabled: boolean;
}

export const MicButton: React.FC<MicButtonProps> = ({ jarvisStatus, onClick, disabled }) => {
  const isListening = jarvisStatus === JarvisStatus.LISTENING;
  const isProcessing = jarvisStatus === JarvisStatus.THINKING || jarvisStatus === JarvisStatus.SPEAKING;

  const getIcon = () => {
    if (isProcessing) return <Square size={20} className="text-red-400" fill="currentColor" />;
    if (isListening) return <Mic size={24} className="text-red-500" />;
    return <Mic size={24} />;
  };

  const getLabel = () => {
    if (disabled) return "Carregando...";
    if (isProcessing) return "Interromper";
    if (isListening) return "Ouvindo...";
    return "Ativar Jarvis";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 flex items-center justify-center gap-3
        rounded-full border transition-all duration-300
        ${isProcessing 
          ? 'text-gray-200 border-red-500/80 bg-jarvis-dark-blue/30 hover:bg-jarvis-dark-blue/80 hover:border-red-400' 
          : 'text-jarvis-blue border-jarvis-blue/50 bg-jarvis-dark-blue/30 hover:bg-jarvis-dark-blue/80 hover:border-jarvis-blue'
        }
        disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-jarvis-gray
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-jarvis-bg focus:ring-jarvis-blue
        shadow-lg backdrop-blur-sm
      `}
    >
      {getIcon()}
      <span className="font-bold text-sm sm:text-base">{getLabel()}</span>
    </button>
  );
};