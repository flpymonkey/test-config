"use client";

import React from 'react';
import MuxPlayer from "@mux/mux-player-react"; 
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
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Success!</h1>
      <p>You have successfully passed ETRNL Authentication.</p>

      <MuxPlayer
        playbackId="a4nOgmxGWg6gULfcBbAa00gXyfcwPnAFldF8RdsNyk8M"
        metadata={{
          video_id: "video-id-54321",
          video_title: "Test video title",
          viewer_user_id: "user-id-007",
        }}
      />
    </div>
  );
};

export default SuccessPage;
