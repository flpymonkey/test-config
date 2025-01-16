import React from 'react';
import MuxPlayer from "@mux/mux-player-react"; 

// components/VideoPlayer.tsx
import React, { useEffect, useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import Cookies from 'js-cookie';

const VideoPlayer = () => {

  // Read the JWT token and playbackId from the cookie
  const [token, setToken] = useState<string | null>(null);
  const [playbackId, setPlaybackId] = useState<string | null>(null);

  useEffect(() => {
    const muxToken = Cookies.get('muxToken');
    setToken(muxToken || null);
    const playbackId = Cookies.get('playbackId');
    setPlaybackId(playbackId || null);
  }, []);

  if (!playbackId || !token) { 
    return <div>Video Access Denied...</div>; 
  }

  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={playbackId}
      tokens={{playback: token}}
    />
  );
};

const SuccessPage: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Success!</h1>
      <p>You have successfully passed ETRNL Authentication.</p>

      <VideoPlayer />
    </div>
  );
}

export default SuccessPage;
