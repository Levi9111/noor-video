import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const AtmosphereBackground: React.FC<{ mood?: string }> = ({ mood = 'romantic-soft' }) => {
  const frame = useCurrentFrame();

  // Subtle breathing pulse for the entire atmosphere
  const pulse = Math.sin(frame * 0.04) * 0.5 + 0.5;
  const slowDrift = Math.cos(frame * 0.02) * 20;

  // Background hue shifts subtly based on mood
  let baseColor1 = '#090409';
  let baseColor2 = '#150717';
  let glowColor = 'rgba(245, 158, 11, 0.12)';

  if (mood === 'passionate-flame') {
    glowColor = `rgba(244, 63, 94, ${0.16 + pulse * 0.08})`;
  } else if (mood === 'ecstatic-light') {
    glowColor = `rgba(251, 191, 36, ${0.22 + pulse * 0.1})`;
  } else {
    glowColor = `rgba(245, 158, 11, ${0.12 + pulse * 0.06})`;
  }

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `radial-gradient(ellipse at 50% ${48 + slowDrift * 0.1}%, ${baseColor2} 0%, ${baseColor1} 100%)`,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Central Ethereal Noor Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 850,
          height: 850,
          transform: `translate(-50%, -50%) scale(${0.95 + pulse * 0.12})`,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor} 0%, rgba(225, 29, 72, 0.05) 50%, rgba(0, 0, 0, 0) 75%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Cinematic Vignette */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.85) 100%)',
        }}
      />
    </div>
  );
};
