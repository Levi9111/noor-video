import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { AtmosphereBackground } from './components/AtmosphereBackground';
import { CinematicBars } from './components/CinematicBars';
import { LampFlame } from './components/LampFlame';
import { LyricScene } from './components/LyricScene';
import { ParticleField } from './components/ParticleField';
import { LYRICS_SCENES } from './data/lyrics';

export const NoorLyricVideo: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#070409',
        overflow: 'hidden',
      }}
    >
      {/* Master Audio Track */}
      <Audio src={staticFile('Noor.mp3')} />

      {/* Cinematic Atmosphere & Lighting */}
      <AtmosphereBackground />

      {/* Floating Golden Embers & Romantic Bokeh */}
      <ParticleField count={60} />

      {/* Earthen Lamp / Noor Flame Anchor */}
      <LampFlame opacity={0.75} scale={0.9} />

      {/* Synchronized Kinetic Lyric Sequences */}
      {LYRICS_SCENES.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.startFrame}
          durationInFrames={scene.durationInFrames}
          name={`[${scene.section}] ${scene.text.substring(0, 16)}...`}
          hidden
        >
          <LyricScene data={scene} />
        </Sequence>
      ))}

      {/* 2.39:1 Anamorphic Letterbox Bars & Framing */}
      <CinematicBars />
    </div>
  );
};
