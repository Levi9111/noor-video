import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { LyricSceneData } from '../types';

export const LyricScene: React.FC<{ data: LyricSceneData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const totalFrames = data.durationInFrames;

  // Cinematic Entrance: Focus Pull (blur 12px -> 0px) and Scale Push
  const entranceSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 80 },
  });

  const entranceBlur = interpolate(frame, [0, 14], [12, 0], {
    extrapolateRight: 'clamp',
  });

  const entranceOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Slow continuous romantic camera drift (1.0 -> 1.04)
  const slowCameraDrift = interpolate(frame, [0, totalFrames], [0.97, 1.03], {
    extrapolateRight: 'clamp',
  });

  // Smooth Exit Dissolve during the last 12 frames
  const exitFrames = 12;
  const exitOpacity = interpolate(
    frame,
    [totalFrames - exitFrames, totalFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const exitBlur = interpolate(
    frame,
    [totalFrames - exitFrames, totalFrames],
    [0, 8],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const finalOpacity = Math.min(entranceOpacity, exitOpacity);
  const finalBlur = Math.max(entranceBlur, exitBlur);

  const isFarsi = data.lang === 'fa';
  const isDuet = data.singer === 'duet';
  const isInstrumental = data.singer === 'instrumental';

  // Text Shadow & Glow Color based on vocal role
  let textShadow = '0 0 35px rgba(245, 158, 11, 0.6), 0 0 70px rgba(245, 158, 11, 0.3)';
  let textColor = '#fffbeb';

  if (isFarsi) {
    textShadow = '0 0 45px rgba(244, 63, 94, 0.7), 0 0 85px rgba(245, 158, 11, 0.35)';
    textColor = '#fff1f2';
  } else if (isDuet) {
    textShadow = '0 0 50px rgba(251, 191, 36, 0.8), 0 0 90px rgba(244, 63, 94, 0.5)';
    textColor = '#fffdf0';
  }

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 120px',
        opacity: finalOpacity,
        filter: `blur(${finalBlur}px)`,
        transform: `scale(${slowCameraDrift})`,
        zIndex: 20,
      }}
    >
      {/* Delicate Section & Vocal Identity Aura */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 20,
          opacity: 0.85,
        }}
      >
        <span
          style={{
            height: 1,
            width: 40,
            background: isFarsi
              ? 'linear-gradient(90deg, rgba(244, 63, 94, 0), rgba(244, 63, 94, 0.7))'
              : 'linear-gradient(90deg, rgba(245, 158, 11, 0), rgba(245, 158, 11, 0.7))',
          }}
        />
        <span
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 14,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: isFarsi ? '#fca5a5' : '#fde68a',
          }}
        >
          {data.singer === 'male' && 'Male Vocal • বাংলা'}
          {data.singer === 'female' && 'Female Vocal • فارسی'}
          {data.singer === 'duet' && 'Duet Harmonies • বাংলা ও ফারসি'}
          {data.singer === 'instrumental' && 'Sufi Ambient Prelude'}
        </span>
        <span
          style={{
            height: 1,
            width: 40,
            background: isFarsi
              ? 'linear-gradient(90deg, rgba(244, 63, 94, 0.7), rgba(244, 63, 94, 0))'
              : 'linear-gradient(90deg, rgba(245, 158, 11, 0.7), rgba(245, 158, 11, 0))',
          }}
        />
      </div>

      {/* Main Poetic Lyric Line */}
      <div
        style={{
          fontFamily: isFarsi ? '"Amiri", "Scheherazade New", serif' : '"Noto Serif Bengali", "Hind Siliguri", serif',
          fontSize: isFarsi ? 68 : 54,
          fontWeight: 700,
          lineHeight: isFarsi ? 1.5 : 1.35,
          textAlign: 'center',
          direction: isFarsi ? 'rtl' : 'ltr',
          color: textColor,
          textShadow,
          maxWidth: 1500,
          letterSpacing: isFarsi ? 0 : '0.5px',
        }}
      >
        {data.text}
      </div>

      {/* Persian Transliteration (if present) */}
      {data.transliteration && (
        <div
          style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontSize: 20,
            color: 'rgba(254, 205, 211, 0.75)',
            letterSpacing: 1.5,
            marginTop: 10,
          }}
        >
          {data.transliteration}
        </div>
      )}

      {/* Art-House Film Subtitle: Bengali Translation */}
      {data.subtitle && (
        <div
          style={{
            fontFamily: '"Noto Serif Bengali", serif',
            fontSize: 22,
            fontStyle: 'italic',
            color: isFarsi ? '#fde047' : 'rgba(226, 232, 240, 0.75)',
            marginTop: 16,
            textShadow: isFarsi ? '0 0 16px rgba(245, 158, 11, 0.4)' : 'none',
            letterSpacing: '0.4px',
          }}
        >
          {isFarsi ? `বাংলা অর্থ: ${data.subtitle}` : data.subtitle}
        </div>
      )}
    </div>
  );
};
