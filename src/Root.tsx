import "./index.css";
import React from "react";
import { Composition } from "remotion";
import { NoorLyricVideo } from "./Video";
import { FPS, TOTAL_DURATION_IN_FRAMES } from "./data/lyrics";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NoorLyricVideo"
        component={NoorLyricVideo}
        durationInFrames={TOTAL_DURATION_IN_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
