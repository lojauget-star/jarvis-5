import React from 'react';
import { JarvisStatus } from '../types';

interface JarvisOrbProps {
  status: JarvisStatus;
  onClick: () => void;
}

export const JarvisOrb: React.FC<JarvisOrbProps> = ({ status, onClick }) => {
  const getStatusClasses = () => {
    switch (status) {
      case JarvisStatus.LISTENING:
        return 'scale-110 shadow-glow-blue';
      case JarvisStatus.THINKING:
        return 'animate-pulse scale-105 shadow-glow-blue';
      case JarvisStatus.SPEAKING:
         return 'scale-105 shadow-glow-blue animate-speaking';
      case JarvisStatus.IDLE:
      default:
        return 'scale-100 shadow-glow-blue-light opacity-80';
    }
  };

  return (
    <div
      className="relative w-36 h-36 md:w-40 md:h-40 cursor-pointer group"
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 rounded-full bg-jarvis-blue transition-all duration-500 ease-in-out ${getStatusClasses()}`}
        style={{
          background: `radial-gradient(circle, rgba(0,242,255,0.8) 0%, rgba(12,58,94,0.6) 60%, transparent 100%)`,
        }}
      ></div>
      <svg
        className="absolute inset-0 w-full h-full animate-spin"
        style={{ animationDuration: '20s' }}
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgba(0, 242, 255, 0.2)"
          strokeWidth="1"
          strokeDasharray="10 5"
        />
      </svg>
      <svg
        className="absolute inset-0 w-full h-full animate-spin"
        style={{ animationDuration: '30s', animationDirection: 'reverse' }}
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="rgba(0, 242, 255, 0.3)"
          strokeWidth="0.5"
        />
      </svg>
       <svg
        className="absolute inset-0 w-full h-full animate-spin"
        style={{ animationDuration: '45s' }}
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="none"
          stroke="rgba(0, 242, 255, 0.15)"
          strokeWidth="0.75"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/2 h-1/2 rounded-full bg-jarvis-dark-blue/50 border border-jarvis-blue/30 backdrop-blur-sm"></div>
      </div>
    </div>
  );
};
