"use client";

import React from 'react';
import MuxPlayer from "@mux/mux-player-react";
import ReactPlayer from 'react-player'
import { useCookies } from 'next-client-cookies';

const VideoPlayer: React.FC = () => {
  const cookies = useCookies();
  const muxToken = cookies.get('muxToken');
  const playbackId = cookies.get('playbackId');

  if (!playbackId || !muxToken) { 
    return <div>Video Access Denied...</div>; 
  }

  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={playbackId}
      tokens={{ playback: muxToken }}
    />
  );
};

const SuccessPage: React.FC = () => {

  console.log("Test success!");

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome! If the NFC authentication worked, you should see a video below.</h1>

      <VideoPlayer />
    </div>
  );
};

export default SuccessPage;
