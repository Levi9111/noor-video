import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';

interface Particle {
  x: number;
  startY: number;
  speed: number;
  size: number;
  swaySpeed: number;
  swayAmp: number;
  hue: number;
  opacity: number;
}

interface Bokeh {
  x: number;
  startY: number;
  speed: number;
  radius: number;
  color: string;
  opacity: number;
}

export const ParticleField: React.FC<{ count?: number }> = ({ count = 50 }) => {
  const frame = useCurrentFrame();

  // Pseudo-random deterministic generator with fixed seeds
  const particles = useMemo<Particle[]>(() => {
    const list: Particle[] = [];
    let seed = 42;
    function rand() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }

    for (let i = 0; i < count; i++) {
      list.push({
        x: rand() * 1920,
        startY: rand() * 1080,
        speed: rand() * 1.8 + 0.6,
        size: rand() * 3.5 + 1.2,
        swaySpeed: rand() * 0.04 + 0.015,
        swayAmp: rand() * 30 + 10,
        hue: rand() > 0.4 ? (38 + rand() * 15) : (350 + rand() * 20),
        opacity: rand() * 0.7 + 0.25,
      });
    }
    return list;
  }, [count]);

  const bokehList = useMemo<Bokeh[]>(() => {
    const list: Bokeh[] = [];
    let seed = 1337;
    function rand() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }

    for (let i = 0; i < 14; i++) {
      list.push({
        x: rand() * 1920,
        startY: rand() * 1080,
        speed: rand() * 0.6 + 0.2,
        radius: rand() * 110 + 40,
        color: rand() > 0.5 ? 'rgba(245, 158, 11, ' : 'rgba(244, 63, 94, ',
        opacity: rand() * 0.12 + 0.04,
      });
    }
    return list;
  }, []);

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
      {/* Background Soft Bokeh Circles */}
      {bokehList.map((b, i) => {
        const y = (b.startY - frame * b.speed) % 1200;
        const actualY = y < -100 ? y + 1200 : y;
        return (
          <div
            key={`b-${i}`}
            style={{
              position: 'absolute',
              left: b.x,
              top: actualY,
              width: b.radius * 2,
              height: b.radius * 2,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${b.color}${b.opacity}) 0%, ${b.color}0) 70%)`,
              filter: 'blur(24px)',
            }}
          />
        );
      })}

      {/* Floating Glowing Romantic Embers */}
      {particles.map((p, i) => {
        const y = (p.startY - frame * p.speed) % 1150;
        const actualY = y < -50 ? y + 1150 : y;
        const actualX = p.x + Math.sin(frame * p.swaySpeed + i) * p.swayAmp;
        const flicker = Math.sin(frame * 0.1 + i) * 0.2;
        const curOpacity = Math.max(0.1, Math.min(1, p.opacity + flicker));

        return (
          <div
            key={`p-${i}`}
            style={{
              position: 'absolute',
              left: actualX,
              top: actualY,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: `hsla(${p.hue}, 100%, 88%, ${curOpacity})`,
              boxShadow: `0 0 ${p.size * 4}px hsla(${p.hue}, 95%, 60%, ${curOpacity})`,
            }}
          />
        );
      })}
    </div>
  );
};
