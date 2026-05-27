import React from 'react';

export default function BackgroundParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(30)].map((_, i) => {
        const size = Math.random() * 3 + 1;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * -20;

        return (
          <div
            key={i}
            className="absolute rounded-full bg-amber-400 opacity-40 animate-pulse"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              left: `${left}%`,
              boxShadow: '0 0 8px #D4AF37',
              animation: `pulse ${duration}s infinite ease-in-out alternate`,
              animationDelay: `${delay}s`
            }}
          />
        );
      })}
    </div>
  );
}