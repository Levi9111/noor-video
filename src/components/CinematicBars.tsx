import React from 'react';

export const CinematicBars: React.FC = () => {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50 }}>
      {/* Top Letterbox Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 60,
          backgroundColor: '#050206',
          borderBottom: '1px solid rgba(245, 158, 11, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 60px',
        }}
      >
        <span style={{ fontFamily: '"Playfair Display", serif', fontSize: 13, color: 'rgba(254, 243, 199, 0.55)', letterSpacing: 3, textTransform: 'uppercase' }}>
          THE PATH OF LIGHT • নূরের পথ • راه نور
        </span>
        <span style={{ fontFamily: '"Playfair Display", serif', fontSize: 12, color: 'rgba(245, 158, 11, 0.5)', letterSpacing: 2 }}>
          SUFI ROMANTIC CINEMA
        </span>
      </div>

      {/* Bottom Letterbox Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 60,
          backgroundColor: '#050206',
          borderTop: '1px solid rgba(245, 158, 11, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontFamily: '"Noto Serif Bengali", serif', fontSize: 12, color: 'rgba(251, 191, 36, 0.45)', letterSpacing: 3 }}>
          — আমার মনে জ্বলে রে নূরের বাতি —
        </span>
      </div>
    </div>
  );
};
