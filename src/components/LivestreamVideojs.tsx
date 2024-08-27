import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

// Infer types directly from videojs
type VideoJsPlayer = ReturnType<typeof videojs>;

interface VideoJSProps {
  options: any; 
}

const VideoJS: React.FC<VideoJSProps> = ({ options }) => {
  const videoNode = useRef<HTMLVideoElement | null>(null);
  const player = useRef<VideoJsPlayer | null>(null);
  const vidLog = videojs.log.createLogger("Videojs Logger");

  useEffect(() => {
    if (videoNode.current) {
      player.current = videojs(videoNode.current, options, () => {
        vidLog("Player is Ready");
        vidLog(videoNode.current);
      });

      return () => {
        if (player.current && !player.current.isDisposed()) {
          player.current.dispose();
          vidLog('Player Disposed');
        }
      };
    }
  }, [options]);

  return (
    <div data-vjs-player>
      <video className='video-js' ref={videoNode} />
    </div>
  );
};

const LivestreamVideojs: React.FC = () => {
  const videoJsOptions = {
    controls: true,
    autoplay: true,
    preload: "auto",
    liveui: true,
    fluid: true,
    sources: [
      {
        src: "https://c.streamhoster.com/link/hls/WBs3lk/i2LT4nJscCY/iXF1Nbsfwi9_5/playlist.m3u8",
        type: "application/x-mpegURL",
      },
    ],
  };

  return (
    <div>
      <h3>VideoJS Player</h3>
      <VideoJS options={videoJsOptions} />
    </div>
  );
};

export default LivestreamVideojs;
