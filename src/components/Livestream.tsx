import React, { useEffect, useRef } from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import PlayerOptions from 'video.js/dist/types/player';

interface VideoJSProps {
  options: PlayerOptions;
}

const VideoJS: React.FC<VideoJSProps> = ({ options }) => {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const player = useRef<Player | null>(null);

  useEffect(() => {
    // Initialize the Video.js player
    if (videoNode.current) {
      player.current = videojs(videoNode.current, options);

      // Cleanup on component unmount
      return () => {
        if (player.current) {
          player.current.dispose();
        }
      };
    }
  }, [options]);

  return (
    <div data-vjs-player>
      <video ref={videoNode} className="video-js" />
    </div>
  );
};

const LiveStream: React.FC = () => {
  const videoJsOptions: PlayerOptions = {
    controls: true as boolean,
    autoplay: true,
    preload: 'auto',
    liveui: true,
    fluid: true,
    sources: [
      {
        src: 'https://c.streamhoster.com/link/hls/WBs3lk/i2LT4nJscCY/iXF1Nbsfwi9_5/playlist.m3u8',
        type: 'application/x-mpegURL', // HLS stream format
      },
    ],
  };

  return (
    <div>
      <VideoJS options={videoJsOptions} />
    </div>
  );
};

export default LiveStream;