import React from 'react';
import { interpolate, staticFile, useCurrentFrame } from 'remotion';

export const LampFlame: React.FC<{ opacity?: number; scale?: number }> = ({
  opacity = 0.85,
  scale = 1.0,
}) => {
  const frame = useCurrentFrame();

  // Subtle floating levitation
  const floatY = Math.sin(frame * 0.035) * 8;
  const floatRot = Math.sin(frame * 0.02) * 1.5;

  // Natural organic flame flicker
  const flicker1 = Math.sin(frame * 0.25) * 0.08;
  const flicker2 = Math.cos(frame * 0.42) * 0.05;
  const flickerTotal = 1.0 + flicker1 + flicker2;

  return (
    <div
      style={{
        position: 'absolute',
        top: '28%',
        left: '50%',
        transform: `translate(-50%, -50%) translateY(${floatY}px) rotate(${floatRot}deg) scale(${scale})`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Dynamic Candlelight Flame Glow */}
      <div
        style={{
          position: 'absolute',
          top: -20,
          width: 220 * flickerTotal,
          height: 220 * flickerTotal,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(254, 215, 170, 0.45) 0%, rgba(249, 115, 22, 0.25) 35%, rgba(225, 29, 72, 0.1) 60%, rgba(0,0,0,0) 80%)',
          filter: 'blur(18px)',
        }}
      />

      {/* Lamp Artwork Frame */}
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: '50%',
          padding: 3,
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.8) 0%, rgba(244, 63, 94, 0.4) 100%)',
          boxShadow: `0 0 ${40 * flickerTotal}px rgba(245, 158, 11, 0.5), 0 0 ${80 * flickerTotal}px rgba(244, 63, 94, 0.3)`,
          overflow: 'hidden',
        }}
      >
        <img
          src={staticFile('cover.jpg')}
          alt="নূরের বাতি (Noor Lamp)"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
};
